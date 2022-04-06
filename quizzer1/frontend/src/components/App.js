// frontend/src/components/App.js

import LoginForm from './auth/LoginForm'; // added
import PrivateRoute from './common/PrivateRoute'; // added

import { loadUser } from '../actions/auth'; // added

class App extends Component {
  // added
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} /> // updated
            <Route exact path='/delete/:id' component={QuizzerDelete} />
            <Route exact path='/edit/:id' component={QuizzerEdit} />
            <Route exact path='/login' component={LoginForm} /> // added
          </Switch>
        </Router>
      </Provider>
    );
  }
}/*
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';

import PrivateRoute from './utils/PrivateRoute';
import {UserContext} from './utils/UserContext';

function App() {

  //function for token in local storage
  const getToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      return true;
    }else{
      return false;
    }
  };

  const [isAuth, setisAuth] = useState(getToken());

  //PrivateRoute acts as doorman
  return (
    <Router>
      <Switch>
        <UserContext.Provider value  = {{ isAuth, setisAuth }}>
           <PrivateRoute exact path="/" authed={isAuth} component={Home}/>
           <Route path="/login" component={Login}/>
           <Route path="/register" component={Register}/>
        </UserContext.Provider>
      </Switch>
    </Router>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById("app"));*/