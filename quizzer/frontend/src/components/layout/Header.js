import React, { useContext } from 'react'

import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { logout } from '../services/auth';

function Header() {

    const {isAuth, setisAuth} = useContext(UserContext);
    let history = useHistory();

    return (
    <header>

        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="http://127.0.0.1:8000">
            <img src="/static/img/quizzer.png" width="120" height="300"></img>
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
                <a className="navbar-item" href="http://127.0.0.1:8000"><i className="material-icons">home</i>Home</a>
                <a className="navbar-item" onClick={()=>{
                    {/*directs user to notifications*/}
                    history.push("/notifications");
                }}><i className="material-icons">notifications</i>Notifications</a>
                <div className="navbar-item">
                    <div className="buttons">
                        <button className="button is-light" onClick={()=>{
                                logout();
                                setisAuth(false);
                                history.push('/');
                            }}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
        </nav>
    
    </header>
    )
}

export default Header