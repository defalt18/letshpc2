import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import SSH from './pages/SSH/SSH'
import Tutorial from './pages/Tutorial/Tutorial'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/ssh/:OS/:username/:ip' component={SSH} />
				<Route exact path='/tutorials' component={Tutorial} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/admin-dashboard' component={AdminDashboard} />
				<Route exact path='/admin-login' component={AdminLogin} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
}

export default App
