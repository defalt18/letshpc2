import React from 'react'
import _map from 'lodash/map'

function Page({ images }) {
	return (
		<div className='a4-sheet'>
			<h2>
				Lets HPC Question Bank <br /> DAIICT
			</h2>
			{_map(images, (img, index) => (
				<img key={index} src={img} alt='' className='report__images' />
			))}
		</div>
	)
}

export default React.memo(Page)
