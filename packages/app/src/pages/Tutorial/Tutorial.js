import React, { useCallback, useState } from 'react'
import './tut.css'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Chip from '@material-ui/core/Chip'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { IconButton } from '@material-ui/core'
import SshModal from 'components/Modal/SshModal'
import { useHistory } from 'react-router-dom'
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded'
import Tooltip from '@material-ui/core/Tooltip'
import _find from 'lodash/find'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { updateUserProfile, useUser } from 'services/services'
import { useDispatch } from 'react-redux'
import { setUser } from 'slices/userSlice'
import { Tutorial_Default } from 'types/data_types'

const chipColor = {
	beginner: 'green',
	medium: 'yellow',
	advance: '#eb4034'
}

function Tutorial(props) {
	const history = useHistory()
	const dispatch = useDispatch()
	const user = useUser()

	const { state = { details: null } } = props.location
	const tutorialDetails = JSON.parse(state.details)
	const { code, theory, testcases, title, level } =
		tutorialDetails || Tutorial_Default

	const [complete, setComplete] = useState(() =>
		_find(user?.completedTutorials, { tutorial: tutorialDetails })
	)

	const markComplete = useCallback(async () => {
		const tutorialList = user.completedTutorials
		const updatedUser = {
			...user,
			completedTutorials: [
				...tutorialList,
				{ tutorial: tutorialDetails, time: Date.now() }
			]
		}
		await updateUserProfile(updatedUser)
		dispatch(setUser({ user: updatedUser }))
		setComplete(true)
		alert('Tutorial marked as completed')
	}, [user, tutorialDetails, dispatch])

	const dangerousElement = (string = '', props) => (
		<span dangerouslySetInnerHTML={{ __html: `${string} ${props}` }}></span>
	)
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
				{user ? (
					!complete ? (
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
							<IconButton
								style={{ marginLeft: 'auto', color: 'rgb(0,150,250)' }}
							>
								<AssignmentTurnedInIcon />
							</IconButton>
						</Tooltip>
					)
				) : null}
			</div>
			<div className='content__window'>
				<h1># {title}</h1>
				<div className='topic__desc'>
					{/*<p dangerouslySetInnerHTML={{ __html: `${theory}` }}></p>*/}
					{dangerousElement(theory)}
					{/*<br />*/}
					{/*<br />*/}
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
					{/*<p dangerouslySetInnerHTML={{ __html: `${code}` }}>{code}</p>*/}
					{dangerousElement(code)}
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
								{dangerousElement('Input', item.input)}
								{dangerousElement('Output', item.output)}
							</>
						))}
				</div>
				<div className='topic__desc'></div>
			</div>
		</div>
	)
}

export default React.memo(Tutorial)
