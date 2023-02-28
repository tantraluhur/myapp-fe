import "./navbar.css"
import logo from './ristek-logo.png';
import avatar from './ava.png';
import Cookies from 'js-cookie';
import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../AuthContext";




function Navbar() {
    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const token = Cookies.get('token');

    function fetchLoggedInUser(){
        fetch('https://myapp-be.herokuapp.com/api/user', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Token ${token}`
          },
        })
           .then((response) => response.json())
           .then(
            (data) => {
                setIsLoaded(true);
                setUser(data)
                
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          )
      }

      useEffect(() => {
        fetchLoggedInUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        if(user !== null){
          setIsLoaded(true)
        }
        else {
          setIsLoaded(false)
        }
      }, [user]);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
    return (
    <div className="navbar">
        <div className="flex justify-between m-7">
            <div className="logo flex justify-center items-center gap-x-4">
                <a href="/homepage" className="flex justify-center items-center gap-x-4">
                    <div className="logo-image">
                        <img src={logo} alt="logo-ristek"/>
                    </div>
                    <div className="logo-title">
                        <h2> RISTEK MedSOS</h2>
                    </div>
                </a>
            </div>
            <a href="/profile">
                <div className="profile flex justify-center items-center gap-x-4">
                    <div className="profile-image">
                        <img src={avatar} alt="logo-ristek"/>
                    </div>
                    <div className="profile-name">
                        <h3>{user.data.username}</h3>
                    </div>
                </div>
            </a>
        </div>
    </div>
    )};
}

export default Navbar;
