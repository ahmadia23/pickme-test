import React from "react";
import ReactSearchBox from "react-search-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchTool.css";

const SearchTool = (props) => {
  return (
    <section>
      <form onSubmit={props.onSubmit} className="search-tool">
        <div className="search-bar">
          <ReactSearchBox
            placeholder="Search all the GIFs"
            onChange={props.onChange}
            value={props.value}
            data={props.data}
            leftIcon={
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            }
          />
        </div>
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
      </form>
    </section>
  );
};

export default SearchTool;
