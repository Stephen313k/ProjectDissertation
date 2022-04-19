import axios from "axios";
import { unsetCurrentUser } from './auth';

//const to get server cateogires 
export const getServerCategories = (token) => {
    //using token
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //to the api
    const promise = axios.get('api/server/getcategories/')
    //then return data
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

//used on handleclick in explore servers
export const getserversInCategory = (token, id) => {
    //using token
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //to the api
    const promise = axios.get('api/server/getserverscategory/' + id);
    //then return data
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

export const getServersInSearch = (title) => {
    //url for the search
    const promise = axios.get('api/server/searchserver?search=' + title);
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
}; 


export const CreateNewServer = (picture, banner, title, description, category) => {
    //Headers
    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        }
    };
    //getting the new form data
    let formData = new FormData();
    //match up the fields from api
    formData.append("picture", picture);
    formData.append("banner", banner);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    axios
    //post to the api
    .post('api/server/createserver/', formData, config)
    .then(response => {
        //pass in form data
        console.log(formData);
        console.log(response)
    })
    .catch(error => {
        console.log(error);
        window.alert("Error " + error);
    })
    return true;
};

export const getSideNavServers = (token) => {
    //ensuring token authorization
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //sending in url for the promise
    const promise = axios.get('api/server/getservers/');
    const dataPromise = promise.then((response)=> response.data)
    .catch(error =>{
        //delete tokens and user information (knox auth tokens)
        unsetCurrentUser();
        window.alert("Your token expired you will be redirected to the login page");
        //reload webpage
        window.location.reload();
    });
    return dataPromise;
};

export const getServerData = (id, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //need server id
    const promise = axios.get('api/server/getserverdetail/' + id);
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

//need server id and title for new category
export const CreateNewCategory = (server_id, title) => {
    //Headers
    const config = {
        headers : {
            'Content-Type' : 'application/json',
        }
    };
    //Request body
    //using json for the data
    const post_body = JSON.stringify({server_id, title})
    // axios promise - post api url
    const promise = axios.post('api/server/create-category-channel', post_body, config)
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

//serverid, category_id, title, topic to create a new channel
export const CreateNewChannel = (server_id, category_id, title, topic) => {
    //Headers
    const config = {
        headers : {
            'Content-Type' : 'application/json',
        }
    };

    //Request body
    const post_body = JSON.stringify({server_id, category_id, title, topic})
    // axios promise - post api url
    const promise = axios.post('api/server/create-text-channel', post_body, config)
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

export const BanFromServer = (user_id, server_id) => {
    //create our url
    const promise = axios.delete('api/server/ban/' + user_id + '/' + server_id);
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

//take in server id
export const LeaveServer = (server_id) => {
    //create url
    const promise = axios.delete('api/server/leaveserver/' + server_id);
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};