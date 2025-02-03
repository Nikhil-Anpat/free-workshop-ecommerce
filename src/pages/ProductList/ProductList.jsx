/** @format */

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import FilterSidebar from "../../components/FilterDropdown/FilterDropdown";
import "./ProductList.css";
import QRcode from "../../components/CommonComponent/QRcode";
import TrackRoute from "../../components/CommonComponent/TrackRoute";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const ProductList = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [response, setResponse] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [selectedSubcategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";
    const queryParams = new URLSearchParams({
      page: 1,
      limit: 45,
      categoryId: id,
    });
    if (selectedSubcategoryId) {
      queryParams.append("subCategoryId", selectedSubcategoryId?.value);
    }
    if (selectedCondition?.length > 0) {
      selectedCondition.forEach((condition) => {
        queryParams.append("conditions", condition);
      });
    }
    if (fromPrice > 0) {
      queryParams.append("fromPrice", fromPrice);
    }
    if (toPrice > 0) {
      queryParams.append("toPrice", toPrice);
    }
    if (sort) {
      queryParams.append("sort", sort);
    }
    if (searchQuery) {
      queryParams.append("search", searchQuery);
    }

    getApi(endPoints.products.getAllProducts(queryParams?.toString()), {
      setResponse: (data) => {
        setResponse(data);
        setLoading(false);
      },
    });
  }, [
    id,
    selectedSubcategoryId,
    selectedCondition,
    fromPrice,
    toPrice,
    sort,
    location.search,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchSubCategories = useCallback(() => {
    setLoadingSubCategories(true);
    getApi(endPoints.subCategories.getSubCategoryByCatalog(id), {
      setResponse: (data) => {
        setSubCategories(data);
        setLoadingSubCategories(false);
      },
    });
  }, [id]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const handleSubCategory = (category) => {
    setSelectedSubCategoryId({
      value: category?._id,
      label: category?.name,
    });
  };

  const renderLoader = () => (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  const shouldShowNoProducts = () => {
    // Show no products message if:
    // 1. Response has empty docs array
    // 2. Response is a 404 error
    // 3. Response has docs with length 0
    return (
      !loading &&
      (response?.data?.docs?.length === 0 ||
        response?.status === 404 ||
        !response?.data?.docs)
    );
  };

  return (
    <>
      <div className="productlist-container">
        <QRcode />
        <div className="home-app-filter">
          <TrackRoute pageName={categoryName} setSort={setSort} sort={sort} />
        </div>
        <div className="productlist-container-items">
          <div className="productlist-left-filter">
            {loadingSubCategories ? (
              renderLoader()
            ) : (
              <FilterSidebar
                categories={subCategories?.data || []}
                activecategory={categoryName}
                handleSubCategory={handleSubCategory}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
                setFromPrice={setFromPrice}
                setToPrice={setToPrice}
              />
            )}
          </div>
          <div className="productlist-right">
            <div className="productlist-category">
              <h6>{categoryName}</h6>
            </div>
            <div className="productlist-subcategory">
              {selectedSubcategoryId && (
                <div className="productlist-subcategory-div">
                  <p> {selectedSubcategoryId?.label} </p>
                </div>
              )}
            </div>

            {loading ? (
              renderLoader()
            ) : shouldShowNoProducts() ? (
              <h4 className="no-data-found">
                Sorry, we couldn't find any products for this category. Please
                try another category or refine your search.
              </h4>
            ) : (
              <div className="productlist-products">
                {response?.data?.docs?.map((product) => (
                  <div className="productlist-products-div" key={product._id}>
                    <div className="productlist-products-image">
                      <img
                        src={product?.productImages?.[0]?.image}
                        alt={product.name}
                        onClick={() =>
                          navigate(
                            `/products/?id=${product?._id}`
                          )
                        }
                      />
                    </div>
                    <div className="productlist-products-content">
                      <Link to={`/products/?id=${product?._id}`}>
                        <h6>{product.name}</h6>
                      </Link>
                      {/* <span>${product.price}</span> */}
                      <p>{product.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
