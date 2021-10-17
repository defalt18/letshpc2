import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import SSH from './pages/SSH/SSH';
import Tutorial from './pages/Tutorial/Tutorial';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={SSH} path="/ssh/:OS/:username/:ip" />
        <Route exact component={Tutorial} path="/tutorials" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={AdminDashboard} path="/admin-dashboard" />
        <Route exact component={AdminLogin} path="/admin-login" />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
