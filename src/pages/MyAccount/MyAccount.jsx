import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Dashboard.css";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { BiLoaderCircle } from "react-icons/bi";
import MyJobs from "../../components/MyJobs/MyJobs";

const Dashboard = () => {
  const fileInputRef = useRef(null);
  // Set initial state for dashboard data and loading
  const [dashboardData, setDashboardData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    bio: "",
    phone: "",
    website: "",
    latitude: "",
    longitude: "",
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      // Update fullName when firstName or lastName changes
      ...(name === "firstName" || name === "lastName"
        ? {
            fullName:
              name === "firstName"
                ? `${value} ${prevState.lastName}`
                : `${prevState.firstName} ${value}`,
          }
        : {}),
    }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Show image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("profileImagePreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submissions
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);

      // Only append image if a new one was selected
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      // Make API call
      await putApi(endPoints.account.updateProfile(), formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        setResponse: (response) => {
          // Update profile data with new values
          setProfileData(response.data);
          // Show success message
          alert("Profile updated successfully");
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // API call would go here
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    // API call would go here
  };

  // Fetch dashboard data from the API
  const fetchDashboard = useCallback(() => {
    setIsLoading(true);
    getApi(endPoints.account.getDashboard(), {
      setResponse: (data) => {
        setDashboardData(data.data);
        setIsLoading(false);
      },
    });
  }, []);

  const fetchProfile = useCallback(() => {
    setIsLoading(true);
    getApi(endPoints.account.getProfile(), {
      setResponse: (data) => {
        setProfileData(data.data);

        // Split full name into first and last name
        const nameParts = (data.data.fullName || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        // Update form data with all available profile fields
        setFormData((prevState) => ({
          ...prevState,
          firstName: firstName,
          lastName: lastName,
          fullName: data.data.fullName || "",
          email: data.data.email || "",
          bio: data.data.bio || "",
          phone: data.data.phone || "",
          website: data.data.website || "",
          latitude: data.data.latitude || "",
          longitude: data.data.longitude || "",
          // Preserve password fields as empty
          oldPassword: "",
          newPassword: "",
          retypePassword: "",
        }));
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    if (activeView === "dashboard") {
      fetchDashboard();
    } else if (activeView === "settings") {
      fetchProfile();
    }
  }, [fetchDashboard, fetchProfile, activeView]);

  const renderDashboardContent = () => (
    <>
      <h2 className="page_title">Listings</h2>
      {/* Stats Grid */}
      <div className="stats_grid">
        {dashboardData ? (
          <>
            <div className="stat_card">
              <div className="stat_content">
                <div>
                  <p className="stat_value">{dashboardData.post}</p>
                  <p className="stat_label">Posts</p>
                </div>
              </div>
            </div>

            <div className="stat_card">
              <div className="stat_content">
                <div>
                  <p className="stat_value">{dashboardData.view}</p>
                  <p className="stat_label">Views</p>
                </div>
              </div>
            </div>

            <div className="stat_card">
              <div className="stat_content">
                <div>
                  <p className="stat_value">{dashboardData.sold}</p>
                  <p className="stat_label">Sold</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>
            <BiLoaderCircle />
          </p>
        )}
      </div>
    </>
  );

  const renderSettingsContent = () => (
    <>
      <h2 className="page_title">Account Settings</h2>
      {isLoading ? (
        <div className="loading_container">
          <BiLoaderCircle className="spinner" />
        </div>
      ) : (
        <div className="settings_container">
          {/* Personal Details Section */}
          <div className="settings_section">
            <h3 className="section_title">Personal Detail :</h3>

            <div className="profile_image_section">
              <div
                className="profile_image"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              >
                <img
                  id="profileImagePreview"
                  src={profileData.image || "/api/placeholder/100/100"}
                  alt="Profile"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <button
                type="button"
                className="change_picture_btn"
                onClick={handleImageClick}
              >
                Change Picture
              </button>
            </div>

            <form onSubmit={handleSaveChanges} className="settings_form">
              <div className="form_group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>

              <div className="form_group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>

              <div className="form_group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled
                />
              </div>

              <div className="form_group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>

              <div className="form_group">
                <label>Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="Latitude"
                />
              </div>

              <div className="form_group">
                <label>Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Longitude"
                />
              </div>

              <button type="submit" className="save_btn">
                Save Changes
              </button>
            </form>
          </div>

          {/* Keep the password change section the same */}
          <div className="settings_section">
            <h3 className="section_title">Change password :</h3>

            <form onSubmit={handlePasswordChange} className="settings_form">
              <div className="form_group">
                <label>Old password :</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your current password"
                />
              </div>

              <div className="form_group">
                <label>New password :</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your new password"
                />
              </div>

              <div className="form_group">
                <label>Re-type New password :</label>
                <input
                  type="password"
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your new password"
                />
              </div>

              <button type="submit" className="save_btn">
                Save password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="dashboard_container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar_content">
          <div
            className={`nav_link ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
            style={{ cursor: "pointer" }}
          >
            Dashboard
          </div>

          <nav className="sidebar_nav">
            <button className="nav_link">Favourites</button>
            <button className="nav_link">Chat</button>
            <button
              className={`nav_link ${activeView === "myjobs" ? "active" : ""}`}
              onClick={() => setActiveView("myjobs")}
            >
              My Jobs
            </button>
            <button
              className={`nav_link ${
                activeView === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveView("settings")}
            >
              Account Settings
            </button>
            <button className="nav_link">Logout</button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="main_content">
        {activeView === "dashboard" ? (
          renderDashboardContent()
        ) : activeView === "settings" ? (
          renderSettingsContent()
        ) : (
          <MyJobs />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
