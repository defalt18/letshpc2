import React from 'react'
import _map from 'lodash/map'

function AdminHome({ user }) {
	return (
		<div className='admin__content'>
			<h1>
				Hello Professor {user?.firstName} {user?.lastName}
			</h1>
			<div className='stats'>
				<div className='stat__boxes'>
					<p>Total students signed up </p>
					<h1>22</h1>
				</div>
				<div className='stat__boxes'>
					<p>Total tutorials</p>
					<h1>54</h1>
				</div>
			</div>
			<h2 style={{ marginBottom: 30 }}>Student Doubts</h2>
			{_map(Array(3), (_, index) => (
				<div key={index} className='profile__item' style={{ marginBottom: 15 }}>
					<h3>Question</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
						eaque, eligendi fugiat harum itaque odit placeat vel voluptatum?
						Aliquam at blanditiis dolor earum esse fuga fugiat inventore iusto
						optio voluptatum!
					</p>
				</div>
			))}
		</div>
	)
}

export default React.memo(AdminHome)
