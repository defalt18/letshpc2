const User = require('../models/user')
const jwt = require('jsonwebtoken') //for user token
const bcrypt = require('bcryptjs') //for password hashing

const SUCCESS = 'Successful'

const KEY =
	'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyMzE0OTk4MiwiaWF0IjoxNjIzMTQ5OTgyfQ.HhLyQIs_xlzCs1H5wkQ9mQJSbvAcftNUyGApLq0Pa3k'

exports.signUp = (req, res) => {
	const { firstName, lastName, email, password, userName } = req.body
	User.findOne({ email: email }).exec(async (err, user) => {
		if (err)
			return res
				.status(400)
				.json({ message: 'something went wrong ', error: err })
		if (user)
			return res.status(400).json({
				message: 'User already exists'
			})

		const hashPassword = await bcrypt.hash(password, 10)

		const _user = new User({
			firstName,
			lastName,
			email,
			userName,
			hashPassword
		})

		_user.save((error, data) => {
			if (error) {
				return res
					.status(400)
					.json({ message: 'Something went wrong', error: error })
			}

			if (data) {
				return res.status(201).json({ message: SUCCESS, user: data })
			}
		})
	})
}

exports.signIn = (req, res) => {
	const { userName, password } = req.body
	User.findOne({ userName: userName }).exec((err, user) => {
		if (err) {
			return res.status(400).json({ error: err })
		}
		if (user) {
			if (user.authenticate(password) && user.role === 'Student') {
				//  send token for authorization
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWT_SECRET || KEY,
					{
						expiresIn: '2d'
					}
				)

				// const { _id, firstName, lastName, email, role, userName } = user
				res.status(200).json({
					token,
					message: SUCCESS,
					user: user
				})
			} else {
				return res.status(400).json({ message: 'Invalid Password' })
			}
		} else {
			return res.status(400).json({ message: 'Something went wrong' })
		}
	})
}

exports.updateProfile = async (request, result) => {
	const { userName } = request.body
	console.log(request.body)
	const updatedUser = await User.findOneAndUpdate(
		{ userName: userName },
		{ $set: request.body },
		{
			new: true
		}
	)
	result.status(200).json({ message: SUCCESS, user: updatedUser })
}

exports.signOut = (req, res) => {
	res.clearCookie('token')
	res.status(200).json({ message: SUCCESS })
}
