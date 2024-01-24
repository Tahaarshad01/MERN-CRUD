import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Fetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    await fetch("http://localhost:5000/fetch")
      .then((res) => res.json())
      .then((rec) => {
        console.log(rec);
        setData(rec);
      })
      .catch(() => console.log("Api call error"));
  };
  const deletedata = async (id) => {
    let dele = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    if (dele.ok) {
      getAll();
    }
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Address</th>
            {/* <th scope="col">Date</th> */}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((val, ind) => (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.mobile}</td>
                <td>{val.address}</td>
                {/* <td>{val.date}</td> */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletedata(val._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${val._id}`}>
                    <button
                      className="btn btn-warning"
                      style={{ marginLeft: "10px" }}
                    >
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Fetch;
