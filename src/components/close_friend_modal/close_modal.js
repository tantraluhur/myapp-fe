import "./close_modal.css"
import {React, useState, useEffect} from "react";
import Cookies from 'js-cookie';





function CloseFriendModal(props) {
    const token = Cookies.get("token")

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const [isOpen, setIsOpen] = useState(false);

    const [usersList, setUserList] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const[selectedCloseFriend, setSelectedCloseFriend] = useState([])

    const handleCheckboxChange = (event) => {
      const item = event.target.value;
      if (event.target.checked) {
        setSelectedItems([...selectedItems, item]);
      } else {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
      }
    }

    var userItem = [];

    const handleDropdownClick = () => {
      setIsOpen(!isOpen);
    };

    function handleClick(){
      fetch(`https://myapp-be.herokuapp.com/api/user`, {
          method: 'PUT',
          body: JSON.stringify({
            "data" : selectedItems
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Token ${token}`
          },
        })
           .then((response) => response.json())
           .then((data) => {
            if(data.Message === "Succes"){
              setSelectedCloseFriend([...selectedCloseFriend, selectedItems])
              props.onUpdate(data)
            }
           })
           .catch((err) => {
              console.log(err.message);
           });
    }

    useEffect(() => {
      const token = Cookies.get('token');

      fetch('https://myapp-be.herokuapp.com/api/user-list', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Token ${token}`
        },
      })
          .then((response) => response.json())
          .then(
          (response) => {
            setIsLoaded(true);

            setUserList(response.data.user);
            setSelectedCloseFriend(response.data.close_friend);
            setSelectedItems(response.data.close_friend)

          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )

    }, [props.show]);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      for(let i = 0 ; i< usersList.length ; i++){
        if(selectedCloseFriend.includes(usersList[i].username)){
          userItem.push(
            <li key={usersList[i].username}>
              <input type="checkbox" value={usersList[i].username} onChange={handleCheckboxChange} defaultChecked={true}/> {usersList[i].username} 
            </li>
          )
        }
        else {
          userItem.push(
            <li key={usersList[i].username}>
              <input type="checkbox" value={usersList[i].username} onChange={handleCheckboxChange}/> {usersList[i].username} 
            </li>
          )
        }
      }
    }

  if(!props.show){
    return null
  }

  return (
    <div className="modal-box-close flex justify-center items-center">
      <div className="container-close pl-8 pr-8 pb-4">
        <div className="title-modal text-white text-2xl font-bold mb-3 mt-3">
          <p>
            Edit Close Friend
          </p>
        </div>
        <div className="dropdown-input text-white">
        <div
            id="list1"
            className={`dropdown-check-list ${isOpen ? "visible" : ""}`}
            tabIndex="100"
          >
            <span className="anchor" onClick={handleDropdownClick}>Select Close Friend</span>
            <ul className="items">
               {userItem}
            </ul>
        </div>
        </div>
        <div className="button-modal flex gap-x-3 text-black font-medium mb-3 mt-3">
        <button onClick={() => handleClick()}>
          <div className="save-button rounded-lg w-20 h-8 bg-white flex justify-center items-center">
              <div className="title-save" >
                Save
              </div>
            </div>
          </button>
          <button onClick={props.onClose}>
            <div className="close-button rounded-lg w-20 h-8 bg-white flex justify-center items-center">
              <div className="title-close">
                Close
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseFriendModal;
