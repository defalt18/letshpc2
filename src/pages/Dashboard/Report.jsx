import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import plot_img from './sample_plot.png'
import { IconButton } from '@material-ui/core'
import './Report.css'
import _map from 'lodash/map'

function Report({ func }) {
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
				{_map(Array(5).fill(plot_img), (_, i) => (
					<div
						key={i}
						onClick={() => {
							setImages([...Images, plot_img])
						}}
						class='plot'
						id='plot__side'
					>
						<img src={_} alt='' />
						<h2>Figure {i + 1}</h2>
						<p>Figure name goes here</p>
					</div>
				))}
			</div>
			<div class='paper__show'>
				{Array(2)
					.fill()
					.map((_, i) => (
						<div class='a4-sheet'>
							<h2>
								Lets HPC Question Bank <br /> DAIICT
							</h2>
							{_map(Images, (img, index) => (
								<img key={index} src={img} alt='' class='report__images' />
							))}
						</div>
					))}
			</div>
		</div>
	)
}

export default React.memo(Report)
