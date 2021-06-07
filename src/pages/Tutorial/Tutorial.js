import React from 'react'
import './tut.css'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Chip from '@material-ui/core/Chip'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { IconButton } from '@material-ui/core'
import SshModal from '../../components/Modal/SshModal'
import { useHistory } from 'react-router-dom'

function Tutorial() {
	const history = useHistory()
	return (
		<div className='tutorials__page'>
			<div className='tut__head'>
				<IconButton
					onClick={() => history.goBack()}
					aria-label='back'
					style={{ color: 'white' }}
				>
					<ArrowBackIcon />
				</IconButton>
				<h2>Simple Thread Exercise</h2>
				<Chip
					variant='outlined'
					size='small'
					label='Beginner'
					style={{ color: 'green', borderColor: 'green' }}
				/>
			</div>
			<div className='content__window'>
				<h1># Simple Thread Exercise</h1>
				<div className='topic__desc'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
					praesentium blanditiis beatae sapiente voluptas, expedita laudantium
					voluptatibus, sed quisquam consequuntur officia, maiores sequi! Quo
					nostrum quia reiciendis repellendus laudantium commodi.
					<br />
					<br />
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
					distinctio placeat consequuntur doloremque ratione repellat possimus
					reiciendis esse expedita maiores quas eos rerum nisi, adipisci vero,
					nostrum dolorum sit voluptatum.
				</div>
				<div className='codeboxes'>
					<div className='samp'>
						<h3 style={{ color: 'white' }}>> Sample Code</h3>
						<ButtonGroup style={{ position: 'absolute', right: '10px' }}>
							<Button
								onClick={() => {
									document.getElementById('output').style.display = 'block'
								}}
								style={{
									textTransform: 'capitalize',
									background: 'darkgreen',
									color: 'white',
									margin: '0',
								}}
							>
								Run
							</Button>
							<Button
								style={{
									textTransform: 'capitalize',
									background: 'black',
									padding: 0,
									color: 'white',
									margin: '0',
								}}
							>
								<SshModal background='black' textcolor='white' OS='mac' />
							</Button>
						</ButtonGroup>
					</div>
					#include <span>{'<'}</span>omp.h<span>{'>'}</span>
					<br></br>
					#include <span>{'<'}</span>stdio.h<span>{'>'}</span>
					<br></br>
					int main()
					<br /> <span>{'{'}</span>
					<br></br>
					#pragma omp parallel<br></br>
					printf("Hello from thread %d, nthreads %d\n", omp_get_thread_num(),
					omp_get_num_threads());<br></br>
					<span>{'}'}</span>
				</div>
				<div
					id='output'
					className='codeboxes'
					style={{ display: 'none', margin: '20px 0' }}
				>
					<h3 style={{ color: 'white', margin: '10px 0' }}>Output</h3>
					<p>Hello from thread 0, nthreads 4</p>
					<p>Hello from thread 2, nthreads 4</p>
					<p>Hello from thread 3, nthreads 4</p>
					<p>Hello from thread 1, nthreads 4</p>
				</div>
				<div className='topic__desc'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
						fugiat tenetur nisi ducimus exercitationem a quasi similique
						temporibus quibusdam.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Tutorial
