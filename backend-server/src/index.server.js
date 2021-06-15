const express = require('express')
const app = express()
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

app.use(require('morgan')('dev')) // Morgan to log requests on server console
app.use(cors()) // for cross-domain requests

// mongodb connected
env.config() // environment variable or you can say constants
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/letshpc2'
const PORT = process.env.PORT || 8000
mongoose
	.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then(() => console.log('Connected to MongoDB...'))
	.catch((error) => console.log('MongoDB Error:\n', error))

// Import Routes
const adminRoutes = require('./routes/admin/auth')
const userRoutes = require('./routes/auth')
const adminTutorialRoutes = require('./routes/admin/tutorial')
const tutorialRoutes = require('./routes/tutorial')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))

// Routes
// body parser for pass json data
app.use(express.json())
//show database images via url
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', adminRoutes)
app.use('/api', userRoutes)
app.use('/api', adminTutorialRoutes)
app.use('/api', tutorialRoutes)

// app.use("/api", (req, res) => {
//     return res.status(200).json({
//         message: "API is working ",
//     });
// });

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../../build'))
}

// for error
app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

// Handle all the previous errors (including 404 and others)
app.use((error, req, res, next) => {
	console.log(req.body)
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`)
})
