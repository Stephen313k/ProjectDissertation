import {Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import QuizSelect from './components/QuizSelect'


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={QuizSelect} exact />
        </Switch>
    </Router>
  );
}

export default App