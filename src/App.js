import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import SSH from './pages/SSH/SSH'
import Tutorial from './pages/Tutorial/Tutorial'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/ssh/:OS/:username/:ip' component={SSH} />
				<Route exact path='/tutorials' component={Tutorial} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/dashboard' component={Dashboard} />
			</Switch>
		</Router>
	)
}

export default App
