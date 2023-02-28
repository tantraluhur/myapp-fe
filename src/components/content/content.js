import "./content.css"
import logoclose from './Icon.png';
import logopost from './Button.png';
import Modal from '../modal/modal'
import ModalClose from '../close_friend_modal/close_modal'
import Card from './card'
import React, {useState, useEffect, useRef, useContext} from "react";
import { AuthContext } from "../../AuthContext";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";

function Content() {
    const token = Cookies.get("token")

    const [selectedItems, setSelectedItems] = useState([]);


    const { user } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);

    const[show, setShow] = useState(false)
    const[modalId, setModalId] = useState(null)

    const[closeFriendModal, setCloseFriendModal] = useState(false)
    const[check, setCheck] = useState(false)

    const[disabledButton, setDisabledButton] = useState(true)

    const [text, setText] = useState("");
    var item = []



    const ref = useRef(null)
    
    const handleCheckboxChange = (event) => {
      const item = event.target.value;
      if (event.target.checked) {
        setSelectedItems([...selectedItems, item]);
        setCheck(true)
      } else {
        setCheck(false)
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
      }
    }

    function handleDataModal(data){
      setShow(false)
      setAddedItems(data)
    }

    const handleChange = (event) => {
      setText(event.target.value);
      if(event.target.value){
        setDisabledButton(false)
      }
      else {
        setDisabledButton(true)
      }
    };

    function handleModal(id){
      setShow(true);
      setModalId(id);
    }

    function fetchData(){
      const token = Cookies.get("token")
      fetch('https://myapp-be.herokuapp.com/api/content-list', {
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

    function handleDelete(id){
      fetch(`https://myapp-be.herokuapp.com/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        },
      })
         .then((response) => response.json())
         .then((response) => {
          if(response.Message === "Succes"){
            toast.success("Delete Succes!", {className: "toast-message"})
            setAddedItems(response.data)
          }
         })
         .catch((err) => {
            console.log(err.message);
         });
    }

    function handleClick(){
        setText("")
        setCheck(false)
        setDisabledButton(true)
        fetch('https://myapp-be.herokuapp.com/api/content', {
            method: 'POST',
            body: JSON.stringify({
              "description" : text,
              "is_close_friend" : selectedItems
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `Token ${token}`
            },
          })
             .then((response) => response.json())
             .then((data) => {
              if(data.Message === "Succes"){
                toast.success("Post Succes!", {className: "toast-message"})
                const newItem = data.data
                setAddedItems(newItem)
              }
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
        if(items.data[i].user.username === user.data.username && items.data[i].is_close_friend){
          item.push(
              <Card items={items.data[i]} onDelete={handleDelete} onModal={handleModal}  key={items.data[i].pk} is_close_friend={true}/>
            )
        }
        else if(items.data[i].user.username === user.data.username){
          item.push(
            <Card items={items.data[i]} onDelete={handleDelete} onModal={handleModal}  key={items.data[i].pk}/>
          )
        }
        else if(items.data[i].is_close_friend && items.data[i].user.friend_list.includes(user.data.username)) {
          item.push(
            <Card items={items.data[i]} key={items.data[i].pk} is_close_friend={true}/>
            )
        }
        else if(!items.data[i].is_close_friend){
          item.push(
            <Card items={items.data[i]} key={items.data[i].pk}/>
          )
        }
      }
      return (
        <div>
          <div className="content flex justify-center items-center mb-7">
              <div className="box-content">
                  <div className="title">
                      <div className="title1">
                          <p>
                              Welcome back,
                          </p>
                      </div>
                      <div className='title2'>
                          <p>
                              @{user.data.username}
                          </p>
                      </div>
                  </div> 
                  <div className="post-content flex mt-5 gap-x-4">
                      <div className="text-input basis-4/6">
                          <textarea className="input p-2" rows={8} placeholder="whats happening?" ref={ref} value={text} onChange={handleChange}> </textarea>
                      </div>
                      <div className="button basis-3/6 flex flex-col-reverse text-black gap-y-3 mb-2">
                          <button onClick={() => handleClick()} disabled={disabledButton}> 
                            <div className="button-post gap-x-1">
                              Post <img src={logopost} alt="post-logo"></img>
                            </div>
                          </button>
                          <button onClick={() => setCloseFriendModal(true)}> 
                            <div className="button-close-friend gap-x-1">
                              Edit Close Friend <img src={logoclose} alt="close-logo"></img>
                            </div>
                          </button>
                      </div>
                  </div>
                  <ul className="items">
                    <li className="w-40 text-white font-medium">
                      <input type="checkbox" onChange={handleCheckboxChange} checked={check}/> Close Friend Post? 
                    </li>
                  </ul>
                  <div className="content-list">
                    {item}
                  </div>
              </div>
          </div>
          <Modal onClose={() => setShow(false)} show={show} modalId={modalId} onUpdate={handleDataModal}/>
          <ModalClose onClose={() => setCloseFriendModal(false)} show={closeFriendModal} onUpdate={() => setCloseFriendModal(false)}/>
        </div>
      );
    }
  };

export default Content;