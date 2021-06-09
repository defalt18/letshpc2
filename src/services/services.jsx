import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import axios from 'axios'
import _reduce from 'lodash/reduce'

const BASE_URL = 'http://localhost:8000/api'

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const SignIn = async (credentials) => {
	const { userName, password } = credentials

	if (userName === '') return { status: 'Please enter your username' }
	if (password === '') return { status: 'Password is incorrect' }

	const result = await axios.post(`${BASE_URL}/signin`, credentials)
	return { user: result.data.user, status: result.data.message }
}

export const Register = async (details) => {
	const { userName, email, firstName, lastName, password, cpass } = details

	if (userName === '') return { status: 'Please enter a username' }
	if (firstName === '') return { status: 'Please enter a first name' }
	if (lastName === '') return { status: 'Please enter a last name' }
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
		email: email,
		firstName: firstName,
		lastName: lastName,
		userName: userName,
		password: password
	}

	const result = await axios.post(`${BASE_URL}/signup`, user)
	return { user: result.data.user, status: result.data.message }
}

export const updateUserProfile = async (user) => {
	return await axios.post(`${BASE_URL}/updateProfile`, user)
}

export const fetchTutorialByIds = (tutorialIds) => {
	let data = []
	return _reduce(
		tutorialIds,
		async (_, tutorial) => {
			const result = await axios.get(`${BASE_URL}/tutorial/${tutorial}`)
			data = [...data, result.data.tutorial]
			return data
		},
		[]
	)
}

export const fetchAllTutorials = async () => {
	return await axios.get(`${BASE_URL}/tutorial`)
}

export const signOutUserFromDatabase = async () => {
	return await axios.get(`${BASE_URL}/signout`)
}

export const useUser = () => {
	return useSelector(selectUser).user
}
