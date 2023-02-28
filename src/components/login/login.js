import "./login.css"
import React, {useRef} from "react";
import logo from "../navbar/ristek-logo.png"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

  const navigate = useNavigate();

  const refUsername = useRef(null)
  const refPassword = useRef(null)

  function handleClick(){
    fetch('https://myapp-be.herokuapp.com/api/login', {
        method: 'POST',
        body: JSON.stringify({
          "username" : refUsername.current.value,
          "password" : refPassword.current.value
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) =>{
          return response.json()
        })
         .then((data) => {
          if(data.Message === "Succes") {
            Cookies.set('token', data.token, { expires: 30 });
            toast.success("Login Succes!", {className: "toast-message"})
            navigate("/homepage")
          }
          else {
            toast.error("Incorrect Username or Password", {className: "toast-message"})
          }
         })
         .catch((err) => {
            console.log(err.message);
         });
  }

  return (
    <div className="login flex justify-center items-center">
        <div className="box text-white flex justify-center items-center">
          <div className="input-form grid justify-center items-center gap-y-8">
            <div className="logo flex justify-center">
              <img src={logo} alt="ristek-logo"/>
            </div>
            <div className="title-login flex justify-center text-white font-bold text-2xl">
                Login
            </div>
            <div className="user-pass grid gap-y-4">
              <div className="input-username text-white text-center">
                <div className="label-username flex justify-center">
                  <p>Username</p>
                </div>
                <input className="text-black pl-1" type="text" id="username" ref={refUsername}/>
              </div>
              <div className="input-password text-white text-center">
                <div className="label-passwords flex justify-center">
                  <p>Password</p>
                </div>
                <input className="text-black pl-1" type="password" id="password" ref={refPassword} />
              </div>
            </div>
            <button onClick={handleClick}>
              <div className="login-button text-black flex justify-center w-50 h-7">
                Login
              </div>
            </button>
            <a href="/register">
              <div className="signup-button text-white flex justify-center">
                Register Here!
              </div>
            </a>
          </div>
        </div>
    </div>
  );
}

export default Login;
