import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

export const createTutorial = async (tutorial) => {
	const result = await axios.post(`${BASE_URL}/admin/tutorial/create`, tutorial)
	return result.data.message
}

export const fetchAllUsers = async () => {
	return await axios.get(`${BASE_URL}/admin/alluser`)
}

export const editTutorial = async (tutorial) => {
	const result = await axios.post(
		`${BASE_URL}/admin/tutorial/edit/${tutorial._id}`
	)
	return result.message
}

export const adminSignIn = async (credentials) => {
	const { userName, password } = credentials

	if (userName === '') return { status: 'Please enter username' }
	if (password === '') return { status: 'Please enter password' }

	const result = await axios.post(`${BASE_URL}/admin/signin`, credentials)
	return { user: result.data.user, status: result.data.message }
}
