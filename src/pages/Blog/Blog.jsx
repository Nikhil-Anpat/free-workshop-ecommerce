/** @format */
import "./Blog.css";
import trustImage from "../../assets/images/img41.jpg";
import img from "../../assets/images/img42.jpg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import OfferUp1 from '../../assets/images/OfferUp1.svg'
import OfferUp2 from '../../assets/images/OfferUp2.svg'
import OfferUp3 from '../../assets/images/OfferUp3.svg'
import OfferUp4 from '../../assets/images/OfferUp4.svg'
import OfferUp5 from '../../assets/images/OfferUp5.svg'

import Freeshopp1 from '../../assets/images/Freeshopps1.svg'
import Freeshopp2 from '../../assets/images/Freeshopps2.svg'
import Freeshopp3 from '../../assets/images/Freeshopps3.svg'

import Industry1 from '../../assets/images/Industry1.svg'
import Industry2 from '../../assets/images/Industry2.svg'
import Industry3 from '../../assets/images/Industry3.svg'



const OfferUp = [
  {
    "title": "Freeshopps Inside Episode 5 - BizOps with Ken & Gi",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img":OfferUp1
  },
  {
    "title": "Freeshopps Inside Episode 4 - Ironhack x Freeshopps with Lisa, Natalie & Francie",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": OfferUp2
  },
  {
    "title": "Freeshopps Inside Episode 3 - LGBTQIA+ Pride with Kerry & JR",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": OfferUp3
  },
  {
    "title": "Freeshopps Inside Episode 2 - Autos with Woody & Jesse",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": OfferUp4
  },
  {
    "title": "A New Chapter for Freeshopps with Todd & Nick",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": OfferUp5
  }
];

const Freeshopps = [
  {
    "title": "Staying Safe on Freeshopps  — The Dos and Don'ts of Online Marketplace Transactions",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img":Freeshopp1
  },
  {
    "title": "Best Practices for Buying and Selling with Freeshopps Shipping",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": Freeshopp2
  },
  {
    "title": "How to Buy a Used Car from a Certified Dealer on Freeshopps",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": Freeshopp3
  }
];

const Industry = [
  {
    "title": "The Best Ways to Buy and Sell on Resale Apps in 2021, by Freeshopps",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img":Industry1
  },
  {
    "title": "Best Practices for Buying and Selling with Freeshopps Shipping",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": Industry2
  },
  {
    "title": "How to Buy a Used Car from a Certified Dealer on Freeshopps",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "img": Industry3
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const categoryIdFromUrl = queryParams.get("categoryId");

  const fetchBlogs = (categoryId = null) => {
    let queryParams = new URLSearchParams({ limit: 1000 });

    if (categoryId) {
      queryParams.append("blogCategoryId", categoryId);
    }

    setIsLoading(true);
    getApi(endPoints.blogs.getAll(queryParams.toString()), {
      setResponse: (data) => {
        setResponse(data);
        setIsLoading(false);
      },
    });
  };

  const readNow = (categoryId) => {
    navigate(`?categoryId=${categoryId}`);
    fetchBlogs(categoryId);
  };

  useEffect(() => {
    fetchBlogs(categoryIdFromUrl);
  }, [categoryIdFromUrl]);

  return (
    <>
      <div className="blog-container">
        <div className="blog-top">
          <div className="blog-top-left">
            <div className="blog-top-left-top">
              <span>HOW IT WORKS</span>
            </div>
            <h1>Buy. Sell. Simple</h1>
            <p>Freeshopps is the simplest, most trusted way to buy and sell locally</p>
            <button>Watch Now</button>
          </div>
          <div className="blog-top-right">
            <img src={trustImage} alt="" />
          </div>
        </div>

        <div className="blog-second">
          <div className="blog-second-left">
            <h6>A Letter From Our CEO: A Profitable Year and Our Path Forward</h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s.
            </p>
            <button className="blog-second-left-btn">Read now</button>
          </div>
          <div className="blog-second-right">
            <img src={img} alt="" />
          </div>
        </div>

        {/* Latest News & Announcements */}
        <div className="blog-third">
          <h6>Latest News & Announcements</h6>
          <div className="blog-third-main">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              response?.data?.docs?.map((item) => (
                <div className="blog-third-div" key={item?._id}>
                  <div className="blog-third-div-img">
                    <img src={item?.image} alt="" />
                  </div>
                  <div className="blog-third-div-content">
                    <h6>{item?.title}</h6>
                    <p>{item?.description}</p>
                    <div>
                      <button className="blog-third-left-btn" onClick={() => readNow(item?.blogCategoryId)}>
                        Read now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="blog-third">
          <h6>OfferUp Inside Videos - Behind The Scenes with Our Team</h6>
          <div className="blog-third-main">
            {OfferUp?.map((item,index) => (
                <div className="blog-third-div" key={index}>
                  <div className="blog-third-div-img">
                    <img src={item?.img} alt="" />
                  </div>
                  <div className="blog-third-div-content">
                    <h6>{item?.title}</h6>
                    <p>{item?.description}</p>
                    <div>
                      <button className="blog-third-left-btn" onClick={() => readNow(item?.blogCategoryId)}>
                        Read now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Industry Research & Reports */}
        
        <div className="blog-third">
          <h6>Industry Research & Reports</h6>
          <div className="blog-third-main">
            {Industry?.map((item,index) => (
                <div className="" key={index} style={{display:'flex' ,gap:'20px'}}>
                  <div className="blog-third-div-img">
                    <img src={item?.img} alt="" />
                  </div>
                  <div className="blog-third-div-content">
                    <h6>{item?.title}</h6>
                    <p>{item?.description}</p>
                    <div>
                      <button className="blog-third-left-btn" onClick={() => readNow(item?.blogCategoryId)}>
                        Read now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Freeshopps Tips & Tricks */}
        <div className="blog-third">
          <h6>Freeshopps Tips & Tricks</h6>
          <div className="blog-third-main">
            { Freeshopps?.map((item,index) => (
                <div className="blog-third-div" key={index}>
                  <div className="blog-third-div-img">
                    <img src={item?.img} alt="" />
                  </div>
                  <div className="blog-third-div-content">
                    <h6>{item?.title}</h6>
                    <p>{item?.description}</p>
                    <div>
                      <button className="blog-third-left-btn" onClick={() => readNow(item?.blogCategoryId)}>
                        Read now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
