import Header from "./framework/Header"
import ConnectApi from "../api/ConnectApi";
import React from "react";
import { Container } from "@material-ui/core";

export const QuizSelect = () => {

const API_URL = "http://127.0.0.1:80000/quizzer/";
const [dataState] = ConnectApi(API_URL);

console.log(dataState)

    return(
        <React.Fragment>
            <Header/>
            <Container maxWidth="md" component = "main">
                <Grid container spacing ={5} alignItems = "flex-end">
                    {dataState.data.map((q) =>(
                        <Grid item key ={q.title} xs={12} md={4}>
                            <Card>
                                
                            </Card>
                        </Grid>
                    ))}    
                </Grid> 

            </Container>
        </React.Fragment>
            
        
    )
}

export default QuizSelect