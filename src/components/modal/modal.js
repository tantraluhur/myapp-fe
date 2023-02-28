import "./modal.css"
import React, {useState, useRef} from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Modal(props) {
  const token = Cookies.get('token');
  const ref = useRef(null);
  const[disabledButton, setDisabledButton] = useState(true)


  const [text, setText] = useState("");


  const handleChange = (event) => {
    setText(event.target.value);
    if(event.target.value){
      setDisabledButton(false)
    }
    else {
      setDisabledButton(true)
    }
  };

  function handleClick(){
    setText("")
    setDisabledButton(true)

    fetch(`https://myapp-be.herokuapp.com/api/content/${props.modalId}`, {
        method: 'PUT',
        body: JSON.stringify({
          "description" : text
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Token ${token}`
        },
      })
         .then((response) => response.json())
         .then((data) => {
          if(data.Message === "Succes"){
            toast.success("Update Succes!", {className: "toast-message"})
            props.onUpdate(data)
          }
         })
         .catch((err) => {
            console.log(err.message);
         });
  }

  if(!props.show){
    return null
  }

  return (
    <div className="modal-box flex justify-center items-center">
      <div className="container pl-8 pr-8 pb-4">
        <div className="title-modal text-white text-2xl font-bold mb-3 mt-3">
          <p>
            Update Pesan
          </p>
        </div>
        <div className="text-input">
            <textarea className="input p-2" rows={5} placeholder="whats happening?" ref={ref} value={text} onChange={handleChange}> </textarea>
        </div>
        <div className="button-modal flex gap-x-3 text-black font-medium mb-3 mt-3">
        <button onClick={() => handleClick()} disabled={disabledButton}>
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

export default Modal;
