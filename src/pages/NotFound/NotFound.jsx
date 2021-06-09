import React from 'react'
import Notfound from '../../404.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'

const styles = {
	page: {
		display: 'flex',
		height: '100vh',
		background: 'black'
	},
	image: {
		width: '70%',
		objectFit: 'contain',
		alignSelf: 'flex-start',
		margin: '0 auto'
	},
	icon: {
		color: 'white',
		position: 'absolute',
		top: 20,
		left: 20,
		cursor: 'pointer'
	}
}

function NotFound() {
	const history = useHistory()
	return (
		<div style={styles.page}>
			<ArrowBackIcon onClick={() => history.push('/')} style={styles.icon} />
			<img src={Notfound} alt={'Not Found'} style={styles.image} />
		</div>
	)
}

export default NotFound
