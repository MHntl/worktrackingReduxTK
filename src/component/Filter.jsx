import React, { useRef } from "react";
import { sortOptions, typeOptions, statusOptions } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
} from "../redux/jobSlice";

const Filter = () => {
  const searchRef = useRef();
  const statusRef = useRef();
  const typeRef = useRef();
  const sortRef = useRef();

  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const handleChange = (e) => {
    dispatch(filterBySearch(e.target.value));
  };
  const handleReset = () => {
    dispatch(clearFilters());
    searchRef.current.value = " ";
    statusRef.current.value = "Selected";
    typeRef.current.value = "Selected";
    sortRef.current.value = "Selected";
  };
  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div>
          <label>Position</label>
          <input ref={searchRef} onChange={handleChange} type="search" />
        </div>
        {/* Select */}
        <div>
          <label>Status</label>
          <select
            ref={statusRef}
            onChange={(e) => dispatch(filterByStatus(e.target.value))}
            defaultValue="Selected"
          >
            <option disabled value="Selected">
              Select
            </option>
            {statusOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            ref={typeRef}
            onChange={(e) => dispatch(filterByType(e.target.value))}
            defaultValue="Selected"
          >
            <option disabled value="Selected">
              Select
            </option>
            {typeOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select
            ref={sortRef}
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            defaultValue="Selected"
          >
            <option disabled value="Selected">
              Select
            </option>
            {sortOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleReset} type="button" className="btn">
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
