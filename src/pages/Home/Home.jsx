import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QRcode from "../../components/CommonComponent/QRcode";
import SeachByCities from "../../components/CommonComponent/SeachByCities";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import styles from "../../css/home.module.css";
import {useSelector, useDispatch } from "react-redux";
import { SET_LOCATION, selectLatitude, selectLongitude } from "../../store/locationSlice";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(45);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


    const latitude = useSelector(selectLatitude);
    const longitude = useSelector(selectLongitude);
    const dispatch = useDispatch();

    useEffect(() => {
      console.log("latitude",latitude)
      console.log("longitude",longitude)
      if (searchParams.get("latitude") && searchParams.get("longitude")) {
        dispatch(SET_LOCATION({
          latitude: searchParams.get("latitude"),
          longitude: searchParams.get("longitude"),
        }));
      }
    }, [location.search, dispatch,latitude,longitude]);

  const fetchProduct = useCallback(() => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    const queryParams = new URLSearchParams({
      page: 1,
      limit,
      ...(searchQuery && { search: searchQuery }),
      ...(latitude && longitude && { latitude, longitude }),
    });

    getApi(endPoints.products.getAllProducts(queryParams.toString()), {
      setResponse: (data) => {
        setProducts(data);
        setLoading(false);
      },
      setError: () => {
        setLoading(false);
        setProducts(null);
      },
    });
  }, [location.search, limit, latitude, longitude]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className={styles.loader_container}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!products?.data?.docs?.length) {
    return <h2>No data found</h2>;
  }

  return (
    <>
      <div>
        <QRcode />
        <div className={styles.product_container}>
          {products?.data?.docs?.map((product) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.thumbnail}>
                <img
                  src={product?.productImages?.[0]?.image}
                  alt={product.name}
                  onClick={() => navigate(`/products/?id=${product?._id}`)}
                />
              </div>
              <div className={styles.product_info}>
                <Link to={`/product/?id=${product?._id}`}>
                  <h6 className={styles.product_name}>{product.name}</h6>
                </Link>
                <p className={styles.location}>{product.locationValue}</p>
              </div>
            </div>
          ))}
        </div>
        {products?.data?.hasNextPage && (
          <div className={styles.view_more_btn_container}>
            <button type="button" onClick={() => setLimit(limit + 10)}>
              View more
            </button>
          </div>
        )}
        <SeachByCities />
      </div>
    </>
  );
};

export default Home;
