import React from 'react'
import { Line } from 'react-chartjs-2'

const graphOptions = {
	xAxisId: 'Problem Set Size',
	yAxisId: 'myScale',
	scales: {
		myScale: {
			type: 'logarithmic',
			title: {
				display: true,
				text: 'Execution Time (Logarithmic)'
			},
			position: 'left'
		},
		'Problem Set Size': {
			title: {
				display: true,
				text: 'Problem set size'
			},
			position: 'bottom'
		}
	},
	maintainAspectRatio: false,
	plugins: [
		{
			title: {
				text: 'Test chart',
				display: true,
				font: { size: 20 }
			}
		}
	]
}

const CreateLineGraph = ({ dataset, setImage }) => {
	let ref = undefined

	return (
		<Line
			id={'chart'}
			data={dataset}
			ref={(element) => {
				ref = element
			}}
			height='100%'
			options={{
				...graphOptions,
				animation: {
					onComplete: () => setImage(ref.toBase64Image())
				}
			}}
		/>
	)
}

export default CreateLineGraph
