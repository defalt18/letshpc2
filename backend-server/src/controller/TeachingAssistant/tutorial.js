const Tutorial = require('../../models/tutorial').model
const mongo = require('mongoose')

exports.createTutorial = (req, res) => {
	const { title, theory, code, level, tags, testcases } = req.body
	const _tutorial = new Tutorial({
		title,
		theory,
		code,
		level,
		tags,
		testcases
	})

	_tutorial.save((error, tutorial) => {
		if (error) {
			return res
				.status(400)
				.json({ message: 'Something went wrong123', error: error })
		}
		if (tutorial) {
			return res.status(201).json({
				message: 'Tutorial successfully created',
				Tutorial: tutorial
			})
		}
	})
}

exports.editTutorial = (req, res) => {
	Tutorial.findById(req.params.id).exec((err, tutorial) => {
		if (err) {
			return res.status(400).json({ error: err })
		}
		if (tutorial) {
			req.body.title != null && (tutorial.title = req.body.title)
			req.body.level != null && (tutorial.level = req.body.level)
			req.body.theory != null && (tutorial.theory = req.body.theory)
			req.body.code != null && (tutorial.code = req.body.code)
			req.body.testcases != null && (tutorial.testcases = req.body.testcases)
			req.body.tags != null && (tutorial.tags = req.body.tags)
			tutorial.save((error, tutorial) => {
				if (error) {
					return res.status(400).json({
						message: 'Something went wrong',
						error: error
					})
				}
				if (tutorial) {
					return res.status(201).json({
						message: 'Tutorial updated successfully',
						Tutorial: tutorial
					})
				}
			})
		} else {
			return res.status(400).json({ message: 'tutorial not found' })
		}
	})
}

exports.deleteTutorialById = (request, response) => {
	const { _id } = request.body
	Tutorial.deleteOne(
		{
			_id: { $oid: _id }
		},
		(error) => {
			if (error)
				response.status(200).json({
					message: 'Some error occurred'
				})
			else
				response.status(200).json({
					message: 'Tutorial Deleted'
				})
		}
	)
	return response
}
