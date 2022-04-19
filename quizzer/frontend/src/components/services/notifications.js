import axios from 'axios';

//take in the user and the server
export const SendNewInvitation = (to_user, to_server, token) => {
    //token authorization
    axios.defaults.headers.common["Authorization"] = "Token " + token;

    //Headers
    const config = {
        headers : {
            'Content-Type' : 'application/json',
        }
    };
    //Request body
    let notification_type = 1;
    const post_body = JSON.stringify({to_user, to_server, notification_type})
    //new url 
    const promise = axios.post('api/notification/createinvitation/', post_body, config)
    //render
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

export const ReqToJoinServer = (to_server, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;

    //Headers
    const config = {
        headers : {
            'Content-Type' : 'application/json',
        }
    };

    //Request body
    let notification_type = 2;
    const post_body = JSON.stringify({to_server, notification_type})
    const promise = axios.post('api/notification/invitation/request/', post_body, config)
    const dataPromise = promise.then((response)=> response.data);
    return dataPromise;
};

//get the notifications
export const getNotifications = (token) => {
    //get the token for authorization
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //create new url
    const promise = axios.get('api/notification/getnotifications/');
    //return 
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

//post for accept invitation, needs the invitation id
export const postAcceptInvitation = (token, invitation_id) => {
    //token authorization
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //create new url
    const promise = axios.post('api/notification/invitation/' + invitation_id);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

// for deleting a notification
export const deleteNotification = (invitation_id) => {
    //token authorization
    const promise = axios.delete('api/notification/deletenotification/' + invitation_id);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
}; 