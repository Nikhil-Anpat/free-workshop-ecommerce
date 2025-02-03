import { useState, useEffect, useRef } from 'react';
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import notification_img from "../../assets/images/notification.png";
import './NotificationPopup.css';

const NotificationPopup = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const fetchNotifications = () => {
    getApi(endPoints.notifications.getAll(), {
      setResponse: (data) => {
        setNotifications(data?.data || []);
      },
    });
  };

  const deleteNotification = async (id) => {
    try {
      await getApi(endPoints.notifications.delete, {
        body: {
          Ids: [id]
        }
      });
      setNotifications(prev => prev.filter(notif => notif._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="notification-wrapper" ref={popupRef}>
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
      >
        <img
          src={notification_img}
          alt="notification"
          className="notification-icon"
        />
      </div>

      {isOpen && (
        <div className="notification-popup">
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="notification-content">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className="notification-item"
                >
                  <div className="notification-item-header">
                    <h4 className="notification-item-title">
                      {notification.title}
                    </h4>
                    <button
                      className="delete-button"
                      onClick={() => deleteNotification(notification._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="notification-item-body">
                    {notification.body}
                  </p>
                  <p className="notification-item-date">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;