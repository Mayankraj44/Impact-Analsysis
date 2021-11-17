import React from "react";

export const SearchBar = ({ data, setData }) => {
  const search = (val) => {
    const keyword = val.toLowerCase();
    const newData = data.filter((item) => {
      if (
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword)
      ) {
        return item;
      }
    });
    setData(newData);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          search(e.target.value);
        }}
        className="search-bar"
      />
    </div>
  );
};
