import { Grid, Paper, Select, Button, MenuItem, TextField, Container, Typography, InputLabel, FormControl,} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styles, difficulties, createMarkup } from "../helpers";
import QuizAnswers from "./QuizAnswers.jsx";
import React from "react";

const useStyles = makeStyles((theme) => {
  return styles;
});

const QuizCategories = () => {

  //use states
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  //for selecting quiz question amount and difficulty
  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();

  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      //fetch the api, being dynamic with {quizNumber}, and {category.id}
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${
        category.id
      }&difficulty=${difficulty.name.toLowerCase()}`;
      //asynchronous 
      const { data } = await axios.get(url);

      //map over each category. callback function
      const formattedCategory = data.results.map((cat) => {
          
        //randomize where the correct answer is on the quiz
        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );
        //apply the random index
        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);
        
        return {
          //return all categories
          ...cat,
          //create new key answers
          answers: cat.incorrect_answers,
        };
      });

      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  const fetchCategories = async () => {
    //fetch the api this url is the category list only
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    //console log to find the key for trivia_categories
    setCategories(data.trivia_categories);
  };
  
  //callback function when component is rendered
  useEffect(() => {
    //call this function
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty) {
      fetchQuizData();
    }
  };

  //changing the quiz category
  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      //category id is equal to the selected value
      (cat) => cat.id === e.target.value
    );
    //setting the state to the method
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    //prevent default browser behaviour
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
  };

  //button for restting quiz
  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCategory("");
    setQuizNumber("");
    setDifficulty("");
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };

  if (!categories.length) {
    return null;
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        {/*if the user is at the start then render this*/}
        {currentQuizStep === "start" ? (
          <>
            <Typography variant="h1" className={classes.mainTitle}>
              Take a quiz:
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="category-select-label">
                      Select category:
                    </InputLabel>
                    <Select
                      required
                      name="category"
                      value={category.id || ""}
                      id="category-select"
                      label="Select category"
                      labelId="category-select-label"
                      onChange={handleSelectChange}
                    >
                      {/* list all elements as html (dangerouslySetInnerHTML)*/}
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          <span
                            dangerouslySetInnerHTML={createMarkup(
                              category.name
                            )}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="difficulty-select-label">
                      Select Difficulty:
                    </InputLabel>
                    <Select
                      required
                      name="difficulty"
                      value={difficulty.id || ""}
                      id="difficulty-select"
                      label="Select Difficulty"
                      labelId="difficulty-select-label"
                      onChange={handleDifficultyChange}
                    >
                      {difficulties.map((difficulty) => (
                        <MenuItem key={difficulty.id} value={difficulty.id}>
                          {difficulty.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{ min: 1, max: 10 }}
                    required
                    fullWidth
                    type="number"
                    id="quiz-number"
                    variant="outlined"
                    name="quiz-number"
                    label={`Add a quiz number from 1 to 10`}
                    value={quizNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </>
        ) : (
          <QuizAnswers
            classes={classes}
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
      </Paper>
    </Container>
  );
};

export default QuizCategories;