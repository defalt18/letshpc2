import React, { useCallback, useState } from 'react'
import { Button, IconButton } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import { useHistory } from 'react-router-dom'
import { adminSignIn } from '../../services/admin-services'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'

function AdminLogin() {
	const history = useHistory()
	const dispatch = useDispatch()
	const [credentials, setCredentials] = useState({
		userName: '',
		password: ''
	})

	const Authorise = useCallback(async () => {
		const { user, status } = await adminSignIn(credentials)
		if (status === 'Successful') {
			dispatch(setUser({ user: user }))
			history.push('/admin-dashboard')
		}
	}, [credentials, history, dispatch])

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target
			setCredentials({ ...credentials, [name]: value })
		},
		[credentials, setCredentials]
	)

	return (
		<div
			style={{
				backgroundColor: '#2d333b',
				height: '100vh',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<IconButton id='home' onClick={() => history.push('/')}>
				<HomeOutlinedIcon />
			</IconButton>
			<div
				style={{
					backgroundColor: '#1c2125',
					padding: 20,
					display: 'flex',
					flexDirection: 'column',
					gap: 20,
					color: 'lightgray',
					width: '35vw'
				}}
			>
				<h1 style={{ margin: 'auto' }}>Admin Login</h1>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					className='inputs'
					placeholder='Username'
					name='userName'
					id='username'
					onChange={handleChange}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					className='inputs'
					placeholder='Password'
					name='password'
					id='password'
					onChange={handleChange}
				/>
				<Button
					onClick={Authorise}
					style={{
						color: 'white',
						backgroundColor: '#2d333b'
					}}
				>
					Login
				</Button>
			</div>
		</div>
	)
}

export default AdminLogin
