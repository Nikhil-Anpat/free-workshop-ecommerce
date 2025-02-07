import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import QRcode from "../../components/CommonComponent/QRcode";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { DefaultModal } from "../../components/Modals/Modals";
import successGif from "../../assets/images/success.gif";
import { useNavigate } from "react-router-dom";
import "./MyListing.css";

// New Loader Component
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        {/* <div className="loader-spinner"></div> */}
      </div>
    </div>
  );
};

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

const MyListing = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  function fetchMyProducts() {
    setIsLoading(true);
    getApi(endPoints.products.getMyProducts, {
      setResponse,
      additionalFunctions: [() => setIsLoading(false)],
    });
  }

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const removeProductHandler = () => {
    deleteApi(endPoints.products.removeProduct(selectedId), {
      additionalFunctions: [
        () => setIsDelete(false),
        () => setIsSuccess(true),
        () => setTimeout(() => setIsSuccess(false), 5000),
        fetchMyProducts,
      ],
    });
  };

  // If loading, show loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mylisting-container">
        <QRcode />
        <div>
          {response?.data?.docs?.length === 0 ? (
            <div className="no-listings">
              <p>No listings found. Create your first listing!</p>
            </div>
          ) : (
            response?.data?.docs?.map((item, index) => (
              <div className="mylisting-div" key={item?._id}>
                <div className="mylisting-details-container">
                  <div className="mylisting-details-image">
                    <h6>
                      {" "}
                      {index + 1} / {response?.data?.totalDocs}
                    </h6>
                    <div className="mylisting-details-img">
                      <img
                        src={item?.productImages?.[0]?.image}
                        alt={item?.name}
                      />
                    </div>
                  </div>
                  <div className="product-details-content">
                    <div className="mylisting-details-title">
                      <h4> {item?.categoryId?.name} </h4>
                      <div className="mylisting-details-iconss">
                        <MdDelete
                          onClick={() => {
                            setSelectedId(item?._id);
                            setIsDelete(true);
                          }}
                        />
                        <MdEditSquare
                          onClick={() => navigate(`/edit-post/${item?._id}`)}
                        />
                      </div>
                    </div>
                    <div className="product-details-content-top">
                      <h2> {item?.name} </h2>
                      <p>
                        <FaClock color="#E25845" />{" "}
                        {item?.createdAt && formatDateTime(item?.createdAt)}
                      </p>
                      {item?.locationValue && (
                        <p>
                          <IoLocationSharp color="#E25845" />
                          {item?.locationValue}
                        </p>
                      )}
                    </div>
                    <div className="product-details-specification">
                      <h3>Description :</h3>
                      <div className="product-details-points">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <DefaultModal open={isDelete} handleClose={() => setIsDelete(false)}>
          <div className="delete-product-modal">
            <h6>
              Are You Sure Want to <br /> Delete Ad
            </h6>
            <div className="btn-container">
              <button
                className="remove-btn"
                type="button"
                onClick={() => removeProductHandler()}
              >
                Yes
              </button>
              <button
                className="outline-btn"
                type="button"
                onClick={() => setIsDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </DefaultModal>

        <DefaultModal open={isSuccess} handleClose={() => setIsSuccess(false)}>
          <div className="success-delete-product-modal">
            <img src={successGif} alt="" className="gif" />
            <h6>You are Successfully Log out</h6>
          </div>
        </DefaultModal>
      </div>
    </>
  );
};

export default MyListing;
