import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import {
	fetchTutorialByIds,
	updateUserProfile
} from '../../../services/services'
import _map from 'lodash/map'
import _remove from 'lodash/remove'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import { CircularProgress } from '@material-ui/core'
import { CheckRounded } from '@material-ui/icons'

function DashboardTutorials({ user }) {
	const { savedTutorials, completedTutorials } = user
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const [tutorials, setTutorials] = useState([])
	const [completed, setCompleted] = useState([])

	const getTutorials = useCallback(async () => {
		const fetchedTutorials = await fetchTutorialByIds(savedTutorials)
		setTutorials(fetchedTutorials)
		const fetchedCompletedTutorials = await fetchTutorialByIds(
			_map(completedTutorials, (tutorial) => tutorial.id)
		)
		setCompleted(fetchedCompletedTutorials)
		setLoading(false)
	}, [
		setTutorials,
		savedTutorials,
		setCompleted,
		completedTutorials,
		setLoading
	])

	useEffect(() => {
		getTutorials().then(() => console.log('Tutorials Fetched'))
	}, [getTutorials])

	const chipColor = {
		beginner: 'green',
		medium: 'yellow',
		advance: 'red'
	}

	const removeTutorial = useCallback(
		async (id) => {
			const tutorialArray = _remove([...user.savedTutorials],item=> item !== id) // eslint-disable-line
			const updateUser = { ...user, savedTutorials: tutorialArray }
			await updateUserProfile(updateUser)
			dispatch(setUser({ user: updateUser }))
		},
		[dispatch, user]
	)

	return (
		<div className='page'>
			<h2>This is Tutorials Page</h2>
			<div className='tutorial__list'>
				{loading && (
					<CircularProgress
						size={40}
						style={{ color: 'white', margin: 'auto' }}
					/>
				)}
				{tutorials.length > 0 ? (
					_map(tutorials, (item, index) => (
						<div className='tutorial__item'>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									alignItems: 'center'
								}}
							>
								<Link
									key={index}
									to={{
										pathname: '/tutorials',
										state: { details: JSON.stringify(item) }
									}}
									style={{ textDecoration: 'none', color: 'lightgray' }}
								>
									<h3>{item.title}</h3>
								</Link>
								<Chip
									variant='outlined'
									size='small'
									label={item.level[0].toUpperCase() + item?.level.slice(1)}
									style={{
										color: chipColor[item.level],
										borderColor: chipColor[item.level]
									}}
								/>
								<p
									onClick={() => removeTutorial(item._id)}
									style={{
										marginLeft: 'auto',
										color: 'lightgreen',
										cursor: 'pointer'
									}}
								>
									Mark as Read
								</p>
							</div>
							<p>{item.theory.slice(0, 200)}...</p>
						</div>
					))
				) : (
					<div style={{ margin: '50px auto' }}>
						<h3>
							Head over to{' '}
							<a href='/#tut' style={{ color: 'lightgray' }}>
								Tutorials Page
							</a>{' '}
							to save some of the tutorials
						</h3>
					</div>
				)}
			</div>
			<p
				style={{
					fontSize: 23,
					fontWeight: 'bold',
					display: 'flex',
					alignItems: 'center',
					gap: 10
				}}
			>
				<p>Completed Tutorials</p>
				<CheckRounded
					fontSize={'medium'}
					style={{
						background: 'linear-gradient(90deg, green, darkgreen)',
						padding: 5,
						borderRadius: '50%'
					}}
				/>{' '}
			</p>
			<div className='tutorial__list'>
				{completed.length > 0 ? (
					_map(completed, (item, index) => (
						<div className='tutorial__item'>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									alignItems: 'center'
								}}
							>
								<Link
									key={index}
									to={{
										pathname: '/tutorials',
										state: { details: JSON.stringify(item) }
									}}
									style={{ textDecoration: 'none', color: 'lightgray' }}
								>
									<h3>{item.title}</h3>
								</Link>
								<Chip
									variant='outlined'
									size='small'
									label={item.level[0].toUpperCase() + item?.level.slice(1)}
									style={{
										color: chipColor[item.level],
										borderColor: chipColor[item.level]
									}}
								/>
							</div>
							<p>{item.theory.slice(0, 200)}...</p>
							<p>
								<span style={{ color: 'lightgreen' }}>Completed at</span> :{' '}
								{Date(completedTutorials[index].time)}
							</p>
						</div>
					))
				) : (
					<div style={{ margin: '50px auto' }}>
						<h3>
							Head over to{' '}
							<a href='/#tut' style={{ color: 'lightgray' }}>
								Tutorials Page
							</a>{' '}
							to complete some of the tutorials
						</h3>
					</div>
				)}
			</div>
		</div>
	)
}

export default React.memo(DashboardTutorials)
