import React from 'react'
import { BanFromServer } from '../services/Servers'

function Members(props) {
    
    const handleBan = (e) => {
        e.preventDefault();
        //pass the user id and server props state
        BanFromServer(e.target.id, props.server)
        .then(response =>{
            console.log(response);
            document.getElementById(e.target.id).parentNode.parentNode.style.display='none';
        })
    };

    return (
        <div className="box">
            {/* map the member, get the picture, username, and id */}
            {props.members.map(member => (
                <article className="media">
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img className="is-rounded" src={member.profile.picture}/>
                    </p>
                </figure>
                <div className="media-content">
                    <p className="title is-6">{member.first_name} {member.last_name}</p>
                    <p className="subtitle is-7">@{member.username}</p>
                </div>
                {/* check if is admin and have a ban button */}
                {props.isAdmin ? 
                <div className="media-right">
                    <button id={member.id} onClick={handleBan} className="delete"></button>
                </div> : <div></div> }
                </article>
            ))}
        </div>
    )
}

export default Members