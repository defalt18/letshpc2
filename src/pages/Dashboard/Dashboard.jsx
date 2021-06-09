import React, { useState } from 'react'
import './Dashboard.css'
import Sidebar from '../../components/Sidebar'
import DashboardTutorials from './Tutorials'
import ReportGenerationPage from './ReportGenerationPage'
import DataVisualisationPage from './DataVisualisationPage'
import UserProfile from './UserProfile'
import { useUser } from '../../services/services'

function Dashboard() {
	const [page, setPage] = useState(0)

	const user = useUser()

	return (
		<div className='dashboard__home'>
			<Sidebar page={page} setPage={setPage} user={user} />
			{page === 0 ? <DashboardTutorials user={user} /> : null}
			{page === 1 ? <ReportGenerationPage /> : null}
			{page === 2 ? <DataVisualisationPage /> : null}
			{page === 3 ? <UserProfile user={user} /> : null}
		</div>
	)
}

export default Dashboard
