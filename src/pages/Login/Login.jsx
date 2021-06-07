import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import * as services from '../../services/services'
import './Login.css'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

function Login() {
	const history = useHistory()
	const [page, setpage] = React.useState(1)

	const [login, setlogin] = React.useState({
		email: '',
		password: ''
	})

	const [error, seterror] = React.useState('')
	const [open, setOpen] = React.useState(false)

	const handleClick = () => {
		setOpen(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const [signup, setsignup] = React.useState({
		username: '',
		email: '',
		name: '',
		password: '',
		cpass: ''
	})

	const handleSignupChanges = (e) => {
		const { name, value } = e.target
		setsignup({ ...signup, [name]: value })
	}

	const handleLoginChanges = (e) => {
		const { name, value } = e.target
		setlogin({ ...login, [name]: value })
	}

	const Authorize = (action) => {
		const { user, status } =
			action === 'login' ? services.SignIn(login) : services.Register(signup)
		if (status === 'Successful')
			history.push('/dashboard', { details: JSON.stringify(user) })
		else {
			seterror(status)
			handleClick()
		}
	}

	return (
		<div class='login__page'>
			{page ? (
				<div class='login__box'>
					<h2>Login to LetsHPC</h2>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						name='email'
						id='email'
						onChange={handleLoginChanges}
						placeholder='201xxxxxx@daiict.ac.in'
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='text'
						name='password'
						id='password'
						onChange={handleLoginChanges}
						placeholder='Password'
					/>
					<Button id='loginbut' onClick={() => Authorize('login')}>
						Login
					</Button>
					<p>
						Don't have an account yet?{' '}
						<u
							style={{ cursor: 'pointer' }}
							onClick={() => {
								setpage(0)
							}}
						>
							Sign Up
						</u>
					</p>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='error'>
							{error}
						</Alert>
					</Snackbar>
				</div>
			) : (
				<div className='login__box'>
					<h2>Sign Up to LetsHPC</h2>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						id='username'
						onChange={handleSignupChanges}
						placeholder='Username'
					/>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						id='name'
						onChange={handleSignupChanges}
						placeholder='John Doe'
					/>
					<label htmlFor='name'>Email</label>
					<input
						type='text'
						name='email'
						id='name'
						onChange={handleSignupChanges}
						placeholder='...@daiict.ac.in'
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='text'
						name='password'
						id='password'
						onChange={handleSignupChanges}
						placeholder='Password'
					/>
					<label htmlFor='cpass'>Confirm Password</label>
					<input
						type='text'
						name='cpass'
						id='cpass'
						onChange={handleSignupChanges}
						placeholder='Confirm Password'
					/>
					<Button id='loginbut' onClick={() => Authorize('register')}>
						Sign Up
					</Button>
					<p>
						Already have an account?{' '}
						<u style={{ cursor: 'pointer' }} onClick={() => setpage(1)}>
							Login
						</u>
					</p>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='error'>
							{error}
						</Alert>
					</Snackbar>
				</div>
			)}
		</div>
	)
}

export default Login
