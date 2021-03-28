import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Home from './Pages/Home/Home'
import SSH from './Pages/SSH/SSH'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/ssh/:OS/:username/:IP' component={SSH} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
