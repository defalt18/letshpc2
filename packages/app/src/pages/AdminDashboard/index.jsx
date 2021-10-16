import React, { useState } from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar'
import AdminHome from './Home'
import CreateTutorials from './CreateTutorials'
import ReportEvaluations from './ReportEvaluation'
import AllStudents from './AllStudents/AllStudents'
import { useUser } from '../../services/services'

function AdminDashboard() {
	const [page, setPage] = useState(0)
	const user = useUser()

	return (
		<div className='admin__dashboard'>
			<Sidebar page={page} setPage={setPage} user={user} />
			{page === 0 ? <AdminHome user={user} /> : null}
			{page === 1 ? <CreateTutorials /> : null}
			{page === 2 ? <ReportEvaluations /> : null}
			{page === 3 ? <AllStudents /> : null}
		</div>
	)
}

export default AdminDashboard
