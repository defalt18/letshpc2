exports.userMiddleware = (req, res, next) => {
	if (req.user.role !== 'Student') {
		return res.status(400).json({ message: 'Access denied' })
	}
	next()
}

exports.adminMiddleware = (req, res, next) => {
	if (req.user.role !== 'Professor') {
		return res.status(400).json({ message: 'Access denied' })
	}
	next()
}
