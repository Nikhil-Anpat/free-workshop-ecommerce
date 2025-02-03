/** @format */

import "./Blog.css";
import trustImage from "../../assets/images/img41.jpg";
import img from "../../assets/images/img42.jpg";
import { useEffect, useState } from "react";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Blog = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = () => {
    const queryParams = new URLSearchParams({
      limit: 1000,
    });
    setIsLoading(true);
    getApi(endPoints.blogs.getAll(queryParams?.toString()), {
      setResponse: (data) => {
        setResponse(data);
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="blog-container">
        <div className="blog-top">
          <div className="blog-top-left">
            <div className="blog-top-left-top">
              <span>HOW IT WORKS</span>
            </div>
            <h1>Buy. Sell. Simple</h1>
            <p>
              Freeshopps is the simplest, most trusted way to buy and sell
              locally
            </p>
            <button>Watch Now</button>
          </div>
          <div className="blog-top-right">
            <img src={trustImage} alt="" />
          </div>
        </div>
        <div className="blog-second">
          <div className="blog-second-left">
            <h6>
              A Letter From Our CEO: A Profitable Year and Our Path Forward
            </h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button className="blog-second-left-btn">Read now</button>
          </div>
          <div className="blog-second-right">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="blog-third">
          <h6>Latest News & Announcements</h6>
          <div className="blog-third-main">
            {isLoading ? (
              <p>Loading</p>
            ) : (
              response?.data?.docs?.map((item) => (
                <div className="blog-third-div" key={item?._id}>
                  <div className="blog-third-div-img">
                    <img src={item?.image} alt="" />
                  </div>
                  <div className="blog-third-div-content">
                    <h6>{item?.title}</h6>
                    <p>{item?.description}</p>
                    <button className="blog-third-left-btn">Read now</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
