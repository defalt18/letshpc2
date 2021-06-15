import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../slices/userSlice'
import { Link, useHistory } from 'react-router-dom'
import { signOutUserFromDatabase } from '../../services/services'

function Sidebar({ page, setPage, user }) {
	const dispatch = useDispatch()
	const history = useHistory()

	const logout = useCallback(async () => {
		// remove from store
		dispatch(logoutUser())
		// go to home
		history.push('/')
		// remove from database
		await signOutUserFromDatabase()
	}, [dispatch, history])

	return (
		<div className='sidebar'>
			<h2>Dashboard</h2>
			{user?.role === 'Professor' ? (
				<>
					<h3
						style={{ color: `${page === 0 ? 'white' : 'gray'}` }}
						onClick={() => setPage(0)}
					>
						Home
					</h3>
					<h3
						style={{ color: `${page === 1 ? 'white' : 'gray'}` }}
						onClick={() => setPage(1)}
					>
						Create Tutorials
					</h3>
					<h3
						style={{ color: `${page === 2 ? 'white' : 'gray'}` }}
						onClick={() => setPage(2)}
					>
						Evaluate Reports
					</h3>
					<h3
						style={{ color: `${page === 3 ? 'white' : 'gray'}` }}
						onClick={() => setPage(3)}
					>
						Students
					</h3>
				</>
			) : (
				<>
					<h3
						style={{ color: `${page === 0 ? 'white' : 'gray'}` }}
						onClick={() => setPage(0)}
					>
						Tutorials
					</h3>
					<h3
						style={{ color: `${page === 1 ? 'white' : 'gray'}` }}
						onClick={() => setPage(1)}
					>
						Report Generation
					</h3>
					<h3
						style={{ color: `${page === 2 ? 'white' : 'gray'}` }}
						onClick={() => setPage(2)}
					>
						Data Visualisation
					</h3>
					<h3
						style={{ color: `${page === 3 ? 'white' : 'gray'}` }}
						onClick={() => setPage(3)}
					>
						Profile
					</h3>
				</>
			)}
			<h3 onClick={logout} style={{ color: 'gray' }}>
				Logout
			</h3>
			<h3 style={{ color: 'gray', marginTop: 'auto', marginBottom: 20 }}>
				<Link to='/' style={{ color: 'unset', textDecoration: 'none' }}>
					Go to home
				</Link>
			</h3>
		</div>
	)
}

export default React.memo(Sidebar)
