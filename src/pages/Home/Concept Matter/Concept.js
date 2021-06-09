import React, { useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded'
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import { CircularProgress } from '@material-ui/core'
import { updateUserProfile, useUser } from '../../../services/services'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'

function Concept(props) {
	const user = useUser()
	const history = useHistory()
	const { title, theory, level, _id } = props.tutorial
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [clicked, setClicked] = useState(
		() => user?.savedTutorials.includes(_id) > 0
	)

	const chipColor = {
		beginner: 'green',
		medium: 'yellow',
		advance: '#eb4034'
	}

	const navigateToTutorial = useCallback(
		() =>
			history.push('/tutorials', { details: JSON.stringify(props.tutorial) }),
		[history, props.tutorial]
	)

	const saveTutorial = useCallback(async () => {
		setClicked(true)
		setLoading(true)
		const updateUser = {
			...user,
			savedTutorials: [...user.savedTutorials, _id]
		}
		await updateUserProfile(updateUser)
		dispatch(setUser({ user: updateUser }))
		setLoading(false)
	}, [setLoading, dispatch, _id, user])

	return (
		<div className='concept__box'>
			<h2 style={{ color: 'rgba(0,150,255)' }}>{title}</h2>
			<Chip
				variant='outlined'
				size='small'
				label={level[0].toUpperCase() + level.slice(1)}
				style={{
					color: chipColor[level],
					borderColor: chipColor[level],
					maxWidth: '90px'
				}}
			/>
			<p>{theory.slice(0, 100)}...</p>
			<div className='info'>
				{user &&
					user.role === 'Student' &&
					(loading ? (
						<CircularProgress size={30} />
					) : clicked ? (
						<BookmarkRoundedIcon
							style={{
								cursor: 'pointer',
								color: 'rgba(255,255,255,0.3)'
							}}
						/>
					) : (
						<BookmarkBorderRoundedIcon
							onClick={saveTutorial}
							style={{
								cursor: 'pointer',
								color: 'rgba(255,255,255,0.3)'
							}}
						/>
					))}
				<Button
					onClick={navigateToTutorial}
					style={{
						textTransform: 'capitalize',
						color: 'white',
						background: 'green',
						width: '100%'
					}}
				>
					Go to tutorial
				</Button>
			</div>
		</div>
	)
}

export default React.memo(Concept)
