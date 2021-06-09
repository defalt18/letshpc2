const Tutorial = require('../models/tutorial')

exports.getAllTutorials = (req, res) => {
	Tutorial.find({}).exec((err, Tutorial) => {
		if (err)
			return res.status(400).json({
				message: 'Somethings went wrong',
				error: err
			})
		return res.status(200).json({
			message: 'All Tutorial fetched',
			tutorials: Tutorial
		})
	})
}

exports.getTutorial = (req, res) => {
	Tutorial.findById(req.params.id).exec((err, Tutorial) => {
		if (err)
			return res.status(400).json({
				message: 'Somethings went wrong',
				error: err
			})
		return res.status(200).json({
			message: 'Tutorial fetched successfully',
			tutorial: Tutorial
		})
	})
}

exports.delTutorial = (req, res) => {
	Tutorial.deleteMany({})

	res.status(201).json({
		message: 'Tutorial deleted successfully'
	})
}
