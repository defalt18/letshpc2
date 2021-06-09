// as ENUM
export const UserRole = {
	STUDENT: 'Student',
	PROFESSOR: 'Professor'
}
// default new user
export const User = {
	id: '',
	firstName: '',
	lastName: '',
	bio: '',
	image: '',
	studentID: '',
	username: '',
	email: '',
	savedTutorials: Array,
	completedTutorials: Array,
	report: {
		questionsAttempted: Array
	},
	savedPlots: Array,
	role: UserRole.STUDENT
}

// as ENUM
export const Level = {
	EASY: 'Beginner',
	MEDIUM: 'Medium',
	HARD: 'Advance'
}

export const Tutorial = {
	id: '',
	firebaseFileName: '', // which will be downloaded from server
	title: '',
	tags: Array,
	level: Level.EASY,
	isCompleted: false,
	code: '',
	testcases: Array,
	theory: ''
}

// Report question
export const Question = {
	id: '',
	question: '',
	answer: '',
	questionNumber: 0
}
