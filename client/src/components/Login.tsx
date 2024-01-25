import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
    const { email, password } = state;
    if (email && password) {
      try {
        const userExist = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const result = await userExist.json();

        if (result.token) {
          sessionStorage.setItem("name", result.user.name);
          sessionStorage.setItem("token", result.token);
          navigate("/fetch");
        } else {
          const resultElement = document.getElementById(
            "result"
          ) as HTMLDivElement | null;

          if (resultElement) {
            resultElement.innerHTML = "Now you are our community";
          } else {
            console.log("Element with ID 'result' not found");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Email and password are required");
    }
  };

  return (
    <>
      <section className="m-5">
        <div className="m-5">
          <div
            className="text-center fs-2 mb-4 fw-bold"
            style={{ color: "blue" }}
          >
            Login Here
          </div>
          <form>
            <input
              type="email"
              className="form-control p-2 px-3 my-3"
              placeholder="Your Email.."
              name="email"
              value={state.email}
              onChange={handler}
            />
            <input
              type="password"
              className="form-control p-2 px-3 my-3"
              placeholder="Your Password.."
              name="password"
              value={state.password}
              onChange={handler}
            />
            <button
              type="button"
              onClick={submitData}
              className="btn fw-bold btn-primary w-100"
            >
              Login
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

export default Login;
