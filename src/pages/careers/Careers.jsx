/** @format */

import "./Careers.css";
import { IoMdArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Careers = () => {
  const [banner, setBanner] = useState(null);
  const [careerOpening, setCareerOpening] = useState(null);

  const fetchOpening = () => {
    getApi(endPoints.career.getOpenings, {
      setResponse: setCareerOpening,
    });
  };

  const fetchBanner = () => {
    getApi(endPoints.career.getBanner, {
      setResponse: setBanner,
    });
  };

  useEffect(() => {
    fetchBanner();
    fetchOpening();
  }, []);

  const fullTimeJobs = careerOpening?.data?.filter(
    (i) => i?.category?.type === "Full Time"
  );

  const contractJobs = careerOpening?.data?.filter(
    (i) => i?.category?.type === "Contact"
  );

  return (
    <>
      <div className="trust-container">
        {banner && (
          <div className="trust-top">
            <div className="trust-top-left">
              <h1> {banner?.data?.[0]?.title} </h1>
              <p>{banner?.data?.[0]?.description}</p>
            </div>
            <div className="trust-top-right">
              <img src={banner?.data?.[0]?.image} alt="" />
            </div>
          </div>
        )}
        <div className="careers-second">
          <h5>Full Time Openings</h5>
          {fullTimeJobs?.map((item, index) => (
            <div className="careers-third" key={`full_time${index}`}>
              <div className="careers-third-left">
                <h4> {item?.category?.title} </h4>
              </div>
              <div className="careers-third-right">
                {item?.career?.map((job) => (
                  <div className="careers-third-right-div" key={job?._id}>
                    <div className="careers-third-right-div-left">
                      <h6>{job?.title}</h6>
                      <span> {job?.location} </span>
                    </div>
                    <p>
                      View Job <IoMdArrowForward />{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="careers-second">
          <h5>Contract Openings</h5>
          {contractJobs?.map((item, index) => (
            <div className="careers-third" key={`contract_job${index}`}>
              <div className="careers-third-left">
                <h4> {item?.category?.title} </h4>
              </div>
              <div className="careers-third-right">
                {item?.career?.map((job) => (
                  <div className="careers-third-right-div" key={job?._id}>
                    <div className="careers-third-right-div-left">
                      <h6>{job?.title}</h6>
                      <span> {job?.location} </span>
                    </div>
                    <p>
                      View Job <IoMdArrowForward />{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="careers-fourth"></div>
      </div>
    </>
  );
};

export default Careers;
