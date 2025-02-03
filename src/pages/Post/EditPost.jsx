import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ClipLoader } from "react-spinners";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [conditions, setConditions] = useState("");
  const [video, setVideo] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [type, setType] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState(null);
  const [allSubCategories, setAllSubCategories] = useState(null);
  const [allConditions, setAllConditions] = useState(null);
  const [allBrands, setAllBrands] = useState(null);
  const [allModels, setAllModels] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const fetchProductDetails = useCallback(() => {
    getApi(endPoints.products.getProductDetail(id), {
      setResponse: setProductDetails,
    });
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    if (productDetails) {
      const item = productDetails?.data;
      const categoryId = item?.categoryId;
      const subCategoryId = item?.subCategoryId;

      setCategoryId(categoryId);
      setName(item?.name);
      setDescription(item?.description);
      setPrice(item?.price);
      setLocation(item?.location);
      setSubCategoryId(subCategoryId);
      setConditions(item?.conditions);
      setBrandId(item?.brandId);
      setModelId(item?.modelId);
      setType(item?.type);
      setIsFree(item?.isFree);

      // Trigger subcategory fetch when category is set
      if (categoryId) {
        getApi(endPoints.subCategories.getSubCategoryByCatalog(categoryId), {
          setResponse: setAllSubCategories,
        });
      }
    }
  }, [productDetails]);

  useEffect(() => {
    fetchCategories();
    fetchConditions();
    fetchBrands();
    fetchModels();
  }, []);

  const fetchSubCategories = useCallback(() => {
    if (categoryId) {
      getApi(endPoints.subCategories.getSubCategoryByCatalog(categoryId), {
        setResponse: setAllSubCategories,
      });
    }
  }, [categoryId]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const fetchCategories = () => {
    getApi(endPoints.getCategories, {
      setResponse: setAllCategories,
    });
  };

  const fetchConditions = () => {
    getApi(endPoints.getAllConditions, {
      setResponse: setAllConditions,
    });
  };

  const fetchBrands = () => {
    getApi(endPoints.getAllBrands, {
      setResponse: setAllBrands,
    });
  };

  const fetchModels = () => {
    getApi(endPoints.getAllModels, {
      setResponse: setAllModels,
    });
  };

  const fd = new FormData();
  fd.append("name", name);
  fd.append("categoryId", categoryId);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("location", location);
  fd.append("image", image);
  fd.append("subCategoryId", subCategoryId);
  fd.append("conditions", conditions);
  fd.append("video", video);
  fd.append("brandId", brandId);
  fd.append("modelId", modelId);
  fd.append("type", type);
  fd.append("isFree", true);

  const createPost = (e) => {
    e.preventDefault();
    putApi(endPoints.products.editPost(id), fd, {
      setLoading,
      successMsg: "Successfully Edited",
      showErr: true,
      additionalFunctions: [() => navigate("/post/thank-you")],
    });
  };

  return (
    <div className="post-form-container">
      <form onSubmit={createPost}>
        <div className="post-form-main-div">
          <div className="post-form-heading">
            <h6>Category (Required)</h6>
          </div>
          <div className="post-form-inputes">
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              required
            >
              <option value="">Select Option</option>
              {allCategories?.data?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {categoryId && (
          <div className="post-form-main-div">
            <div className="post-form-heading">
              <h6>Sub-Category (Optional)</h6>
            </div>
            <div className="post-form-inputes">
              <select
                onChange={(e) => setSubCategoryId(e.target.value)}
                value={subCategoryId}
              >
                <option value="">Select Option</option>
                {allSubCategories?.data?.map((item) => (
                  <option value={item?._id} key={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="post-form-main-div">
          <div className="post-form-heading">
            <h6>Product Information</h6>
          </div>
          <div className="post-form-inputes">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="post-form-inputes">
            <label>Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>

          <div className="post-form-inputes">
            <label>Condition (Required)</label>
            <select
              onChange={(e) => setConditions(e.target.value)}
              value={conditions}
              required
            >
              <option value="">Ex: Used</option>
              {allConditions?.data?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="post-form-inputes">
            <label>Brand (Optional)</label>
            <select
              onChange={(e) => setBrandId(e.target.value)}
              value={brandId}
            >
              <option value="">Ex: Sony, Panasonic</option>
              {allBrands?.data?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="post-form-inputes">
            <label>Model (Optional)</label>
            <select
              onChange={(e) => setModelId(e.target.value)}
              value={modelId}
            >
              <option value="">Ex: 2023, 2024</option>
              {allModels?.data?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="post-form-inputes">
            <label>Type (Optional)</label>
            <input
              type="text"
              onChange={(e) => setType(e.target.value)}
              value={type}
              placeholder="Ex: New 2023 (2.3.2)"
            />
          </div>

          <div className="post-form-inputes">
            <label>Price</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>

        <div className="post-form-main-div">
          <div className="post-form-heading">
            <h6>Images</h6>
          </div>
          <div className="post-form-image-div">
            <p>
              Recommended image size (870x493px)
              <br />
              Max image size 3 MB
              <br />
              Allowed image types: PNG, JPG, JPEG
              <br />
              Up to 5 images can be uploaded
            </p>
            <div className="post-form-images">
              <div className="post-form-image-left">
                <h1>{image?.name ? image?.name : "Choose files to upload"}</h1>
              </div>
              <div className="post-form-image-right">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-file").click()
                  }
                >
                  Choose Files
                </button>
              </div>
            </div>
            <input
              type="file"
              id="image-file"
              onChange={(e) => setImage(e.target.files[0])}
              className="d-none"
            />
            <span>© innostudio.de • Fileuploader</span>
          </div>
        </div>

        <div className="post-form-main-div">
          <div className="post-form-heading">
            <h6>Video URL (Optional)</h6>
          </div>
          <div className="post-form-inputes">
            <input
              type="text"
              placeholder="Only YouTube & Video URL"
              onChange={(e) => setVideo(e.target.value)}
              value={video}
            />
          </div>
        </div>

        <div className="post-form-main-div">
          <div className="post-form-heading">
            <h6>Contact Details</h6>
          </div>
          <div className="post-form-inputes">
            <label>Location</label>
            <input
              type="text"
              placeholder="Select Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>
        </div>

        <div className="post-form-inputes-check">
          <div className="post-form-check">
            <input type="checkbox" />
            <h5>Don't show map</h5>
          </div>
          <div className="post-form-check">
            <input type="checkbox" required />
            <h5>
              I have read and agree to the website{" "}
              <span>Terms & Conditions</span>.
            </h5>
          </div>
          <button className="post-form-inputes-check-btn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;