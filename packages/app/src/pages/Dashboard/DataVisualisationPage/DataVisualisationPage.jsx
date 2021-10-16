import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import ModalWrapper from '../../../components/Modal/ModalWrapper'
import { Close } from '@material-ui/icons'
import './DataVisualisationPage.css'
import {
	IconButton,
	MenuItem,
	Select,
	makeStyles,
	Button,
	CircularProgress
} from '@material-ui/core'
import LineGraph from './LineGraph'
import _map from 'lodash/map'
import { restructureData } from '../../../utils/graph-utils'
import { updateUserProfile } from '../../../services/services'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useSelectStyles = makeStyles(() => ({
	root: {
		color: 'white'
	},
	icon: {
		color: 'white'
	}
}))
const useMenuStyles = makeStyles(() => ({
	paper: {
		backgroundColor: '#1a1e22',
		color: 'lightgray'
	}
}))

function DataVisualisationPage({ user }) {
	const selectClasses = useSelectStyles()
	const selectMenu = useMenuStyles()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(0)
	const [addLoading, setAddLoading] = useState(false)
	const [graphSnapshot, setSnapshot] = useState(null)
	const [preference, setPreference] = useState(1)
	const [dataset, setDataset] = React.useState(null)
	const [graphData, setData] = React.useState(null)
	const [modalState, setModalState] = useState(false)

	const notify = () => {
		toast.success('Graph added to your collection !', {
			position: toast.POSITION.TOP_RIGHT
		})
	}

	const generateGraph = React.useCallback(() => {
		setLoading(() => 1)
		const restructuredData = restructureData(dataset, preference)
		setData(() => restructuredData)
		setLoading(() => 2)
	}, [dataset, setLoading, preference])

	const onClickUpload = React.useCallback(
		(data, fileInfo) => {
			setDataset({ data: data, info: fileInfo })
			setModalState(() => true)
		},
		[setDataset, setModalState]
	)

	const addToCollection = React.useCallback(async () => {
		setAddLoading(true)
		const { savedPlots } = user
		const updatedImages = [
			...savedPlots,
			{ imageURL: graphSnapshot, createDate: Date.now() }
		]
		const updatedUser = { ...user, savedPlots: updatedImages }
		await updateUserProfile(updatedUser)
		dispatch(setUser({ user: updatedUser }))
		setAddLoading(false)
		notify()
	}, [dispatch, user, graphSnapshot, setAddLoading])

	const onClose = () => {
		setModalState(false)
		setDataset(null)
		setLoading(0)
		setData(null)
		setSnapshot(null)
	}

	return (
		<div className='page'>
			<h1>Welcome to Data Visualisation page</h1>
			<div className='tutorial__list'>
				<div className='Report_Boxes'>
					<h2>Upload Data</h2>
					<CSVReader
						label={'Upload data as CSV'}
						accept={'text/csv'}
						onFileLoaded={onClickUpload}
					/>
				</div>
			</div>
			<h2>Your Collection of Plots</h2>
			<div className='plots__dashboard'>
				{_map(user?.savedPlots, (item, index) => (
					<div key={index} className='plot'>
						<div
							className='background-chart'
							style={{ backgroundColor: 'white' }}
						>
							<img src={item.imageURL} alt='' />
						</div>
						<h2>Figure {index + 1}</h2>
						<p>{new Date(item.createDate).toString().slice(0, 24)}</p>
					</div>
				))}
				<ModalWrapper openModal={modalState}>
					<div className={'graph-options'}>
						<div className={'options-head'}>
							<h2>Choose a function to visualise</h2>
							<IconButton className='close-modal' onClick={onClose}>
								<Close className='close-modal' />
							</IconButton>
						</div>
						<h3>File name : {dataset?.info.name}</h3>
						<div style={{ marginTop: 10, width: '100%', display: 'flex' }}>
							<Select
								fullWidth
								classes={selectClasses}
								label='Function'
								variant='outlined'
								MenuProps={{ classes: selectMenu }}
								defaultValue={1}
								onChange={({ target: { value } }) => setPreference(value)}
							>
								<MenuItem value={1}>Fx(1)</MenuItem>
								<MenuItem value={2}>Fx(2)</MenuItem>
								<MenuItem value={3}>Fx(3)</MenuItem>
							</Select>
							<Button id='generate' onClick={generateGraph}>
								Generate
							</Button>
						</div>
						<div className={'graph-area'}>
							{loading === 1 ? (
								<CircularProgress style={{ margin: 'auto', color: 'white' }} />
							) : loading === 2 ? (
								<LineGraph dataset={graphData} setImage={setSnapshot} />
							) : null}
						</div>
						{loading === 2 && (
							<Button
								id='collectionButton'
								onClick={addToCollection}
								disabled={graphSnapshot === null}
							>
								{graphSnapshot === null || addLoading ? (
									<CircularProgress
										style={{ margin: 'auto', color: 'white' }}
									/>
								) : (
									'Add to your collection'
								)}
							</Button>
						)}
					</div>
				</ModalWrapper>
			</div>
			<ToastContainer />
		</div>
	)
}

export default DataVisualisationPage
