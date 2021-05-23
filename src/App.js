import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Home from './Pages/Home/Home'
import SSH from './Pages/SSH/SSH'
import Tutorial from "./Pages/Tutorial/Tutorial";
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/ssh/:OS/:username' component={SSH} />
          <Route exact path='/tutorials' component={Tutorial} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/:uid/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
