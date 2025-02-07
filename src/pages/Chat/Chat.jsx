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
import img8 from "../../assets/images/img12.jpg";
import img9 from "../../assets/images/img13.jpg";
import img10 from "../../assets/images/img14.jpg";
import img11 from "../../assets/images/img15.jpg";
import img12 from "../../assets/images/img16.jpg";
import img13 from "../../assets/images/img17.jpg";
import img14 from "../../assets/images/img18.jpg";
import endPoints from "../../Repository/apiConfig";
import { getApi } from "../../Repository/Api";
import { db } from "../../../firebaseConfig";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Chat = () => {
  const data1 = [
    { profileimg: img8, name: "Acme Co.", role: "Viet Nam", time: "04:15 am" },
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
    { profileimg: img12, name: "Acme Co.", role: "Viet Nam", time: "04:15 am" },
    {
      profileimg: img13,
      name: "Abstergo Ltd.",
      role: "Monaco",
      time: "02:34 am",
    },
  ];

  const location = useLocation();
  const ownerData = location.state?.ownerData;
  const ownerId = ownerData?._id;
  const OwnerImage = ownerData?.image;
  const OwnerfullName = ownerData?.fullName;
  const Ownerphone = ownerData?.phone;
  const OwnerRatings = ownerData?.ratings;
  const UserID = sessionStorage.getItem("UserID");
  const [message, setMessage] = useState("");

  const messageSend = async () => {
    if (!message.trim()) return;

    try {
      let chatId;

      if (selectedChat?.id) {
        chatId = selectedChat.id;
      } else {
        const chatRef = collection(db, "chats");

        const chatQuery = query(
          chatRef,
          where("userid", "in", [UserID, ownerId]),
          where("ownerId", "in", [UserID, ownerId])
        );

        const chatSnapshot = await getDocs(chatQuery);

        if (!chatSnapshot.empty) {
          chatSnapshot.forEach((doc) => {
            chatId = doc.id;
          });
        } else {
          const newChat = await addDoc(chatRef, {
            userid: UserID,
            ownerId: ownerId,
            fullname: OwnerfullName,
            img: OwnerImage,
            phone: Ownerphone,
            lastMessage: message,
            ownerRatings: OwnerRatings,
            timestamp: serverTimestamp(),
          });
          chatId = newChat.id;
        }
      }

      const messagesRef = collection(db, "chats", chatId, "messages");

      await addDoc(messagesRef, {
        senderId: UserID,
        message: message,
        timestamp: serverTimestamp(),
      });

      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, {
        lastMessage: message,
        lastMessageTime: serverTimestamp(),
      });

      setMessagesChat((prevMessages) => [
        ...prevMessages,
        {
          senderId: UserID,
          message: message,
          timestamp: { seconds: Math.floor(Date.now() / 1000) },
        },
      ]);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [chatList, setChatList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const chatOwner = selectedChat || {
    img: OwnerImage,
    fullname: OwnerfullName,
    phone: Ownerphone,
    ownerRatings: OwnerRatings,
  };

  const fetchChats = async () => {
    try {
      if (!UserID) return;

      const chatRef = collection(db, "chats");
      const chatQuery = query(chatRef, where("userid", "==", UserID));

      const chatSnapshot = await getDocs(chatQuery);

      let fetchedChats = [];
      chatSnapshot.forEach((doc) => {
        fetchedChats.push({ id: doc.id, ...doc.data() });
      });

      setChatList(fetchedChats);

      if (!selectedChat) {
        const ownerChat = fetchedChats.find((chat) => chat.ownerId === ownerId);
        setSelectedChat(
          ownerChat || {
            img: OwnerImage,
            fullname: OwnerfullName,
            phone: Ownerphone,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [UserID]);

  const [messagesChat, setMessagesChat] = useState([]);

  const fetchMessages = async (chatId) => {
    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      const messagesSnapshot = await getDocs(messagesRef);

      let fetchedMessages = [];
      messagesSnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });

      setMessagesChat(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (selectedChat?.id) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const [profile, setProfile] = useState(null);

  const fetchProfile = () => {
    getApi(endPoints.auth.getProfile, {
      setResponse: setProfile,
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
                {/* <span>2 New</span> */}
              </div>
              <IoSettingsOutline />
            </div>
            <div className="chat-left-searchbar">
              <IoSearch />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <div className="chat-left-main">
              {chatList
                .sort(
                  (a, b) =>
                    b.lastMessageTime.seconds - a.lastMessageTime.seconds
                )
                .filter((chat) =>
                  chat.fullname.toLowerCase().includes(searchQuery)
                )
                .map((i, index) => (
                  <div
                    className="chat-left-main-div"
                    onClick={() => setSelectedChat(i)}
                    key={index}
                  >
                    <div className="chat-left-main-div-top">
                      <div className="chat-left-main-div-image">
                        <div className="chat-left-main-div-img">
                          <img src={i.img} alt="" />
                        </div>
                        <div className="chat-left-main-div-name">
                          <h6>{i.fullname || "Default Name"}</h6>
                          <p>{i.role || "Default Role"}</p>
                        </div>
                      </div>
                      <span>
                        {" "}
                        {new Date(
                          i.lastMessageTime?.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="chat-left-main-div-message">
                      <p>{i.lastMessage || "No message available"}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="chat-container-middle">
            <div className="chat-container-middle-top">
              {/* owner data bind */}
              <div className="chat-middle-main-div-image">
                {chatOwner?.img ? (
                  <div className="chat-middle-main-div-img">
                    <img
                      src={chatOwner.img}
                      alt={chatOwner.fullname || "User Avatar"}
                    />
                  </div>
                ) : (
                  <div className="chat-left-main-div-img">
                    <img src={chatOwner?.img} alt="" />
                  </div>
                )}
                <div className="chat-middle-main-div-name">
                  <h6>{chatOwner?.fullname || "User Name"}</h6>
                  <p>{chatOwner?.role || "Web Designer"}</p>
                </div>
              </div>

              <div className="chat-container-middle-right">
                <IoCallOutline />
                <IoMdMore />
              </div>
            </div>
            {/* message section */}

            <div className="chat-main-container">
              {messagesChat
                .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                .map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.senderId === UserID
                        ? "chat-main-right-message"
                        : "chat-main-left-message"
                    }
                  >
                    {msg.senderId !== UserID && (
                      <div className="chat-main-left-message-img">
                        <img src={OwnerImage} alt="Owner" />
                      </div>
                    )}

                    <div
                      className={
                        msg.senderId === UserID
                          ? "chat-main-right-message-text"
                          : "chat-main-left-message-text"
                      }
                    >
                      <div
                        className={
                          msg.senderId === UserID
                            ? "chat-main-right-message-div"
                            : "chat-main-left-message-div"
                        }
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span>
                        {new Date(
                          msg.timestamp?.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {msg.senderId === UserID && (
                      <div className="chat-main-left-message-img">
                        <img
                          src={
                            profile?.data?.image
                              ? profile?.data?.image
                              : img14
                          }
                          alt="user_avatar"
                          className="user_avatar"
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* message send */}
            <div className="chat-main-input">
              <input
                type="text"
                name=""
                id=""
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="chat-main-input-icons">
                <FaPaperclip />
                <FaRegFaceSmile />
                <div
                  className="chat-main-input-icon-send"
                  onClick={messageSend}
                >
                  <LuSend />
                </div>
              </div>
            </div>
          </div>
          <div className="chat-container-right">
            <div className="chat-right-top">
              <div className="chat-right-image">
                <img src={chatOwner.img} alt="" />
              </div>
              <div className="chat-right-name">
                <h6>{chatOwner.fullname || "User Avatar"}</h6>
                <p>Web Designer</p>
                <span>
                  {" "}
                  <FaStar /> {chatOwner?.ownerRatings} (Rating)
                </span>
              </div>
            </div>
            {/* <div className="chat-right-seeall">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
