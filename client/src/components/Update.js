import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
function Update() {
  const params = useParams();
  // console.log(params.id);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    mobile: "",
    address: "",
  });
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    await fetch("https://crudd-id2m.onrender.com/getDetails/" + params.id)
      .then((res) => res.json())
      .then((rec) => {
        console.log(rec);
        setState(rec);
      })
      .catch(() => console.log("api call error"));
  };

  //show and hide password ////
  const [pass, setPass] = useState({
    type: "password",
    btnName: "show password",
  });
  const pshow = () => {
    pass.type === "password"
      ? setPass({ type: "text", btnName: "Hide password" })
      : setPass({ type: "password", btnName: "show password" });
  };
  ////---------------show and hide conPassword-------------///
  const [Cpass, setCPass] = useState({
    type: "password",
    CbtnName: "show password",
  });
  const Cpshow = () => {
    Cpass.type === "password"
      ? setCPass({ type: "text", CbtnName: "Hide password" })
      : setCPass({ type: "password", CbtnName: "show password" });
  };
  const handler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitData = () => {
    const { name, email, password, conPassword, mobile, address } = state;
    if (password === conPassword) {
      fetch(`https://crudd-id2m.onrender.com/update/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          address,
          mobile,
          password,
          conPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setState(json);
          document.getElementById("result").innerHTML =
            "Update successfully!!!";
        })
        .catch(() => console.log("api call error"));
    } else {
      document.getElementById("result").innerHTML =
        "Password and Confirm password dosent match";
    }
  };
  return (
    <>
      <section className="m-5">
        <div className="m-5">
          <div className="text-center fs-2 mb-4 fw-bold">Update Data</div>
          <form>
            <input
              type="text"
              className="form-control p-2 px-3 my-3"
              placeholder="Your name.."
              name="name"
              value={state.name}
              onChange={handler}
            />

            <input
              type="email"
              className="form-control p-2 px-3 my-3"
              placeholder="Your Email.."
              name="email"
              value={state.email}
              onChange={handler}
            />

            <input
              type="number"
              className="form-control p-2 px-3 my-3"
              placeholder="Your Mobile No.."
              name="mobile"
              value={state.mobile}
              onChange={handler}
            />

            <input
              type={pass.type}
              className="form-control p-2 px-3 my-3"
              placeholder="Your password.."
              name="password"
              value={state.password}
              onChange={handler}
            />

            <div className="form-check form-switch mb-3">
              <label className="form-check-label" id="flexCheckDefault1">
                <input
                  type="checkbox"
                  role="switch"
                  className="form-check-input px-2 mb-1"
                  onClick={pshow}
                  id="flexCheckDefault"
                />{" "}
                {pass.btnName}
              </label>
            </div>

            <input
              type={Cpass.type}
              className="form-control p-2 px-3 my-3"
              placeholder="Your ConfirmPassword.."
              name="conPassword"
              value={state.ConPassword}
              onChange={handler}
            />

            <div className="form-check form-switch mb-3">
              <label className="form-check-label" id="flexCheckDefault">
                <input
                  type="checkbox"
                  role="switch"
                  className="form-check-input px-2 mb-1"
                  onClick={Cpshow}
                  id="flexCheckDefault1"
                />{" "}
                {Cpass.CbtnName}
              </label>
            </div>

            <div className="form-group mb-3">
              <textarea
                type="address"
                className="form-control"
                rows="3"
                placeholder="Your Address Here.."
                name="address"
                value={state.address}
                onChange={handler}
              />
            </div>
            <button
              type="button"
              onClick={submitData}
              className="btn fw-bold btn-primary w-100"
            >
              Update Data
            </button>
          </form>
          <div
            className="text-center text-success fs-1 fw-bold"
            id="result"
          ></div>
        </div>
      </section>
    </>
  );
}
export default Update;
