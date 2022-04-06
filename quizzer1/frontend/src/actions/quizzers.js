// frontend/src/actions/todos.js

import { tokenConfig } from './auth'; // added

// GET TODOS
export const getTodos = () => async (dispatch, getState) => {
  const res = await axios.get('/api/quizzer/', tokenConfig(getState));
  // ...
};

// GET TODO
export const getTodo = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/quizzer/${id}/`, tokenConfig(getState));
  // ...
};

// ADD TODO
export const addTodo = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    '/api/todos/',
    { ...formValues },
    tokenConfig(getState)
  );
  // ...
};

// DELETE TODO
export const deleteTodo = id => async (dispatch, getState) => {
  await axios.delete(`/api/quizzer/${id}/`, tokenConfig(getState));
  // ...
};

// EDIT TODO
export const editTodo = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/quizzer/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  // ...
};