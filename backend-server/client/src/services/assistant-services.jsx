import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'
// const BASE_URL = 'http://192.168.1.16:8000/api'
const SUCCESS = 'Successful'

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const createTutorial = async (tutorial) => {
	const newTutorial = {
		...tutorial,
		testcases: [{ input: tutorial.input, output: tutorial.output }]
	}
	const result = await axios.post(`${BASE_URL}/TA/tutorial/create`, newTutorial)
	return result.data.message
}

export const fetchAllUsers = async () => {
	return await axios.get(`${BASE_URL}/TA/alluser`)
}

export const editTutorial = async (tutorial) => {
	const result = await axios.post(
		`${BASE_URL}/TA/tutorial/edit/${tutorial._id}`
	)
	return result.message
}

export const adminSignIn = async (credentials) => {
	const { userName, password } = credentials

	if (userName === '') return { status: 'Please enter username' }
	if (password === '') return { status: 'Please enter password' }

	const result = await axios.post(`${BASE_URL}/TA/signin`, credentials)
	return { user: result.data.user, status: result.data.message }
}

export const RegisterTA = async (details) => {
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

export const deleteTutorialById = async (id) => {
	await axios.post(`${BASE_URL}/TA/tutorialById`, id)
	return SUCCESS
}
