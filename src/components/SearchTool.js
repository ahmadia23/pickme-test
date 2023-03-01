import React from "react";
import ReactSearchBox from "react-search-box";

const SearchTool = () => {
  return (
    <section>
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={this.data}
        callback={(record) => console.log(record)}
      />
    </section>
  );
};

export default SearchTool;
