import "./FormSearch.css";
import React from "react";
import { MdSearch } from "react-icons/md";

const FormSearch = ({ searchValue, setSearchValue }) => {
  return (
    <div className="form-search">
      <div className="input-field">
        <button className="btn-search" type="button">
          <MdSearch className="btn-search-icon" />
        </button>
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
    </div>
  );
};

export default FormSearch;
