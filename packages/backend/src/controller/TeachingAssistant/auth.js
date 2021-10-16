const User = require('../../models/user')
const jwt = require('jsonwebtoken') //for user token
const bcrypt = require('bcryptjs') //for password hashing

const SUCCESS = 'Successful'
const KEY =
	'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyMzE0OTk4MiwiaWF0IjoxNjIzMTQ5OTgyfQ.HhLyQIs_xlzCs1H5wkQ9mQJSbvAcftNUyGApLq0Pa3k'

exports.getAllUser = (req, res) => {
	User.find({}).exec((err, users) => {
		if (err)
			return res.status(400).json({
				message: 'Some things went wrong'
			})
		return res.status(200).json({
			message: SUCCESS,
			users: users
		})
	})
}

exports.signUp = (req, res) => {
	User.findOne({ email: req.body.email }).exec(async (err, user) => {
		if (user)
			return res.status(400).json({
				message: 'Admin already exists'
			})

		const { firstName, lastName, email, password } = req.body

		const hashPassword = await bcrypt.hash(password, 10)

		const _user = new User({
			firstName,
			lastName,
			email,
			hashPassword,
			userName: email.split('@')[0],
			role: 'Professor'
		})

		_user.save((error, data) => {
			if (error) {
				return res
					.status(400)
					.json({ message: 'Something went wrong', error: error })
			}

			if (data) {
				return res.status(201).json({
					message: SUCCESS,
					user: data
				})
			}
		})
	})
}

exports.signIn = (req, res) => {
	User.findOne({ userName: req.body.userName }).exec((err, user) => {
		if (err) {
			return res.status(400).json({ error: err })
		}
		if (user) {
			if (user.authenticate(req.body.password) && user.role === 'Professor') {
				//  send token for authorization
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWT_SECRET || KEY,
					{
						expiresIn: '1d'
					}
				)

				res.cookie('token', token, { expiresIn: '1d' })
				res.status(200).json({
					token,
					message: SUCCESS,
					user: user
				})
			} else {
				return res.status(400).json({ message: 'Invalid Password' })
			}
		} else {
			return res.status(400).json({ message: 'something went wrong' })
		}
	})
}

exports.signOut = (req, res) => {
	res.clearCookie('token')
	res.status(200).json({ message: SUCCESS })
}
