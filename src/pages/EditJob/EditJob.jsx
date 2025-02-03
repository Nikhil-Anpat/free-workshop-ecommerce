import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiImage, FiUser } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useParams, useNavigate } from "react-router-dom";

const MapHandler = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);

  return null;
};

const EditJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [storage, setStorage] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [typeOfJob, setTypeOfJob] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null); // To store existing image URL
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hideMap, setHideMap] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/getJobs/${id}`
        );
        const data = await response.json();
        // if (data.status === 200) {
        const job = data.data;
        console.log(data.data);

        setServiceCategoryId(job.serviceCategoryId);
        setTitle(job.title);
        setDescription(job.description);
        setSalary(job.salary);
        setStorage(job.storage);
        setLocation(job.location);
        setLatitude(job.latitude);
        setLongitude(job.longitude);
        setTypeOfJob(job.typeOfJob);
        setCurrentImage(job.image);
        setStatus(job.status);
        if (job.latitude && job.longitude) {
          setSelectedPlace({
            geometry: {
              location: { lat: () => job.latitude, lng: () => job.longitude },
            },
          });
        }
        // }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/ServiceCategory/allServiceCategory"
        );
        const data = await response.json();
        if (data.status === 200) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Google Maps Places Autocomplete
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const inputElement = inputRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["address"],
          }
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            setLatitude(place.geometry.location.lat());
            setLongitude(place.geometry.location.lng());
          }
          setSelectedPlace(place);
          setLocation(place?.formatted_address || "");
        });
        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [inputRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("serviceCategoryId", serviceCategoryId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("salary", salary);
    formData.append("storage", storage);
    formData.append("location", location);
    formData.append("latitude", latitude?.toString() || "");
    formData.append("longitude", longitude?.toString() || "");
    formData.append("typeOfJob", typeOfJob);
    if (image) {
      formData.append("image", image);
    }
    formData.append("status", status);

    try {
      const response = await fetch(
        `https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/updateJobs/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        navigate("/jobs"); // Adjust navigation path as needed
      }
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File size should not exceed 3MB");
        return;
      }

      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG and JPEG files are allowed");
        return;
      }

      setImage(file);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="main-container">
          <div className="label-container">
            <GoTag />
            <h6>Job Category (Required)</h6>
          </div>
          <div className="input-container">
            <select
              onChange={(e) => setServiceCategoryId(e.target.value)}
              value={serviceCategoryId}
              required
            >
              <option value="">Select Job Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="main-container">
          <div className="label-container">
            <IoIosInformationCircleOutline />
            <h6>Job Information:</h6>
          </div>
          <div className="input-container">
            <label>Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter job title"
            />
          </div>

          <div className="input-container">
            <label>Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter job description"
            />
          </div>

          <div className="input-container">
            <label>Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              placeholder="Enter salary amount"
              min="0"
            />
          </div>

          <div className="input-container">
            <label>Storage</label>
            <input
              type="text"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="Enter storage details"
            />
          </div>

          <div className="input-container">
            <label>Type of Job</label>
            <select
              value={typeOfJob}
              onChange={(e) => setTypeOfJob(e.target.value)}
              required
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div className="main-container">
          <div className="label-container">
            <FiImage />
            <h6>Job Image:</h6>
          </div>
          <div className="upload-img-container">
            {currentImage && (
              <div className="current-image">
                <img
                  src={currentImage}
                  alt="Current job image"
                  style={{ maxWidth: "200px", marginBottom: "1rem" }}
                />
              </div>
            )}
            <p>
              Recommended image size to (870x493px)
              <br />
              Image maximum size 3 MB
              <br />
              Allowed image type (png, jpg, jpeg)
            </p>

            <div className="select-image">
              <div className="image-input-left">
                <h1>{image?.name || "Choose file to upload"}</h1>
              </div>
              <div className="image-input-right">
                <button
                  type="button"
                  onClick={() => document.getElementById("image-file").click()}
                >
                  Choose File
                </button>
              </div>
            </div>

            <input
              type="file"
              id="image-file"
              onChange={handleImageChange}
              accept="image/png,image/jpeg,image/jpg"
              className="d-none"
            />
          </div>
        </div>

        <div className="main-container">
          <div className="label-container">
            <FiUser />
            <h6>Location Details:</h6>
          </div>
          <div className="input-container">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              ref={inputRef}
              required
              placeholder="Enter location"
            />
          </div>

          {!hideMap && (
            <div className="map-container">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
                <Map
                  style={{ width: "100%", height: "400px" }}
                  defaultCenter={{
                    lat: latitude || 28.6448,
                    lng: longitude || 77.216721,
                  }}
                  defaultZoom={5}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                  mapId="49ae42fed52588c3"
                >
                  <MapHandler place={selectedPlace} />
                  {latitude && longitude && (
                    <AdvancedMarker
                      position={{ lat: latitude, lng: longitude }}
                    />
                  )}
                </Map>
              </APIProvider>
            </div>
          )}
        </div>

        <div className="form-actions">
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={(e) => setHideMap(e.target.checked)}
              checked={hideMap}
            />
            <h5>Don't show map</h5>
          </div>
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" size={20} /> : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
