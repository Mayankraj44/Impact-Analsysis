import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Child = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [status, setStatus] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("currentUser"));
    setData(res);
    let rejectlist = JSON.parse(localStorage.getItem("rejected"));
    let shortlist = JSON.parse(localStorage.getItem("shortlisted"));
    if (rejectlist.includes(id)) {
      setStatus("REJECTED");
    } else if (shortlist.includes(id)) {
      setStatus("SHORTLISTED");
    }
  }, []);

  const rejectCandidate = (id) => {
    let rejectlist = JSON.parse(localStorage.getItem("rejected"));
    rejectlist.push(id);
    localStorage.setItem("rejected", JSON.stringify(rejectlist));
    navigate("/");
  };
  const shortListCandidate = (id) => {
    let shortlist = JSON.parse(localStorage.getItem("shortlisted"));
    shortlist.push(id);
    localStorage.setItem("shortlisted", JSON.stringify(shortlist));
    navigate("/");
  };
  return (
    <>
      <div className="header">User</div>
      <div className="flex-center">
        {data && (
          <div className="users">
            <img src={data.Image} width="300px" height="300px" className="dp" />
            <div className="details">Id : {data.id}</div>
            <div className="details">Name : {data.name}</div>
            {status ? (
              status === "REJECTED" ? (
                <div className="rejected">REJECTED</div>
              ) : (
                <div className="shortlisted">SHORTLISTED</div>
              )
            ) : (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                className="action-btn-bar"
              >
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
        )}
      </div>
    </>
  );
};
