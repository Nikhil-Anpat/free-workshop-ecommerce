import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";
import { getApi, postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51JzVL8DjSoojJtxh7s14PiY91vHT844Y6J1Ig3jtlKCOxfp7Gb17Dypfw7kqvWPautMUY8Zb839LRZOnTPpM74Bx00Dr9zHI1v";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);


const StripePaymentModal = ({
  isOpen,
  onClose,
  stripeData,
  cartData,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const result = await stripe.confirmCardPayment(
        stripeData.paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "Customer Name",
            },
          },
        }
      );

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        onPaymentSuccess();
      }
    } catch (err) {
      setError("Payment processing failed");
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-container">
        <div className="payment-modal-header">
          <h2 className="payment-modal-title">Complete Payment</h2>
          <button
            onClick={onClose}
            className="payment-modal-close-button"
          >
            ✕
          </button>
        </div>

        <div className="payment-modal-content">
          <div className="payment-total-container">
            <p className="payment-total-label">Total to Pay</p>
            <p className="payment-total-amount">
              $ 1
            </p>
          </div>

          <form onSubmit={handlePayment}>
            <label className="payment-form-label">Card Details</label>
            <div className="payment-card-input">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>

            {error && (
              <div className="payment-error-message">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="payment-submit-button"
            >
              {processing ? "Processing Payment..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ cartData }) => {
  const navigate = useNavigate();
  const [stripeData, setStripeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderId, setOrderId] = useState();

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      const orderResponse = await new Promise((resolve, reject) => {
        postApi(
          endPoints.cart.cartCheckout(),
          {},
          {
            setResponse: (data) => resolve(data),
            setError: (error) => reject(error),
          }
        );
      });

      if (orderResponse.data && orderResponse.data._id) {
        const stripeCheckoutResponse = await new Promise((resolve, reject) => {
          postApi(
            endPoints.cart.stripeCheckout(orderResponse.data._id),
            {},
            {
              setResponse: (data) => resolve(data),
              setError: (error) => reject(error),
            }
          );
        });

        setOrderId(orderResponse.data.orderId);
        setStripeData(stripeCheckoutResponse);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Checkout process error:", error);
      alert("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    // alert("Payment successful!");
    console.log("orderResponse");

    navigate(`/order-success?order_id=${orderId}`);
  };

  return (
    <>
      <div className="cart-summary">
        <div className="summary-box">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>$ 1 </span>
          </div>
          {/* <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div> */}
          <div className="summary-total">
            <span>Total</span>
            <span>$ 1 </span>
          </div>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>

      {stripeData && (
        <StripePaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stripeData={stripeData}
          cartData={cartData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

const CartPage = () => {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = useCallback(() => {
    setIsLoading(true);
    getApi(endPoints.cart.getCart(), {
      setResponse: (data) => {
        if (data.success) {
          setCartData(data.cart);
        }
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) return <div className="cart-page">Loading...</div>;
  if (!cartData)
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart (1 item)</h1>
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-item">
              <img
                src={
                  cartData.productId.productImages[0]?.image ||
                  "/api/placeholder/120/120"
                }
                alt={cartData.productId.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{cartData.productId.name}</h3>
                <p className="location">{cartData.productId.locationValue}</p>
                <p className="price">$ 1</p>
                {/* <p className="price">{cartData.price}</p> */}
                <p className="quantity">Quantity: {cartData.quantity}</p>
              </div>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm cartData={cartData} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
