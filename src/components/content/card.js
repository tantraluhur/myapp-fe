import "./content.css"
import avatar from '../navbar/ava.png'
import edit from './pencil.png'
import deletelogo from './delete.png'


function Card(props) {
    const items = props.items
    if(props.is_close_friend && props.onDelete){
        return (
            <div className="card mt-8 close-friend">
              <div className="top-section flex justify-between">
                <div className="left flex p-4 pl-8 text-white items-center gap-x-2 ">
                  <div className="profile-pic">
                        <img src={avatar} alt="profile-pic"/>
                    </div>
                    <div className="profile-name">
                        <p className="text-xl">
                            {items.user.username}
                        </p>
                    </div>
                    <div className="date">
                        <p className="text-xs">{items.date}</p>
                    </div> 
                </div>
                <div className="right flex mt-4 mr-3 gap-x-3">
                    <div className="delete-icon">
                      <button onClick={() => props.onDelete(items.pk)}>
                        <img src={deletelogo} alt="delete-logo"/>
                      </button>
                    </div>
                    <div className="update-icon">
                      <button onClick={() => props.onModal(items.pk)}>
                        <img src={edit} alt="update-logo"/>
                      </button>
                    </div>
                </div>
              </div>
              <div className="bottom-section pl-6 pb-8">
                  <div className="description text-white">
                      <p>{items.description}</p> 
                  </div>
              </div>
            </div>
    );}
    else if(props.onDelete){
        return(
            <div className="card mt-8">
            <div className="top-section flex justify-between">
              <div className="left flex p-4 pl-8 text-white items-center gap-x-2 ">
                <div className="profile-pic">
                      <img src={avatar} alt="profile-pic"/>
                  </div>
                  <div className="profile-name">
                      <p className="text-xl">
                          {items.user.username}
                      </p>
                  </div>
                  <div className="date">
                      <p className="text-xs">{items.date}</p>
                  </div> 
              </div>
              <div className="right flex mt-4 mr-3 gap-x-3">
                  <div className="delete-icon">
                    <button onClick={() => props.onDelete(items.pk)}>
                      <img src={deletelogo} alt="delete-logo"/>
                    </button>
                  </div>
                  <div className="update-icon">
                    <button onClick={() => props.onModal(items.pk)}>
                      <img src={edit} alt="update-logo"/>
                    </button>
                  </div>
              </div>
            </div>
            <div className="bottom-section pl-6 pb-8">
                <div className="description text-white">
                    <p>{items.description}</p> 
                </div>
            </div>
          </div>
        )
    }
    else if(props.is_close_friend){
        return(
            <div className="card mt-8 close-friend" key={items.pk}>
            <div className="top-section flex justify-between">
              <div className="left flex p-4 pl-8 text-white items-center gap-x-2 ">
                <div className="profile-pic">
                      <img src={avatar} alt="profile-pic"/>
                  </div>
                  <div className="profile-name">
                      <p className="text-xl">
                          {items.user.username}
                      </p>
                  </div>
                  <div className="date">
                      <p className="text-xs">{items.date}</p>
                  </div> 
              </div>
            </div>
            <div className="bottom-section pl-6 pb-8">
                <div className="description text-white">
                    <p>{items.description}</p> 
                </div>
            </div>
          </div>
        )
    }
    return (
        <div className="card mt-8" key={items.pk}>
        <div className="top-section flex justify-between">
          <div className="left flex p-4 pl-8 text-white items-center gap-x-2 ">
            <div className="profile-pic">
                  <img src={avatar} alt="profile-pic"/>
              </div>
              <div className="profile-name">
                  <p className="text-xl">
                      {items.user.username}
                  </p>
              </div>
              <div className="date">
                  <p className="text-xs">{items.date}</p>
              </div> 
          </div>
        </div>
        <div className="bottom-section pl-6 pb-8">
            <div className="description text-white">
                <p>{items.description}</p> 
            </div>
        </div>
      </div>
    );
  }

export default Card