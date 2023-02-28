import React, {useState, useEffect} from "react";
import logo from "../navbar/ristek-logo.png"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './register.css'
import 'react-toastify/dist/ReactToastify.css';


function Register() {

  const navigate = useNavigate();
  
  const [textUsername, setTextUsername] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textConfirmPassword, setTextConfirmPassword] = useState("");


  const [disableButton, setDisableButton] = useState(true)
  const [passwordSuggestions, setPasswordSuggestions] = useState('');

  

  const getPasswordSuggestions = (password) => {
    let check = false
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[$@!%*?&]/;

    let suggestions = [];

    if (password.length < 8) {
      suggestions.push('Password should be at least 8 characters long');
    }

    else if (!lowercaseRegex.test(password)) {
      suggestions.push('Password should contain at least one lowercase letter');

    }

    else if (!uppercaseRegex.test(password)) {
      suggestions.push('Password should contain at least one uppercase letter');

    }

    else if (!numberRegex.test(password)) {
      suggestions.push('Password should contain at least one number');

    }

    else if (!specialCharRegex.test(password)) {
      suggestions.push('Password should contain at least one special character');

    }
    else if (textConfirmPassword !== password) {
        suggestions.push('Password not match');
          
    }
    else if(textUsername === ""){
        suggestions.push('Fill the Username');
    }
    else {
        suggestions.push('Password Match');
    }
    return suggestions.join(', ');
  };

  
  const handleChangeUsername = (event) => {
    setTextUsername(event.target.value);
  };
  const handleChangePasword = (event) => {
    setTextPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setTextConfirmPassword(event.target.value);
  }
  useEffect(() => {
    if (getPasswordSuggestions(textPassword) === "Password Match" && textUsername !== "") {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [textUsername, textPassword, textConfirmPassword]);
  useEffect(() => {
    setPasswordSuggestions(getPasswordSuggestions(textPassword));
  }, [textPassword, textConfirmPassword, textUsername]);

  function handleClick(){
    fetch('https://myapp-be.herokuapp.com/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          "username" : textUsername,
          "password" : textPassword
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
            toast.success("Signup Succes!", {className: "toast-message"})
            navigate("/")
          }
          else{
            toast.error("Error! Username already exists!", {className: "toast-message"})
          }
         })
         .catch((err) => {
            console.log(err.message);
         });
  }

  return (
    <div className="login flex justify-center items-center">
        <div className="box text-white flex justify-center items-center">
          <div className="input-form grid justify-center items-center gap-y-6">
            <div className="logo flex justify-center">
              <img src={logo} alt="ristek-logo"/>
            </div>
            <div className="title-register flex justify-center text-white font-bold text-2xl">
                Register
            </div>
            <div className="user-pass grid gap-y-3">
              <div className="input-username text-white text-center">
                <div className="label-username flex justify-center text-base">
                  <p>Username</p>
                </div>
                <input className="text-black pl-1" type="text" id="username" value={textUsername} onChange={handleChangeUsername}/>
              </div>
              <div className="input-password text-white text-center text-base">
                <div className="label-passwords flex justify-center">
                  <p>Password</p>
                </div>
                <input className="text-black pl-1" type="password" id="password" value={textPassword} onChange={handleChangePasword}/>
              </div>
              <div className="input-password text-white text-center">
                <div className="label-passwords flex justify-center text-base">
                  <p>Confirm Password</p>
                </div>
                <input className="text-black pl-1" type="password" id="confirmPassword" value={textConfirmPassword} onChange={handleChangeConfirmPassword}/>
              </div>
              <div className={`text-xs ${passwordSuggestions === "Password Match"? "text-lime-400" :"text-orange-600"} font-medium text-center`} >{passwordSuggestions}</div>
            </div>
            <button onClick={() => handleClick()} disabled={disableButton} className="flex justify-center text-xs">
              <div className="login-button text-black flex justify-center w-52 text-lg">
                Signup
              </div>
            </button>
            <a href="/">
                <div className="login-register text-white flex justify-center">
                    Login Here!
                </div>
            </a>
          </div>
        </div>
    </div>
  );
}

export default Register;
