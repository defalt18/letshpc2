import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { updateUserProfile } from '../../../services/services'
import _map from 'lodash/map'
import _remove from 'lodash/remove'
import _isEqual from 'lodash/isEqual'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { CheckRounded } from '@material-ui/icons'

function DashboardTutorials({ user }) {
	const { savedTutorials, completedTutorials } = user
	const dispatch = useDispatch()

	const notify = () => {
		toast.success('Tutorial removed from the list', {
			position: toast.POSITION.TOP_RIGHT
		})
	}

	const chipColor = {
		beginner: 'green',
		medium: 'yellow',
		advance: 'red'
	}

	const removeTutorial = useCallback(
		async (tutorial) => {
			const tutorialArray = _remove([...savedTutorials],item=> !_isEqual(item.tutorial, tutorial )) // eslint-disable-line
			const updateUser = { ...user, savedTutorials: tutorialArray }
			await updateUserProfile(updateUser)
			dispatch(setUser({ user: updateUser }))
			notify()
		},
		[dispatch, user, savedTutorials]
	)

	return (
		<div className='page'>
			<h2>Review Tutorials</h2>
			<div className='tutorial__list'>
				{savedTutorials.length > 0 ? (
					_map(savedTutorials, ({ tutorial }, index) => (
						<div key={index} className='tutorial__item'>
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
										state: { details: JSON.stringify(tutorial) }
									}}
									style={{ textDecoration: 'none', color: 'lightgray' }}
								>
									<h3>{tutorial?.title}</h3>
								</Link>
								<Chip
									variant='outlined'
									size='small'
									label={
										tutorial?.level[0].toUpperCase() + tutorial?.level.slice(1)
									}
									style={{
										color: chipColor[tutorial?.level],
										borderColor: chipColor[tutorial?.level]
									}}
								/>
								<p
									onClick={() => removeTutorial(tutorial)}
									style={{
										marginLeft: 'auto',
										color: 'lightgreen',
										cursor: 'pointer'
									}}
								>
									Mark as Read
								</p>
							</div>
							<p>{tutorial?.theory.slice(0, 200)}...</p>
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
			<div
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
					style={{
						background: 'linear-gradient(90deg, green, darkgreen)',
						padding: 5,
						borderRadius: '50%'
					}}
				/>{' '}
			</div>
			<div className='tutorial__list'>
				{completedTutorials.length > 0 ? (
					_map(completedTutorials, ({ tutorial, time }, index) => (
						<div key={index} className='tutorial__item'>
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
										state: { details: JSON.stringify(tutorial) }
									}}
									style={{ textDecoration: 'none', color: 'lightgray' }}
								>
									<h3>{tutorial?.title}</h3>
								</Link>
								<Chip
									variant='outlined'
									size='small'
									label={
										tutorial?.level[0].toUpperCase() + tutorial?.level.slice(1)
									}
									style={{
										color: chipColor[tutorial?.level],
										borderColor: chipColor[tutorial?.level]
									}}
								/>
							</div>
							<p>{tutorial?.theory.slice(0, 200)}...</p>
							<p>
								<span style={{ color: 'lightgreen' }}>Completed on</span> :{' '}
								{Date(time)}
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
			<ToastContainer />
		</div>
	)
}

export default React.memo(DashboardTutorials)
