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

function DashboardTutorials({ user }) {
	const { savedTutorials } = user
	const dispatch = useDispatch()
	const [tutorials, setTutorials] = useState([])

	const getSavedTutorials = useCallback(async () => {
		const result = await fetchTutorialByIds(savedTutorials)
		setTutorials(result)
	}, [setTutorials, savedTutorials])

	useEffect(
		() => getSavedTutorials(),
		[user.savedTutorials.length, getSavedTutorials]
	)

	const chipColor = {
		beginner: 'green',
		medium: 'yellow',
		advance: 'red'
	}

	const removeTutorial = useCallback(
		async (id) => {
			_remove(user.savedTutorials, (item) => item == id) // eslint-disable-line
			const updateUser = { ...user, savedTutorials: user.savedTutorials }
			const result = await updateUserProfile(updateUser)
			dispatch(setUser({ user: result.data.user }))
		},
		[dispatch, user]
	)

	return (
		<div className='page'>
			<h2>This is Tutorials Page</h2>
			<div className='tutorial__list'>
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
									label={item.level[0].toUpperCase() + item.level.slice(1)}
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
							<p>{item.theory.slice(0, 200)}</p>
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
		</div>
	)
}

export default React.memo(DashboardTutorials)
