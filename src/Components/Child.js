import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import STATUS from "./constants";

export const Child = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
      ).then((resp) => {
        return resp.json();
      });
      const user = data.find((item) => item.id === id);
      setData(user);
    }

    fetchData();
    const rejectlist = JSON.parse(localStorage.getItem(STATUS.REJECTED));
    const shortlist = JSON.parse(localStorage.getItem(STATUS.SHORTLISTED));
    if (rejectlist.includes(id)) {
      setStatus("REJECTED");
    } else if (shortlist.includes(id)) {
      setStatus("SHORTLISTED");
    }
  }, [id]);

  const rejectCandidate = (id) => {
    const rejectlist = JSON.parse(localStorage.getItem(STATUS.REJECTED));
    rejectlist.push(id);
    localStorage.setItem(STATUS.REJECTED, JSON.stringify(rejectlist));
    navigate("/");
  };

  const shortListCandidate = (id) => {
    const shortlist = JSON.parse(localStorage.getItem(STATUS.SHORTLISTED));
    shortlist.push(id);
    localStorage.setItem(STATUS.SHORTLISTED, JSON.stringify(shortlist));
    navigate("/");
  };

  return (
    <>
      <div className="header">User</div>
      <div className="flex-center">
        {data && id === data?.id ? (
          <div className="users">
            <img
              src={data.Image}
              width="300px"
              height="300px"
              className="dp"
              alt="user"
            />
            <div className="details">Id : {data.id}</div>
            <div className="details">Name : {data.name}</div>
            {status ? (
              status === "REJECTED" ? (
                <div className="rejected">REJECTED</div>
              ) : (
                <div className="shortlisted">SHORTLISTED</div>
              )
            ) : (
              <div className="action-btn-bar">
                <button
                  className="buttons"
                  onClick={() => rejectCandidate(data.id)}
                  disabled={status}
                >
                  Reject
                </button>
                <button
                  className="buttons"
                  onClick={() => shortListCandidate(data.id)}
                  disabled={status}
                >
                  Shortlist
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-data">No User Found</div>
        )}
      </div>
    </>
  );
};
