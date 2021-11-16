import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";

export const Child = (props) => {
        const navigate=useNavigate()
  let { id } = useParams();
  const [status, setStatus] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("currentUser"));
    setData(res);
    let rejectlist = JSON.parse(localStorage.getItem("rejected"));
    let shortlist = JSON.parse(localStorage.getItem("shortlisted"));
    if (rejectlist.includes(id)) {
      setStatus("rejected");
    } else if (shortlist.includes(id)) {
      setStatus("shortlisted");
    }
  }, []);

  console.log(props);
  console.log(data);
  const rejectCandidate = (id) => {
    let rejectlist = JSON.parse(localStorage.getItem("rejected"));
    rejectlist.push(id);
    localStorage.setItem("rejected", JSON.stringify(rejectlist));
    navigate("/")
  };
  const shortListCandidate = (id) => {
    let shortlist = JSON.parse(localStorage.getItem("shortlisted"));
    shortlist.push(id);
    localStorage.setItem("shortlisted", JSON.stringify(shortlist));
    navigate("/")
    
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data && (
        <div style={{ margin: "10px" }}>
          <img src={data.Image} width="200px" height="200px" />
          <div>Id : {data.id}</div>
          <div>Name : {data.name}</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {status ? `${status}` :
            <>
            <button
              onClick={() => rejectCandidate(data.id)}
              disabled={status}
            >
              Reject
            </button>
            <button
              onClick={() => shortListCandidate(data.id)}
              disabled={status}
            >
              Shortlist
            </button>
            </>
            }
          </div>
        </div>
      )}
    </div>
  );
};
