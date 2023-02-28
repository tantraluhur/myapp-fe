import Modal from '../modal/modal'
import Card from '../content/card'
import logo from '../navbar/ava.png';
import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../AuthContext";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";


import "./profile.css"

function Profile() {
    const token = Cookies.get("token")
    const navigate = useNavigate();
    


    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);

    const[show, setShow] = useState(false)
    const[modalId, setModalId] = useState(null)

    var item = []
    
    function handleDataModal(data){
      setShow(false)
      setAddedItems(data)
    }

    function handleModal(id){
      setShow(true);
      setModalId(id);
    }

    function fetchData(){
      const token = Cookies.get("token")
      fetch('https://myapp-be.herokuapp.com/api/user-content-list', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Token ${token}`
        },
      })
         .then((response) => response.json())
         .then(
          (data) => {
            setItems(data);
          },
          (error) => {
            setError(error);
          }
        )
    }

    function handleClick(){
        fetch(`https://myapp-be.herokuapp.com/api/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            },
            })
                .then((response) => response.json())
                .then((response) => {
                    if(response.Message === "Succes"){
                        Cookies.remove("token")
                        toast.success("Logout Succes!", {className: "toast-message"})

                        navigate("/login")
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
    }

    function handleDelete(id){
      fetch(`https://myapp-be.herokuapp.com/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        },
      })
         .then((response) => response.json())
         .then((data) => {
          setAddedItems(data.data)
         })
         .catch((err) => {
            console.log(err.message);
         });
    }
    useEffect(() => {
      fetchData()
    }, [addedItems]);
    
    useEffect(() => {
        if(user && items.data !== undefined){
            setIsLoaded(true)
        }
        else {
            setIsLoaded(false)
        }
      }, [user, items]);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loading flex justify-center items-center h-96"><ReactLoading type="balls" color="#0000FF" 
        height={50} width={150} />
      </div>;
    } else {
      for(let i = items.data.length - 1 ; i >= 0; i--){
        console.log(items)
        if(items.data[i].is_close_friend){
          item.push(
              <Card items={items.data[i]} onDelete={handleDelete} onModal={handleModal}  key={items.data[i].pk} is_close_friend={true}/>
            )
        }
        else {
          item.push(
            <Card items={items.data[i]} onDelete={handleDelete} onModal={handleModal}  key={items.data[i].pk}/>
          )
        }
      }
    }
    return (
        <div>
        <div className="content flex justify-center items-center mb-7">
            <div className="box-content">
                <div className="logo flex gap-x-4">
                    <div className="logo-image-profile">
                        <img src={logo} alt="logo-ristek"/>
                    </div>
                    <div className="logo-title-profile flex justify-center items-center text-white font-medium">
                        <h2> @{user.data.username}</h2>
                    </div>
                    <div className='flex items-center'>
                        <button onClick={() => handleClick()} className="w-48"> 
                            <div className='logout-button font-medium'>
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
                <div className="content-list">
                  {item}
                </div>
            </div>
        </div>
        <Modal onClose={() => setShow(false)} show={show} modalId={modalId} onUpdate={handleDataModal}/>
      </div>
    );
  }

export default Profile