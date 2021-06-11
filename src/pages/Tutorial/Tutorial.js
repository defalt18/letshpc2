import React, { useCallback, useState } from 'react'
import './tut.css'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Chip from '@material-ui/core/Chip'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { IconButton } from '@material-ui/core'
import SshModal from '../../components/Modal/SshModal'
import { useHistory } from 'react-router-dom'
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded'
import Tooltip from '@material-ui/core/Tooltip'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { updateUserProfile, useUser } from '../../services/services'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'

const chipColor = {
	beginner: 'green',
	medium: 'yellow',
	advance: '#eb4034'
}

function Tutorial(props) {
	const history = useHistory()
	const dispatch = useDispatch()
	const user = useUser()

	const { state = { details: '{}' } } = props.location
	const {
		title = 'Sample Thread Exercise',
		theory = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque cupiditate ' +
			'dicta eaque eius enim exercitationem ' +
			'fugit impedit, iusto magnam maiores minus modi nihil perferendis, quis quo sed soluta tempora?',
		code,
		testcases = [],
		level = 'beginner',
		_id = null
	} = JSON.parse(state.details)

	const [complete, setComplete] = useState(
		() => user.completedTutorials.includes(_id) > 0
	)

	const markComplete = useCallback(async () => {
		const tutorialList = user.completedTutorials
		const updatedUser = {
			...user,
			completedTutorials: [...tutorialList, { id: _id, time: Date.now() }]
		}
		await updateUserProfile(updatedUser)
		dispatch(setUser({ user: updatedUser }))
		setComplete(true)
		alert('Tutorial marked as completed')
	}, [user, _id, dispatch])

	console.log(user)
	return (
		<div className='tutorials__page'>
			<div className='tut__head'>
				<IconButton
					onClick={() => history.goBack()}
					aria-label='back'
					style={{ color: 'white' }}
				>
					<ArrowBackIcon />
				</IconButton>
				<h2>{title}</h2>
				<Chip
					variant='outlined'
					size='small'
					label={level[0].toUpperCase() + level.slice(1)}
					style={{ color: chipColor[level], borderColor: chipColor[level] }}
				/>
				{!complete ? (
					<Tooltip title='Mark as completed'>
						<IconButton
							onClick={markComplete}
							style={{ marginLeft: 'auto', color: 'rgb(0,200,150)' }}
						>
							<DoneAllRoundedIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title='Tutorial marked as completed'>
						<IconButton style={{ marginLeft: 'auto', color: 'rgb(0,150,250)' }}>
							<AssignmentTurnedInIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
			<div className='content__window'>
				<h1># {title}</h1>
				<div className='topic__desc'>
					{theory}
					<br />
					<br />
					{theory}
				</div>
				<div className='codeboxes'>
					<div className='samp'>
						<h3 style={{ color: 'white' }}>> Sample Code</h3>
						<ButtonGroup style={{ position: 'absolute', right: '10px' }}>
							<Button
								onClick={() => {
									document.getElementById('output').style.display = 'block'
								}}
								style={{
									textTransform: 'capitalize',
									background: 'darkgreen',
									color: 'white',
									margin: '0'
								}}
							>
								Run
							</Button>
							<Button
								style={{
									textTransform: 'capitalize',
									background: 'black',
									padding: 0,
									color: 'white',
									margin: '0'
								}}
							>
								<SshModal background='black' textcolor='white' OS='mac' />
							</Button>
						</ButtonGroup>
					</div>
					{code}
				</div>
				<div
					id='output'
					className='codeboxes'
					style={{ display: 'none', margin: '20px 0' }}
				>
					<h3 style={{ color: 'white', margin: '10px 0' }}>Output</h3>
					{testcases &&
						testcases.map((item) => (
							<>
								<p>Input : {item.input}</p>
								<p>Output : {item.output}</p>
							</>
						))}
				</div>
				<div className='topic__desc'>
					<p>{theory}</p>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Tutorial)
