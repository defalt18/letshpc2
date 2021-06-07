import { User } from '../types/data_types'

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const SignIn = (credentials) => {
	const { email, password } = credentials

	if (email === '' || !validateEmail(email))
		return { status: 'Please enter valid email' }
	if (password === '') return { status: 'Password is incorrect' }

	return { user: User, status: 'Successful' }
}

export const Register = (details) => {
	const { username, email, name, password, cpass } = details

	if (username === '') return { status: 'Please enter a username' }
	if (name === '') return { status: 'Please enter a name' }
	if (
		email === '' ||
		!validateEmail(email) ||
		email.slice(9) !== '@daiict.ac.in'
	)
		return { status: 'Please enter valid DAIICT email' }
	if (password === '' && password.length < 6)
		return { status: 'Password should at least be of 6 letters' }
	if (password !== cpass)
		return { status: "Confirm password and password don't match" }

	const user = {
		...User,
		email: email,
		firstName: name,
		studentID: email.slice(0, 9),
		username: username
	}

	return { user: user, status: 'Successful' }
}
