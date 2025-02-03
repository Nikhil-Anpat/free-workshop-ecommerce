/** @format */

import QRcode from "../../components/CommonComponent/QRcode";
import "./Chat.css";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa6";
import { FaRegFaceSmile } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import img from "../../assets/images/img2.jpg";
import img1 from "../../assets/images/img5.jpg";
import img2 from "../../assets/images/img6.jpg";
import img3 from "../../assets/images/img7.jpg";
import img4 from "../../assets/images/img8.jpg";
import img5 from "../../assets/images/img9.jpg";
import img6 from "../../assets/images/img10.jpg";
import img7 from "../../assets/images/img11.jpg";
import img8 from "../../assets/images/img12.jpg";
import img9 from "../../assets/images/img13.jpg";
import img10 from "../../assets/images/img14.jpg";
import img11 from "../../assets/images/img15.jpg";
import img12 from "../../assets/images/img16.jpg";
import img13 from "../../assets/images/img17.jpg";
import img14 from "../../assets/images/img18.jpg";
import img15 from "../../assets/images/img19.png";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const data = [
    {
      profileimg: img,
      name: "Marvin McKinney",
      role: "Nursing Assistant",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img1,
      name: "Jacob Jones",
      role: "Marketing Coordinator",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img2,
      name: "Leslie Alexander",
      role: "Web Designer",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img3,
      name: "Eleanor Pena",
      role: "Dog Trainer",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img4,
      name: "Kathryn Murphy",
      role: "Medical Assistant",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img5,
      name: "Wade Warren",
      role: "Web Designer",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },

    {
      profileimg: img6,
      name: "Wade Warren",
      role: "Web Designer",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
    {
      profileimg: img7,
      name: "Wade Warren",
      role: "Web Designer",
      time: "5m",
      msg: "Lorem ipsum dolor sit amet",
    },
  ];
  const data1 = [
    {
      profileimg: img8,
      name: "Acme Co.",
      role: "Viet Nam",
      time: "04:15 am",
    },
    {
      profileimg: img9,
      name: "Biffco Enterprises Ltd.",
      role: "Greece",
      time: "06:41 pm",
    },
    {
      profileimg: img10,
      name: "Binford Ltd.",
      role: "South Africa",
      time: "07:40 am",
    },
    {
      profileimg: img11,
      name: "Big Kahuna Burger Ltd.",
      role: "Palestine, State of",
      time: "01:34 pm",
    },
    {
      profileimg: img12,
      name: "Acme Co.",
      role: "Viet Nam",
      time: "04:15 am",
    },
    {
      profileimg: img13,
      name: "Abstergo Ltd.",
      role: "Monaco",
      time: "02:34 am",
    },
  ];
  return (
    <>
      <div className="home-container">
        <div className="home-app">
          <QRcode />
        </div>
        <div className="chat-container">
          <div className="chat-container-left">
            <div className="chat-left-top">
              <div className="chat-left-top-left">
                <p>Inbox</p>
                <span>2 New</span>
              </div>
              <IoSettingsOutline />
            </div>
            <div className="chat-left-searchbar">
              <IoSearch />
              <input type="search" placeholder="Search..." />
            </div>
            <div className="chat-left-main">
              {data.map((i, index) => (
                <div className="chat-left-main-div" key={index}>
                  <div className="chat-left-main-div-top">
                    <div className="chat-left-main-div-image">
                      <div className="chat-left-main-div-img">
                        <img src={i.profileimg} alt="" />
                      </div>
                      <div className="chat-left-main-div-name">
                        <h6>{i.name || "Default Name"}</h6>
                        <p>{i.role || "Default Role"}</p>
                      </div>
                    </div>
                    <span>{i.time || "Just now"}</span>
                  </div>
                  <div className="chat-left-main-div-message">
                    <p>{i.msg || "No message available"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-container-middle">
            <div className="chat-container-middle-top">
              <div className="chat-middle-main-div-image">
                <div className="chat-middle-main-div-img">
                  <img src={img2} alt="" />
                </div>
                <div className="chat-middle-main-div-name">
                  <h6>Leslie Alexander</h6>
                  <p>Web Designer</p>
                </div>
              </div>
              <div className="chat-container-middle-right">
                <IoCallOutline onClick={() => navigate("/post")} />
                <IoMdMore />
              </div>
            </div>
            <div className="chat-main-container">
              <div className="chat-main-time">
                <p>August 21</p>
              </div>
              <div className="chat-main-left-message">
                <div className="chat-main-left-message-img">
                  <img src={img2} alt="" />
                </div>
                <div className="chat-main-left-message-text">
                  <div className="chat-main-left-message-div">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Dolor mollis leo proin turpis eu hac. Tortor dolor eu at
                      bibendum suspendisse. Feugiat mi eu, rhoncus diam
                      consectetur libero morbi pharetra. Id tristique mi eget
                      eget tristique orci.
                    </p>
                  </div>
                  <span>10:15 pm</span>
                </div>
              </div>
              <div className="chat-main-right-message">
                <div className="chat-main-right-message-text">
                  <div className="chat-main-right-message-div">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Dolor mollis leo proin turpis eu hac. Tortor dolor eu at
                      bibendum suspendisse. Feugiat mi eu, rhoncus diam
                      consectetur libero morbi pharetra. Id tristique mi eget
                      eget tristique orci.
                    </p>
                  </div>
                  <span>10:15 pm</span>
                </div>
                <div className="chat-main-left-message-img">
                  <img src={img14} alt="" />
                </div>
              </div>
              <div className="chat-main-time">
                <p>August 22</p>
              </div>
              <div className="chat-main-left-message">
                <div className="chat-main-left-message-img">
                  <img src={img2} alt="" />
                </div>
                <div className="chat-main-left-message-text">
                  <div className="chat-main-left-message-audio">
                    <img src={img15} alt="" />
                  </div>
                  <span>06:00 pm</span>
                </div>
              </div>
            </div>
            <div className="chat-main-input">
              <input
                type="text"
                name=""
                id=""
                placeholder="Write a message..."
              />
              <div className="chat-main-input-icons">
                <FaPaperclip />
                <FaRegFaceSmile />
                <div className="chat-main-input-icon-send">
                  <LuSend />
                </div>
              </div>
            </div>
          </div>
          <div className="chat-container-right">
            <div className="chat-right-top">
              <div className="chat-right-image">
                <img src={img2} alt="" />
              </div>
              <div className="chat-right-name">
                <h6>Leslie Alexander</h6>
                <p>Web Designer</p>
                <span>
                  {" "}
                  <FaStar /> 4.7 (Rating)
                </span>
              </div>
            </div>
            <div className="chat-right-seeall">
              <h6>Lorem ipsum</h6>
              <p>See all</p>
            </div>
            <div className="chat-right-main-users">
              {data1.map((i, index) => (
                <div className="chat-right-user" key={index}>
                  <div className="chat-right-user-left">
                    <div className="chat-right-user-image">
                      <img src={i.profileimg} alt="" />
                    </div>
                    <div className="chat-right-user-name">
                      <h6>{i.name}</h6>
                      <p>{i.role}</p>
                    </div>
                  </div>
                  <div className="chat-right-user-right">
                    <span>{i.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
