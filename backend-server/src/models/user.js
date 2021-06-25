const mongoose = require('mongoose')
const Tutorial = require('./tutorial').schema
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20
		},
		image: {
			type: Object,
			default: {}
		},
		bio: {
			type: String,
			trim: true,
			min: 3,
			max: 200
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20
		},
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			min: 3,
			max: 20
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true
		},
		hashPassword: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: ['Student', 'Professor'],
			default: 'Student'
		},
		savedTutorials: [
			{
				tutorial: { type: Tutorial }
			}
		],
		completedTutorials: [
			{
				tutorial: { type: Tutorial },
				time: { type: Date }
			}
		],
		report: {
			questionsAttempted: [
				{
					type: Object,
					default: {}
				}
			]
		},
		reportDoc: { type: Object },
		savedPlots: [
			{
				imageURL: { type: String },
				createDate: { type: Date }
			}
		]
	},
	{ timestamps: true }
)

userSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.hashPassword)
	}
}

module.exports = new mongoose.model('User', userSchema)
