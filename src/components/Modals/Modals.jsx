/** @format */

import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Modals.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { getApi, postApi, postApiWithRedux } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, LOGIN } from "../../store/authSlice";
import img from "../../assets/images/logo.png";
import img1 from "../../assets/images/locations.png";
import img2 from "../../assets/images/dashboard.png";
import img3 from "../../assets/images/successgif.gif";
import img4 from "../../assets/images/jobs.png";
import { IoLocationSharp, IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SidebarCanvas = ({ show, handleClose }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(isAuthenticated);
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <section className="sidebar-canvas">
        <div className="close_btn">
          <IoClose onClick={() => handleClose()} />
        </div>

        <div className="remaining_content">
          <div className="search_container">
            <div className="free_shipping">
              <span>
                <IoLocationSharp /> Nearby + Shipping <FaTruck />
              </span>
            </div>
            <div className="search_bar">
              <input type="text" placeholder="Search for sale" />
              <select>
                <option>For Sale</option>
                <option>For Sale</option>
              </select>
              <div className="search_icon">
                <IoSearch />
              </div>
            </div>
          </div>

          <div className="social_links">
            <ul>
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to={"/"}>Home</Link>
              </li>
              <li className={location.pathname === "/chat" ? "active" : ""}>
                <Link to={"/chat"}>Chat</Link>
              </li>
              <li className={location.pathname === "/post" ? "active" : ""}>
                <Link to={"/post"}>Post</Link>
              </li>
              <li
                className={location.pathname === "/mylisting" ? "active" : ""}
              >
                <Link to={"/mylisting"}>My Listing</Link>
              </li>
            </ul>

            {isLoggedIn ? (
              <button className="login_btn">Log out</button>
            ) : (
              <button className="login_btn">Log In</button>
            )}
          </div>
        </div>
      </section>
    </Offcanvas>
  );
};

const LoginModalfirst = (props) => {
  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="login-container-modal">
          <div className="login-modal-top">
            <h6>Sign up / Log in</h6>
            <p onClick={props.onHide}>Cancel</p>
          </div>
          <div className="login-modal-div">
            <div className="login-modal-image">
              <img src={img} alt="" />
            </div>
            <div className="login-modal-face">
              <FaFacebook />
              <p>Continue with Facebook</p>
            </div>
            <div className="login-modal-google">
              <FcGoogle />
              <p>Continue with Google</p>
            </div>
            <div className="login-modal-apple">
              <FaApple />
              <p>Continue with Apple</p>
            </div>
            <div className="login-modal-email" onClick={props.shownext}>
              <MdEmail />
              <p>Continue with Email</p>
            </div>
            <div className="login-modal-content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's{" "}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const LoginModalSecond = (props) => {
  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="login-container-modal">
          <div className="login-modal-top">
            <h6>Sign up / Log in</h6>
            <p onClick={props.onHide}>Cancel</p>
          </div>
          <div className="login-modal-div">
            <div className="login-modal-image">
              <img src={img} alt="" />
            </div>
            <div className="login-modal-sinup-btn" onClick={props.shownext1}>
              <p>Sign up</p>
            </div>
            <div className="login-modal-login-btn" onClick={props.shownext}>
              <p>Log in</p>
            </div>
            <div className="login-modal-content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const LoginModallogin = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    email,
    password,
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(
      postApiWithRedux(endPoints.auth.login, payload, {
        setLoading,
        successMsg: "Welcome! You’ve successfully logged in.",
        errorMsg: "Login failed. Please check your credentials and try again.",
        showErr: true,
        dispatchFunc: [(res) => LOGIN(res)],
        additionalFunctions: [() => props.onHide()],
      })
    );
  };

  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form onSubmit={loginHandler}>
          <div className="login-container-modal">
            <div className="login-modal-top">
              <h6>Log in</h6>
              <p onClick={props.onHide}>Cancel</p>
              <IoIosArrowBack onClick={props.shownext} />
            </div>
            <div className="login-modal-div">
              <div className="login-modal-image">
                <img src={img} alt="" />
              </div>
            </div>
            <div className="login-modal-inputs">
              <div className="login-modal-input">
                <label htmlFor="">Email address</label>
                <div className="login-modal-input-in">
                  <input
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div className="login-modal-input">
                <label htmlFor="">Password</label>
                <div className="login-modal-input-in">
                  <input
                    type="password"
                    name=""
                    id=""
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <span>Show</span>
                </div>
              </div>
              <div className="login-modal-input">
                <label htmlFor="" onClick={props.openForgot}>Forgot your password?</label>
              </div>
              <div className="login-modal-content">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's{" "}
                </p>
              </div>
              <div className="login-modal-button">
                <button type="submit">
                  {loading ? <ClipLoader color="#fff" /> : "Agree & Log in"}
                </button>

                <p>Don’t have an account? <span onClick={props.openSignUp}>Sign up</span></p>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const LoginModalsignup = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [passwordType, setPasswordType] = useState("password");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pinCode, setPinCode] = useState("");
  const [allCategories, setAllCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = () => {
    getApi(endPoints.getCategories, {
      setResponse: setAllCategories,
    });
  };

  const categorySelector = (item) => {
    const isAlreadyIn = selectedCategories?.some((i) => i === item);
    if (isAlreadyIn) {
      const filteredData = selectedCategories?.filter((i) => i !== item);
      setSelectedCategories(filteredData);
    } else {
      setSelectedCategories((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    if (props.show) {
      fetchCategories();
    }
  }, [props]);

  const payload = {
    fullName,
    email,
    password,
    categoryIds: selectedCategories,
    latitude,
    longitude,
    location,
    pinCode,
  };

  const submitHandler = () => {
    postApi(endPoints.auth.signup, payload, {
      setLoading,
      successMsg: "Profile created successfully !",
      showErr: true,
      additionalFunctions: [
        () => setStep(4),
        () => setTimeout(() => props.onHide(), 2000),
      ],
    });
  };

  useEffect(() => {
    if (props.show) {
      setStep(1);
    }
  }, [props]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          getAddressFromCoordinates(latitude, longitude);
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      if (data.status === "OK") {
        const address = data.results[0].formatted_address;
        setLocation(address);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {step === 1 && (
          <div className="login-container-modal">
            <div className="login-modal-top">
              <h6>Sign up</h6>
              <p onClick={props.onHide}>Cancel</p>
              <IoIosArrowBack onClick={props.shownext} />
            </div>
            <div className="login-modal-div">
              <div className="login-modal-image">
                <img src={img} alt="" />
              </div>
            </div>
            <div className="login-modal-inputs">
              <div className="login-modal-input">
                <label>Name</label>
                <div className="login-modal-input-in">
                  <input
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
              </div>
              <div className="login-modal-input">
                <label>Email address</label>
                <div className="login-modal-input-in">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div className="login-modal-input">
                <label>Password</label>
                <div className="login-modal-input-in">
                  <input
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  {passwordType === "text" ? (
                    <span onClick={() => setPasswordType("password")}>
                      Hide
                    </span>
                  ) : (
                    <span onClick={() => setPasswordType("text")}>Show</span>
                  )}
                </div>
              </div>
              <div className="login-modal-content">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's{" "}
                </p>
              </div>
              <div className="login-modal-button">
                <button type="button" onClick={() => setStep(step + 1)}>
                  Agree & Sign up
                </button>
                <p>Already have an account?<span onClick={props.openLogin}>Log in</span></p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="login-container-modal">
            <div className="locationget-modal">
              <div className="location-img">
                <img src={img1} alt="" />
              </div>
              <h3>Where are you searching?</h3>
              <div
                className="location-btn-modal"
                onClick={() => getCurrentLocation()}
              >
                <IoLocationSharp />
                <p>Get my location</p>
              </div>
              <span>Or</span>
              <input
                type="text"
                placeholder="Enter Your Zip Code"
                onChange={(e) => setPinCode(e.target.value)}
                value={pinCode}
              />

              <p
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  maxWidth: "300px",
                }}
              >
                {location}
              </p>
            </div>
            <div className="login-modal-content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's{" "}
              </p>
            </div>
            <div className="login-modal-button">
              <button
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="login-container-modal">
            <div className="locationget-modal">
              <div className="location-img">
                <img src={img2} alt="" />
              </div>
              <h3>
                Select 3 categories to <br /> personalize your feed
              </h3>
              <div className="category-container-modal">
                {allCategories?.data?.map((item, index) => (
                  <div
                    key={index}
                    className={`category-modal-div ${
                      selectedCategories.includes(item?._id) ? "selected" : ""
                    }`}
                    onClick={() => categorySelector(item?._id)}
                  >
                    <p>{item?.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="login-modal-button">
              <button
                style={{ marginTop: "10px" }}
                onClick={submitHandler}
                disabled={selectedCategories.length !== 3}
              >
                {loading ? <ClipLoader color="#fff" /> : "Next"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="login-container-modal">
            <div className="locationget-modal">
              <img src={img3} alt="" />
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

const ForgotPassword = (props) => {
  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="login-container-modal">
          <div className="login-modal-top">
            <h6>Forgot Password</h6>
            <p onClick={props.onHide}>Cancel</p>
          </div>
          <div className="login-modal-div">
            <div className="login-modal-image">
              <img src={img} alt="" />
            </div>
            
            <div className="login-modal-content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DefaultModal = ({ children, open, handleClose }) => {
  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

const JObsmodal = (props) => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(null);

  const fetchCategorie = () => {
    getApi(endPoints.getServiceCategory, {
      setResponse: setAllCategories,
    });
  };

  useEffect(() => {
    fetchCategorie();
  }, []);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggle = () => {
    props.onHide();
    navigate(`/jobs?category=${selectedCategories?.[0]}`);
  };

  return (
    <Modal
      {...props}
      size="sl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="login-container-modal">
          <div className="locationget-modal">
            <div className="location-img">
              <img src={img4} alt="" />
            </div>
            <h3>Find your next job</h3>
            <div className="category-container-modal">
              {allCategories?.data?.map((item) => (
                <div
                  key={item?._id}
                  className={`category-modal-div ${
                    selectedCategories.includes(item?._id) ? "selected" : ""
                  }`}
                  onClick={() => toggleCategory(item?._id)}
                >
                  <p> {item?.name} </p>
                </div>
              ))}
            </div>
          </div>
          <div className="login-modal-button">
            <button
              style={{ marginTop: "10px" }}
              onClick={toggle}
              disabled={selectedCategories.length !== 1}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export {
  LoginModalfirst,
  LoginModalSecond,
  LoginModallogin,
  LoginModalsignup,
  ForgotPassword,
  DefaultModal,
  JObsmodal,
  SidebarCanvas
};
