import React from 'react'
import Button from '@material-ui/core/Button'
import plot_img from '../sample_plot.png'

function DataVisualisationPage(props) {
	return (
		<div className='page'>
			<h1>Welcome to Data Visualisation page</h1>
			<div className='tutorial__list'>
				<div className='Report_Boxes'>
					<h2>Upload Data</h2>
					<Button style={{ background: 'rgb(0,150,255)', color: 'white' }}>
						Upload data as CSV
					</Button>
				</div>
			</div>
			<h2>Recently Generated Plots</h2>
			<div className='plots__dashboard'>
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<div key={i} className='plot'>
							<img src={plot_img} alt='' />
							<h2>Figure {i + 1}</h2>
							<p>Figure name goes here</p>
						</div>
					))}
			</div>
		</div>
	)
}

export default DataVisualisationPage
