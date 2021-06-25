import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import * as services from '../../services/services'
import './Login.css'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import logo from '../../Letshpc.png'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import { IconButton } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

const SUCCESS = 'Successful'
function Login() {
	const history = useHistory()
	const dispatch = useDispatch()
	const [page, setpage] = React.useState(1)

	const [login, setlogin] = React.useState({
		userName: '',
		password: ''
	})

	const [loading, setLoading] = React.useState(false)

	const notify = (error) => {
		toast.error(error, {
			position: toast.POSITION.TOP_RIGHT
		})
	}

	const [signup, setSignUp] = React.useState({
		userName: '',
		email: '',
		lastName: '',
		firstName: '',
		password: '',
		cpass: ''
	})

	const handleSignupChanges = (e) => {
		const { name, value } = e.target
		setSignUp({ ...signup, [name]: value })
	}

	const handleLoginChanges = (e) => {
		const { name, value } = e.target
		setlogin({ ...login, [name]: value })
	}

	const Authorize = async (action) => {
		setLoading(true)
		const { user, status } =
			action === 'login'
				? await services.SignIn(login)
				: await services.Register(signup)

		if (status === SUCCESS) {
			dispatch(setUser({ user }))
			history.push('/dashboard')
		}
		notify(status)
		setLoading(false)
	}

	return (
		<div class='login__page'>
			<IconButton id='home' onClick={() => history.push('/')}>
				<HomeOutlinedIcon />
			</IconButton>
			{page ? (
				<div class='login__box'>
					<h2>Login to LetsHPC</h2>
					<label htmlFor='email'>Username</label>
					<input
						type='text'
						name='userName'
						id='email'
						onChange={handleLoginChanges}
						placeholder='Username'
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						onChange={handleLoginChanges}
						placeholder='Password'
					/>
					<Button id='loginbut' onClick={() => Authorize('login')}>
						{loading ? (
							<CircularProgress size={30} style={{ color: 'white' }} />
						) : (
							'Login'
						)}
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
				</div>
			) : (
				<div className='signupFlex'>
					<div className='signupBox'>
						<img src={logo} alt={'letshpc'} />
						<h2>Sign Up to LetsHPC</h2>
						<p>
							Already have an account?{' '}
							<u style={{ cursor: 'pointer' }} onClick={() => setpage(1)}>
								Login
							</u>
						</p>
					</div>
					<div className='login__box' style={{ flexBasis: '50%' }}>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='userName'
							id='username'
							onChange={handleSignupChanges}
							placeholder='Username'
						/>
						<label htmlFor='name'>First Name</label>
						<input
							type='text'
							name='firstName'
							id='name'
							onChange={handleSignupChanges}
							placeholder='John'
						/>
						<label htmlFor='name'>Last Name</label>
						<input
							type='text'
							name='lastName'
							id='name'
							onChange={handleSignupChanges}
							placeholder='Doe'
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
							type='password'
							name='password'
							id='password'
							onChange={handleSignupChanges}
							placeholder='Password'
						/>
						<label htmlFor='cpass'>Confirm Password</label>
						<input
							type='password'
							name='cpass'
							id='cpass'
							onChange={handleSignupChanges}
							placeholder='Confirm Password'
						/>
						<Button id='loginbut' onClick={() => Authorize('register')}>
							{loading ? (
								<CircularProgress size={30} style={{ color: 'white' }} />
							) : (
								'Signup'
							)}
						</Button>
					</div>
				</div>
			)}
			<ToastContainer />
		</div>
	)
}

export default Login
