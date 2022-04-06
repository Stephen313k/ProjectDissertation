import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Login() {

    return (
    <div className="container pt-5">
        <div className="card">
        <div className="card-content">
            <h3 className="title is-3">Quizzjhffhguer</h3>
            <form>
            <div className="field">
            <p className="control has-icons-right has-icons-left">
               <input className="input" type="email" placeholder="Email"/>
            <span className="icon is-small is-left">
                <i className="fas fa-check"></i>
            </span>
            </p>

            </div>
            <div className="field">
            <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password"/>
                <span className="icon is-small is-left">
                <i className="fas fa-lock">lock</i>
                </span>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <button type="submit" className="button is-success">Login</button>
            </p>
            <br></br>
            </div>
            </form>
        </div>
        </div>
    </div>
    )
}

export default Login