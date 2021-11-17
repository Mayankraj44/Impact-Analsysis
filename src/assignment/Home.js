import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Home = () => {
  const [mainData, setMainData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(async () => {
    const data = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
    ).then((resp) => {
//       console.log(resp);
      return resp.json();
    });
    setMainData(data);
    setFilterData(data);
    let reject = localStorage.getItem("rejected");
    let shortlist = localStorage.getItem("shortlisted");
    const value = JSON.stringify([]);
    if (!reject) {
      localStorage.setItem("rejected", value);
    }
    if (!shortlist) {
      localStorage.setItem("shortlisted", value);
    }
  }, []);

  const setData = (item) => {
    localStorage.setItem("currentUser", JSON.stringify(item));
  };
  return (
    <>
      <SearchBar data={mainData} setData={setFilterData} />
      <Link to="/shortlisted">
        <button className="buttons">SHORTLISTED</button>
      </Link>
      <Link to="/rejected">
        {" "}
        <button className="buttons">REJETCED</button>
      </Link>
      <div className="flex-center">
        {filterData?.length ? (
          filterData.map((item) => (
            <Link
              to={{ pathname: `/${item.id}`, data: "Hello" }}
              onClick={() => {
                setData(item);
              }}
              key={item.id}
            >
              <div className="users">
                <img
                  src={item.Image}
                  width="300px"
                  height="300px"
                  className="dp"
                />
                <div className="details">Id : {item.id}</div>
                <div className="details">Name : {item.name}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-data">No User Found</div>
        )}
      </div>
    </>
  );
};
