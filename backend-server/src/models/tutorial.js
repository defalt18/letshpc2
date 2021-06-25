const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const tutorialSchema = require('mongoose').Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			min: 3,
			max: 50
		},
		level: {
			type: String,
			enum: ['beginner', 'medium', 'advance'],
			default: 'beginner'
		},
		theory: {
			type: String
		},
		code: {
			type: String
		},
		testcases: [
			{
				input: { type: String },
				output: { type: String }
			}
		],
		tags: [
			{
				type: String
			}
		],
		isCompleted: {
			type: Boolean
		},
		firebaseFileName: {
			type: String
		}
	},
	{ timestamps: true }
)

module.exports = {
	schema: tutorialSchema,
	model: new mongoose.model('Tutorial', tutorialSchema)
}
