// as ENUM
export const UserRole = {
  STUDENT: 'Student',
  PROFESSOR: 'Professor',
};
// default new user
export const User = {
  _id: '',
  firstName: '',
  lastName: '',
  bio: '',
  image: '',
  studentID: '',
  username: '',
  email: '',
  savedTutorials: [],
  completedTutorials: [],
  report: {
    questionsAttempted: [],
  },
  savedPlots: [],
  role: UserRole.STUDENT,
};

// as ENUM
export const Level = {
  EASY: 'beginner',
  MEDIUM: 'medium',
  HARD: 'advance',
};

export const Tutorial_Default = {
  _id: null,
  firebaseFileName: '', // which will be downloaded from server
  title: 'This is a dummy tutorial',
  tags: [],
  level: Level.EASY,
  code: 'printf("Hello and please go back!")',
  testcases: [{ input: 'Please go back', output: 'An error occured' }],
  theory:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque cupiditate ' +
    'dicta eaque eius enim exercitationem ' +
    'fugit impedit, iusto magnam maiores minus modi nihil perferendis, quis quo sed soluta tempora?',
};

// Report question
export const Question = {
  id: '',
  question: '',
  answer: '',
  questionNumber: 0,
};
