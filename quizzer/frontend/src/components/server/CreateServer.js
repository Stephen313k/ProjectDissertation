import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { getServerCategories, CreateNewServer } from '../services/Servers';

function CreateServer() {

    let history = useHistory();
    //using states
    const [picture, setPicture] = useState();
    const [banner, setBanner] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [formCategory, setFormCategory] = useState();

    const [serverCategory, setserverCategory] = useState([]);

    //for image upload
    const fileNamePicture = document.querySelector('#picture-file .file-name');
    const fileNameBanner = document.querySelector('#banner-file .file-name');


    useEffect(()=> {
        //Check for the token
        const token = localStorage.getItem("token");
        //Request to get all the categories
        getServerCategories(token)
        .then(response => {
            setserverCategory(response);
        })
    },[]);


    //request to create a new server
    const handleSubmit = (e)=> {
        e.preventDefault();
        const serverCreated = CreateNewServer(picture, banner, title, description, formCategory);
        if(serverCreated === true){
            history.push("/");
        }
    };


return (
<main>
    <div className="container pt-6">
        <div className="card">
            <div className="card-content">

                <form onSubmit={handleSubmit}>
                    <h3 className="title is-3">Create New Server</h3>

                    <div className="field">
                    <div id="picture-file" className="file is-medium has-name">
                    <label className="file-label">
                        <input id="picture" className="file-input" type="file" name="picture" onChange={e => {
                            setPicture(e.target.files[0])
                            //This is to set the name of the filename to the span tag
                            let fileInput = document.getElementById('picture');
                            if (fileInput.files.length > 0){
                                fileNamePicture.textContent = fileInput.files[0].name;
                            }
                        }} />
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="material-icons">file_upload</i>
                        </span>
                        <span className="file-label">Choose a Picture</span>
                        </span>
                        <span className="file-name"></span>
                    </label>
                    </div>
                    </div>

                    <div className="field">
                    <div id="banner-file" className="file is-medium has-name">
                    <label className="file-label">
                        <input id="banner" className="file-input" type="file" name="banner" onChange={e => {
                            setBanner(e.target.files[0])
                            //This is to set the name of the filename to the span tag
                            let fileInput = document.getElementById('banner');
                            if (fileInput.files.length > 0){
                                fileNameBanner.textContent = fileInput.files[0].name;
                            }
                        }} />
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="material-icons">file_upload</i>
                        </span>
                        <span className="file-label">Choose a Banner</span>
                        </span>
                        <span className="file-name"></span>
                    </label>
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input id="title" name="title" className="input" type="text" placeholder="Text input"
                        onChange={e => setTitle(e.target.value)}/>
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea id="description" name="description" className="textarea" placeholder="Textarea"
                        onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                        <select onChange={e => setFormCategory(e.target.value)}>
                            <option value="" disabled>Choose the category</option>
                            {serverCategory.map(category =>( 
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    </div>

                    <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                    </div>

                </form>

            </div>
        </div>
    </div> 
</main>
)
}

export default CreateServer
