import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa6";
import { IoAddCircleOutline, IoLocationSharp } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import QRcode from "../../components/CommonComponent/QRcode";
import { getApi, postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { isAuthenticated } from "../../store/authSlice.js";
import {
  LoginModalfirst,
  LoginModallogin,
  LoginModalSecond,
  LoginModalsignup,
} from "../../components/Modals/Modals.jsx";
import "./ProductDetails.css";
import { ListModal } from "../../components/SavedLists/SavedList.jsx";

// Keeping your original helper functions
function formatDateTime(isoString) {
  const date = new Date(isoString);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function getStars(rating, maxStars = 5) {
  if (rating < 0 || rating > maxStars) {
    throw new Error(
      "Rating must be between 0 and the maximum number of stars."
    );
  }
  const stars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      stars.push(<IoIosStar key={i} />);
    } else {
      stars.push(<IoIosStarOutline key={i} />);
    }
  }
  return <div>{stars}</div>;
}

const LoadingState = () => (
  <div className="product-details-container">
    <div className="product-details-image" style={{ position: "relative" }}>
      <div
        className="loading-placeholder"
        style={{
          width: "100%",
          height: "100%",
          background: "#f2f2f2",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        className="loading-spinner"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #f85c70",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
    <div className="product-details-content">
      <div className="product-details-content-top">
        <div
          style={{
            height: "24px",
            width: "60%",
            background: "#f2f2f2",
            marginBottom: "8px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
        <div
          style={{
            height: "18px",
            width: "40%",
            background: "#f2f2f2",
            marginBottom: "8px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
        <div
          style={{
            height: "18px",
            width: "50%",
            background: "#f2f2f2",
            marginBottom: "8px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      </div>
      <div className="product-details-specification">
        <div
          style={{
            height: "28px",
            width: "30%",
            background: "#f2f2f2",
            marginBottom: "8px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
        <div
          className="product-details-points"
          style={{
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      </div>
    </div>
    <style>
      {`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

const ProductDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isLoggedIn = useSelector(isAuthenticated);

  // Login modal states
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  const fetchDetail = useCallback(() => {
    setIsLoading(true);
    getApi(endPoints.products.getProductDetailBeforeLogin(id), {
      setResponse: (data) => {
        setResponse(data);
        setIsLoading(false);
      },
    });
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setShowFirstModal(true);
      return;
    }

    try {
      setIsAddingToCart(true);
      const response = await postApi(
        endPoints.cart.addToCart(id),
        { quantity: 1 },
        {
          setResponse: (data) => {
            if (data.success) {
              navigate("/cart");
            }
          },
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAskClick = () => {
    if (isLoggedIn) {
      navigate("/chat");
    } else {
      setShowFirstModal(true);
    }
  };

  // Modal toggle handlers
  const handleFirstToSecond = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleSecondToLogin = () => {
    setShowSecondModal(false);
    setShowLoginModal(true);
  };

  const handleSecondToSignup = () => {
    setShowSecondModal(false);
    setShowSignupModal(true);
  };

  const handleBackToSecond = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSecondModal(true);
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="home-app">
          <QRcode />
        </div>
        <LoadingState />
      </div>
    );
  }

  return (
    <>
      <LoginModalfirst
        show={showFirstModal}
        onHide={() => setShowFirstModal(false)}
        shownext={handleFirstToSecond}
      />
      <LoginModalSecond
        show={showSecondModal}
        onHide={() => setShowSecondModal(false)}
        shownext={handleSecondToLogin}
        shownext1={handleSecondToSignup}
      />
      <LoginModallogin
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        shownext={handleBackToSecond}
      />
      <LoginModalsignup
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        shownext={handleBackToSecond}
      />

      <div className="home-container">
        <div className="home-app">
          <QRcode />
        </div>
        <div className="product-details-container">
          <div className="product-details-image">
            <img src={response?.data?.productImages?.[0]?.image} alt={name} />
          </div>
          <div className="product-details-content">
            <div className="product-details-content-top">
              <h2>{name}</h2>
              {/* <p>$ {response?.data?.price}</p> */}
              <p>
                <FaClock />{" "}
                {response?.data?.createdAt &&
                  formatDateTime(response?.data?.createdAt)}
              </p>
              <p>
                <IoLocationSharp />
                {response?.data?.location}
              </p>
              <div className="product-details-rating">
                {getStars(response?.data?.ratings)}
              </div>
            </div>
            <div className="product-details-specification">
              <h3>Description :</h3>
              <div className="product-details-points">
                <div
                  dangerouslySetInnerHTML={{
                    __html: response?.data?.description,
                  }}
                />
              </div>
            </div>
            <div className="product-details-action-container">
              <div className="product-details-actionbtn">
                <button onClick={handleAskClick}>Ask</button>
              </div>
              <div className="product-details-actionbtn">
                <button onClick={handleAddToCart} disabled={isAddingToCart}>
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
              </div>
              <div className="product-details-actionbtn">
                <button
                  className="add-to-list-button"
                  onClick={() => setShowListModal(true)}
                >
                  <IoAddCircleOutline /> List
                </button>
              </div>
              <ListModal
                isOpen={showListModal}
                onClose={() => setShowListModal(false)}
                productId={id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
