/** @format */

import "./Footer.css";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  JObsmodal,
  LoginModalfirst,
  LoginModalSecond,
  LoginModallogin,
  LoginModalsignup,
} from "../Modals/Modals";
import { isAuthenticated } from "../../store/authSlice.js";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  // Toggle functions for login flow
  const toggle = () => {
    setShow(false);
    setShow1(true);
  };
  const toggle1 = () => {
    setShow1(false);
    setShow2(true);
  };
  const toggle2 = () => {
    setShow1(true);
    setShow2(false);
    setShow3(false);
  };
  const toggle3 = () => {
    setShow1(false);
    setShow3(true);
  };

  // Handle Post Job Click
  const handlePostJobClick = () => {
    if (isLoggedIn) {
      navigate("/post-job");
    } else {
      setShow(true); // Open login modal if not logged in
    }
  };

   // Handle Post an Item Click
   const handlePostItemClick = () => {
    if (isLoggedIn) {
      navigate("/post");
    } else {
      setShow(true); // Open login modal if not logged in
    }
  };

  return (
    <>
      <JObsmodal show={isOpen} onHide={() => setIsOpen(false)} />

      {/* Login Modals */}
      <LoginModalfirst
        show={show}
        onHide={() => setShow(false)}
        shownext={toggle}
      />
      <LoginModalSecond
        show={show1}
        onHide={() => setShow1(false)}
        shownext={toggle1}
        shownext1={toggle3}
      />
      <LoginModallogin
        show={show2}
        onHide={() => setShow2(false)}
        shownext={toggle2}
      />
      <LoginModalsignup
        show={show3}
        onHide={() => setShow3(false)}
        shownext={toggle2}
      />

      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-main-div">
            <div className="footer-main-div-left">
              <div className="footer-main-links">
                <h6>Shop</h6>
                <ul>
                  <li onClick={() => navigate("/aboutus")}>How it works</li>
                  <li onClick={() => navigate("/explore")}>Explore</li>
                  <li onClick={() => navigate("/trust-safety")}>
                    Trust & safety
                  </li>
                </ul>
              </div>
              <div className="footer-main-links">
                <h6>Sell</h6>
                <ul>
                  <li onClick={handlePostItemClick}>Post an item</li>
                  <li onClick={() => navigate("/auto-dealerships")}>
                    Auto dealerships
                  </li>
                </ul>
              </div>
              <div className="footer-main-links">
                <h6>Jobs</h6>
                <ul>
                  <li onClick={handlePostJobClick}>Post job</li>
                  <li onClick={() => setIsOpen(true)}>Find a job</li>
                </ul>
              </div>
              <div className="footer-main-links">
                <h6>About</h6>
                <ul>
                  <li onClick={() => navigate("/careers")}>Careers</li>
                  <li onClick={() => navigate("/press")}>Press</li>
                </ul>
              </div>
              <div className="footer-main-links">
                <h6>Help</h6>
                <ul>
                  <li onClick={() => navigate("/help")}>Help center</li>
                  <li onClick={() => navigate("/blog")}>Blog</li>
                </ul>
              </div>
            </div>
            <div className="footer-main-div-right">
              <div className="navbar-getapp">
                <button>Get the app</button>
              </div>
              <div className="footer-main-right-socilinks">
                <RiTwitterXFill />
                <FaFacebook />
                <FaInstagram />
                <FaLinkedin />
              </div>
            </div>
          </div>
          <div className="footer-bottom-div">
            <p>© 2024 OfferUp Inc.</p>
            <span>
              Terms of Service/Privacy Policy/Do Not Sell or Share My Personal
              Information
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
