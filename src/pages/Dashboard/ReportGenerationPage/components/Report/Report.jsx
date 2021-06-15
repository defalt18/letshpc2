import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import { IconButton } from '@material-ui/core'
import './Report.css'
import _map from 'lodash/map'
import Page from './Page'

function Report({ user, func }) {
	const [Class, setClass] = React.useState('report__page')
	const [Images, setImages] = React.useState([])

	return (
		<div class={Class}>
			<IconButton
				id='close_icon'
				onClick={() => {
					setClass('report__page__down')
					setTimeout(() => {
						func(false)
					}, 500)
				}}
			>
				<SaveIcon />
			</IconButton>
			<div class='recent__plots'>
				<h2 className='header__side'>Generated Plots</h2>
				{_map(user?.savedPlots, (item, index) => (
					<div
						key={index}
						onClick={() => {
							setImages([...Images, item.image])
						}}
						class='plot'
						id='plot__side'
					>
						<img src={item.image} alt='' />
						<h2>Figure {index + 1}</h2>
						<p>Figure name goes here</p>
					</div>
				))}
			</div>
			<div class='paper__show'>
				{Array(2)
					.fill(0)
					.map((_, pageNumber) => (
						<Page key={pageNumber} images={Images} />
					))}
			</div>
		</div>
	)
}

export default React.memo(Report)
