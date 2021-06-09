import React, { useCallback, useState } from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { createTutorial } from '../../../services/admin-services'

const useStyles = makeStyles(() => ({
	textfields: {
		border: '#22272d',
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2d333b'
		},
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2d333b'
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2d333b'
		},
		'& .MuiOutlinedInput-input': {
			color: 'white'
		},
		'&:hover .MuiOutlinedInput-input': {
			color: 'white'
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			color: 'white'
		},
		'& .MuiInputLabel-outlined': {
			color: 'white'
		},
		'&:hover .MuiInputLabel-outlined': {
			color: 'white'
		},
		'& .MuiInputLabel-outlined.Mui-focused': {
			color: 'white'
		}
	}
}))

function CreateTutorials() {
	const classes = useStyles()
	const [tutorial, setTutorial] = useState({
		title: '',
		theory: '',
		code: '',
		level: 'beginner',
		tags: Array,
		testcases: Array
	})

	const issueAddition = useCallback(async () => {
		const result = await createTutorial(tutorial)
		alert(result)
	}, [tutorial])

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target
			setTutorial({ ...tutorial, [name]: value })
		},
		[tutorial, setTutorial]
	)
	return (
		<div className='admin__content'>
			<h1>Create a Tutorial</h1>
			<div className='create__tutorials'>
				<label htmlFor={'title'}>Title</label>
				<input
					placeholder='Title'
					className='inputs'
					type='text'
					name='title'
					onChange={handleChange}
					id='name'
				/>
				<Autocomplete
					id='combo-box-demo'
					options={['beginner', 'medium', 'advance']}
					value={tutorial.level}
					onChange={(e, value) => setTutorial({ ...tutorial, level: value })}
					getOptionLabel={(option) => option}
					style={{ width: '100%' }}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Level'
							name='level'
							className={classes.textfields}
							variant='outlined'
						/>
					)}
				/>
				<label htmlFor={'theory'}>Theory</label>
				<TextareaAutosize
					placeholder='Theory'
					className='inputs'
					rowsMin={6}
					type='text'
					name='theory'
					onChange={handleChange}
					id='theory'
				/>

				<label htmlFor={'code'}>Code</label>
				<TextareaAutosize
					placeholder='Code'
					className='inputs'
					rowsMin={6}
					type='text'
					onChange={handleChange}
					name='code'
					id='code'
				/>
				<Button
					onClick={issueAddition}
					style={{ background: '#2d333b', color: 'white' }}
				>
					Submit Tutorial
				</Button>
			</div>
		</div>
	)
}

export default CreateTutorials
