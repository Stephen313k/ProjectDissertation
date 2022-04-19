import { Paper, Button, Typography } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { createMarkup } from "../helpers";
import React from 'react';

//method to see correct and incorrect answers. 'classes' to access api quiz info
const AnswersReview = ({ processedAnswers, classes, resetQuiz }) => {
  const renderAnswers = (answers) => {
    return answers.map(    
      //map over answers chosen and the questions. use booleans 
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => (
        //accessing the question
        <Paper key={question} className={classes.paper}>
          <Typography variant="h2" className={classes.question}>
            <span dangerouslySetInnerHTML={createMarkup(question)} />
          </Typography>
          {/* is the boolean true?, then answer is correct */}
          {isCorrect ? (
            <Typography
              variant="h2"
              className={`${classes.answer} ${classes.correctAnswer}`}
            >
          {/* display correct answer only */}
              <Check />
              <span
                className={classes.answer}
                dangerouslySetInnerHTML={createMarkup(correctAnswer)}
              />
            </Typography>
          ) : (
            <>
          {/* if the answer is wrong */}
              <Typography
                variant="h3"
                color="secondary"
                className={classes.answer}
              >
               {/* display the wrong answer */}
                <Close />
                <span
                  className={classes.answer}
                  dangerouslySetInnerHTML={createMarkup(wrongAnswer)}
                />
              </Typography>
              {/* display the wrong answer */}
              <Typography
                variant="h3"
                className={`${classes.answer} ${classes.correctAnswer}`}
              >
                <Check />
                <span
                  className={classes.answer}
                  dangerouslySetInnerHTML={createMarkup(correctAnswer)}
                />
              </Typography>
            </>
          )}
        </Paper>
      )
    );
  };

  return (
    <>
      <Typography variant="h1" className={classes.mainTitle}>
        Answers review:
      </Typography>
      {renderAnswers(processedAnswers)}
      <Button
        className={classes.submitButton}
        //reset the quiz
        onClick={resetQuiz}
        variant="contained"
        color="primary"
      >
        Reset
      </Button>
    </>
  );
};

export default AnswersReview;
