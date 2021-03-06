import axios from 'axios';

//chat data in main chat
export const getChatData = (id, token) => {
    //get token for channel id
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    //api url
    const promise = axios.get('api/chat/getchats/' + id);
    //return data
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

//button to load older messages
export const getMoreChatData = (link, token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    const promise = axios.get(link);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const sendMessage = (body, chatfile, channel) => {
    //need header for multipart/form-data. sending a file
    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        },
    };

   let formData = new FormData();
    
    if(chatfile !== undefined){
        //pass in the file
        formData.append("file", chatfile);
    }
    formData.append("body", body);
    formData.append("channel", channel);

    //request body
    const promise = axios.post('api/chat/sendmessage/', formData, config)
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const DeleteMessage = (message_id, server_id) => {
    const promise = axios.delete('api/chat/deletemsg/' + message_id + '/' + server_id);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};