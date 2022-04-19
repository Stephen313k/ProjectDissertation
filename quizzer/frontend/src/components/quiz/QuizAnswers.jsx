import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import React from "react";
import { useState, useEffect } from "react";
import { createMarkup } from "../helpers";
import TotalResults from "./TotalResults.jsx";

const QuizAnswers = ({
  classes,
  quizData,
  resetQuiz,
  currentQuizStep,
  setCurrentQuizStep,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [processedAnswers, setProcessedAnswers] = useState([]);
  //method to define if the users answer is correct
  const handleResult = (e) => {
    e.preventDefault();
    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      //compare the users "({answer, question})" to the original data from the api
      const relatedQuestion = quizData.find(
        (category) => category.question === question
      );
      //if the correct answer is equal to users answer return the the object
      if (relatedQuestion.correct_answer === answer) {
        //correct answer is set to answer, the boolean is true, and the question is passed 
        return { correctAnswer: answer, isCorrect: true, question };
      }
      //if the answer is incorrect
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      };
    });
    //update the state
    setProcessedAnswers(processedAnswers);
  };

  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault();
    //the answer selected by the user
    const { value } = e.target;
    const isExistQuestion =
    //if there are selected answers 
      selectedAnswers.length &&
      //find if the answer.question is equal to the selected question then return an object
      selectedAnswers.find((answer) => answer.question === selectedQuestion);
    
    if (isExistQuestion && isExistQuestion.answer) {
      //map over all the answers
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
          //return object; the question the user just answered
          return { question: selectedQuestion, answer: value };
        }
        return answer;
      });
      //update selected answers 
      setSelectedAnswers(updatedAnswers);
    }
    //if there is no questions 
    else {
      setSelectedAnswers([
        //update the selected answer to the array
        ...selectedAnswers,
        //adding new answer
        { question: selectedQuestion, answer: value },
      ]);
    }
  };

  //Filters the answers to the approriate question
  const relatedAnswer = (question, selectedAnswers) => {
    //if there are answers
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        //find the answers that are linked with the question
        (answer) => answer.question === question
      );
      //returns the answers we need
      return (relatedQuestion && relatedQuestion.answer) || "";
    }
    return "";
  };

  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);

  return !processedAnswers || !processedAnswers.length ? (
    <>
      <Typography variant="h1" className={classes.mainTitle}>
        Answer folowing Questions:
      </Typography>
      <form onSubmit={handleResult}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {quizData.map((quiz) => (
              <Paper key={quiz.question} className={classes.paper}>
                <Typography variant="h5" className={classes.question}>
                  <span dangerouslySetInnerHTML={createMarkup(quiz.question)} />
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="answer-select-label">
                    Select answer:
                  </InputLabel>
                  <Select
                    required
                    name="answer"
                    id="answer-select"
                    label="Select answer"
                    value={relatedAnswer(quiz.question, selectedAnswers) || ""}
                    labelId="answer-select-label"
                    onChange={(e) => handleAnswerChange(e, quiz.question)}
                  >
                    {quiz.answers.map((answer) => (
                      <MenuItem key={answer} value={answer}>
                        <span dangerouslySetInnerHTML={createMarkup(answer)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            ))}
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
            >
              Result
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  ) : (
    //pass this to total results
    <TotalResults
      classes={classes}
      resetQuiz={resetQuiz}
      currentQuizStep={currentQuizStep}
      processedAnswers={processedAnswers}
      setCurrentQuizStep={setCurrentQuizStep}
    />
  );
};

export default QuizAnswers;
