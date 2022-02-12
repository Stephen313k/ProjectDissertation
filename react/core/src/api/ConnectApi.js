import { AccordionSummary } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CollectData = (url) => {
    //store if fetching or not
    const[fetch, setFetching] = useState({isFetching: false})
    const [dataState, setDataState] = useState({data: []});
    const [apiurl] = useState(url);

    //react hook
    useEffect(()=>{
        const fetchDataFromApi = async () => {
            try{
                setFetching({isFetching: true})

                const response = await axios.get(apiurl)
                
                setDataState({...dataState, data: response.data})

            } catch (e) {
                setFetching({...fetch, isFetching: true})
            }
        };
        fetchDataFromApi();
    },[]);

    return [dataState]
}
export default CollectData