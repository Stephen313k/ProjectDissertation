import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { getNotifications, postAcceptInvitation, deleteNotification } from '../services/notifications';

function Notifications() {

    let history = useHistory();
    //states
    const [notifications, setNotifications] = useState();
    const [dataLoaded, setdataLoaded] = useState(false);

    //use effect hook
    useEffect(() => {        
        //get the token
        const token = localStorage.getItem("token");
        // call the function
        getNotifications(token)
        .then(response => {
            //update the data
            setNotifications(response);
            setdataLoaded(true);
        })
       },[]);
    
    //used in button to accept invitation
    const handleAcceptInvitation = (e) => {
        e.preventDefault();
        //get the token
        const token = localStorage.getItem("token");
        //and get the invitation id
        postAcceptInvitation(token, e.target.id)
        .then(response =>{
            //remove the notification
            document.getElementById(e.target.id).parentNode.parentNode.style.display='none';
        })
    };

    //used in button to delete invitation
    const handleDeleteNotification = (e) => {
        e.preventDefault();
        //get the token
        deleteNotification(e.target.id)
        .then(response =>{
            document.getElementById(e.target.id).parentNode.parentNode.style.display='none';
        })
    };


if (dataLoaded === true) {
return (
<section className="section">
    <div className="card">
        <div className="card-content">
            <div className="level-right">
                <button onClick={()=>{
                    //directs to homepage
                    history.push("/")
                }} className="delete"></button>
            </div>
            <div className="content">
            <h1 className="title">Notifications</h1>
            {/* map out all notifications */}
        {notifications.map(invi => (
            <article key={invi.id} className="media">
            <figure className="media-left">
                <p className="image is-64x64">        
                      {/*User profile picture*/}
                    <img className="is-rounded" src={invi.from_user.profile.picture}/>
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    {/* user invitation*/}
                    <strong>{invi.from_user.first_name} {invi.from_user.last_name}</strong><small> @{invi.from_user.username}</small>
                    {/* if equals to one then invite to server else wants to join server */}
                    <p>{invi.notification_type === 1 ? 'Invited you to the server: ' : 'Wants to Join to the Server: ' } <strong>{invi.to_server.title}</strong></p>
                </div>
            </div>

            {/*Buttons to accept or delete an invitation*/}
            <div className="buttons">
                <button id={invi.id} onClick={handleAcceptInvitation} className="button is-success">Accept</button>
                <button id={invi.id} onClick={handleDeleteNotification} className="button is-danger">Reject</button>
            </div>
            </article>
        ))}

            </div>
        </div>
    </div>
</section>

)

} else {
    return (
         <div className="container is-max-desktop content is-large has-text-centered">
             <div className="notification is-primary">
                 <i className="material-icons">refresh</i>
                 <h5 className="title is-5">You dont have any notifications to show..Thank you</h5>
            </div>
         </div>
     )
    }

}

export default Notifications