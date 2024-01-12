import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "", password: ""
    });
    const handler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitData = async () => {
        const { email, password } = state
        if (email && password) {

            const userExist = await fetch('https://crudd-id2m.onrender.com/login', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            });
            const result = await userExist.json();
            if(result.token){
                sessionStorage.setItem("name", result.user.name)
                sessionStorage.setItem("token", result.token)
                navigate("/fetch")
            }else{
                document.getElementById('result').innerHTML = "email and password incorrect"
            }
        } else {
            document.getElementById('result').innerHTML = "All field are Required"
        }
    }
    return (
        <>
            <section className="m-5">
                <div className="m-5">
                    <div className="text-center fs-2 mb-4 fw-bold" style={{color:"blue"}}>Login Here</div>
                    <form>
                        <input type="email"
                            className="form-control p-2 px-3 my-3"
                            placeholder="Your Email.."
                            name="email"
                            value={state.email}
                            onChange={handler}
                        />
                        <input type="password"
                            className="form-control p-2 px-3 my-3"
                            placeholder="Your Password.."
                            name="password"
                            value={state.password}
                            onChange={handler}
                        />
                        <button type="button" onClick={submitData} className="btn fw-bold btn-primary w-100">Login</button>
                    </form>
                    <div className="text-center text-success fs-1 fw-bold" id="result"></div>
                </div>
            </section>
        </>
    )
}
export default Login;