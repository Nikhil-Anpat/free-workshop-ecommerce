/** @format */

import { useEffect, useState } from "react";
import "./FilterDropdown.css";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const FilterSidebar = ({
  categories,
  activecategory,
  handleSubCategory,
  selectedCondition,
  setSelectedCondition,
  setFromPrice,
  setToPrice,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [allConditions, setAllConditions] = useState(null);

  const fetchAllConditions = () => {
    getApi(endPoints.getAllConditions, {
      setResponse: setAllConditions,
    });
  };

  useEffect(() => {
    fetchAllConditions();
  }, []);

  const handleConditionChange = (conditionLabel) => {
    if (selectedCondition.includes(conditionLabel)) {
      setSelectedCondition(
        selectedCondition.filter((item) => item !== conditionLabel)
      );
    } else {
      setSelectedCondition([...selectedCondition, conditionLabel]);
    }
  };

  const handleApplyPriceRange = () => {
    setFromPrice(minPrice);
    setToPrice(maxPrice);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <p>All Categories</p>
        <h6>{activecategory}</h6>
        <ul>
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleSubCategory(category)}>
              {category?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Section */}
      <div className="filter-section-price">
        <h3>Filters</h3>
        <h2>Price range</h2>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
          <p>to</p>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={minPrice}
          />
          <button type="button" onClick={() => handleApplyPriceRange()}>
            Go
          </button>
        </div>
      </div>

      {/* Condition Section */}
      <div className="filter-section-condition">
        <h3>Condition</h3>
        {allConditions?.data?.map((item) => (
          <label
            className="condition-label"
            style={{ alignItems: "center" }}
            key={item?._id}
          >
            <input
              type="checkbox"
              checked={selectedCondition?.includes(item._id)}
              onChange={() => handleConditionChange(item._id)}
            />
            <div className="condition-label-content">
              <h6 style={{ margin: 0 }}> {item?.name} </h6>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
