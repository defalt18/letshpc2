import React from 'react'
import Button from '@material-ui/core/Button'
import './Home.css'
import macos from './MacOS_logo.png'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import winlogo from './windows-logo-social.png'
import linuxlogo from './linux.png'
import letshpc from '../../Letshpc.png'
import sshModal from '../../components/Modal/SshModal'
import Mac_tut from './Mac_tut.gif'
import Linux_tut from './Linux_tut2.mp4'
import win_tut from './win_tut.mp4'
import _map from 'lodash/map'
import Linux from './linux.svg'
import windows from './windows.svg'
import AppleIcon from '@material-ui/icons/Apple'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ReactPlayer from 'react-player'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { IconButton } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Concept from './Concept Matter/Concept'
import { Link } from 'react-router-dom'

export function DisabledTabs({ func, func2 }) {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		func(newValue)
		if (newValue === 1) func2(-1)
		setValue(newValue)
	}

	return (
		<Paper
			square
			style={{
				background: 'transparent',
				color: 'white',
				position: 'absolute',
				top: '10%',
				left: '50%',
				transform: 'translate(-50%,0)',
				width: 'auto',
			}}
		>
			<Tabs
				TabIndicatorProps={{ style: { background: 'white' } }}
				value={value}
				onChange={handleChange}
				style={{ color: 'white' }}
			>
				<Tab label='SSH' />
				<Tab label='Tutorials' />
			</Tabs>
		</Paper>
	)
}

export default function Home() {
	const [win, setwin] = React.useState(-1)
	const [tut, setut] = React.useState(0)

	return (
		<div style={{ overflowX: 'hidden' }}>
			<Link to='/login'>
				<Button
					style={{
						position: 'absolute',
						top: 20,
						right: 20,
						color: 'black',
						background: 'white',
					}}
				>
					Login
				</Button>
			</Link>
			<DisabledTabs func={setut} func2={setwin} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '5vh',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100vw',
					minHeight: '100vh',
					background: 'black',
					color: 'white',
				}}
			>
				<img src={letshpc} alt='Lets HPC 2.0' height='200px' width='200px' />
				{tut === 1 ? (
					<>
						<h1>Tutorials</h1>
						<p style={{ textAlign: 'center', marginBottom: '10px' }}>
							A couple of tutorials based on the elementary concepts of HPC
							<br /> to build a greater understanding about the subject.
						</p>
						<div class='arrow bounce'>
							<a href='#tut'>
								<ArrowDownwardIcon fontSize='large' />
							</a>
						</div>
					</>
				) : (
					<>
						<h1>Choose Your Operating System</h1>
						<ButtonGroup variant='contained' style={{ color: 'black' }}>
							<Button
								href='/#mac'
								onClick={() => {
									setwin(1)
								}}
								style={{
									textTransform: 'capitalize',
									fontSize: 'large',
									width: '10vw',
									color: 'white',
									background: 'transparent',
								}}
								startIcon={<AppleIcon style={{ fontSize: '35px' }} />}
							>
								Mac OS
							</Button>
							<Button
								href='/#windows'
								onClick={() => {
									setwin(2)
								}}
								style={{
									textTransform: 'capitalize',
									color: 'white',
									fontSize: 'large',
									width: '13vw',
									background: 'transparent',
								}}
								startIcon={<img src={windows} alt='windows' height='35px' />}
							>
								Windows
							</Button>
							<Button
								href='/#linux'
								onClick={() => {
									setwin(3)
								}}
								style={{
									textTransform: 'capitalize',
									color: 'white',
									fontSize: 'large',
									width: '10vw',
									background: 'transparent',
								}}
								startIcon={<img src={Linux} alt='Linux' height='35px' />}
							>
								Linux
							</Button>
						</ButtonGroup>
					</>
				)}
			</div>
			{win === 1 ? (
				<>
					<div id='mac'>
						<div className='mannual_data'>
							<h1
								className='heading'
								style={{
									padding: '3% 5%',
									paddingTop: '3%',
									display: 'flex',
									gap: '20px',
									alignItems: 'center',
								}}
							>
								<IconButton
									className='back__but__title'
									href='/'
									aria-label='back'
									style={{ color: 'black', background: 'white', padding: 0 }}
								>
									<ArrowBackIcon style={{ fontSize: '35px' }} />
								</IconButton>
								<img src={macos} alt='' width='50px' height='50px' />
								<p>MacOS Systems</p>
							</h1>
							<div className='open'>
								<h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
								<sshModal
									textcolor='white'
									background='rgb(0,150,255)'
									OS='mac'
								/>
							</div>
							<hr></hr>
							<p>
								<ol className='mannual_points'>
									<li>Head on to "System Preferences" > "Sharing".</li>
									<li>
										Check "Remote Login" in the list of services on the left.
									</li>
									<li>
										Note down the Username
										<p style={{ margin: '10px 0' }}>
											It shall be displayed in this fashion
										</p>
										<b>username@IP</b>
										<p style={{ margin: '10px 0' }}>
											For e.g. mark@192.168.0.145
										</p>
									</li>
									<li>
										You are good to go 👍🏽
										<p style={{ margin: '10px 0' }}>
											Just hit the <b>Open SSH</b> button on the top of this
											manual
										</p>
									</li>
								</ol>
								<p style={{ margin: '50px 10%' }}>
									<i>Note: The latest M1 chips are not supported yet!</i>
								</p>
							</p>
						</div>
						<div className='demo'>
							<h1>Video Tutorial</h1>
							<div
								className='box'
								style={{
									background: `url(${Mac_tut})`,
									backgroundPosition: 'center',
									border: 'none',
								}}
							></div>
							<div>
								<p>Make sure any firewalls aren't obstructing the network</p>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
			{win === 2 ? (
				<>
					<div id='windows'>
						<div className='mannual_data'>
							<h1
								className='heading'
								style={{
									padding: '3% 5%',
									paddingTop: '3%',
									display: 'flex',
									gap: '20px',
									alignItems: 'center',
								}}
							>
								<IconButton
									className='back__but__title'
									href='/'
									aria-label='back'
									style={{
										color: 'white',
										background: 'rgb(23,23,23)',
										padding: 0,
									}}
								>
									<ArrowBackIcon style={{ fontSize: '35px' }} />
								</IconButton>
								<img src={winlogo} alt='' width='50px' height='50px' />
								<p>Windows Systems</p>
							</h1>
							<div className='open'>
								<h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
								<sshModal textcolor='black' background='white' OS='windows' />
							</div>
							<hr></hr>
							<p>
								<ol className='mannual_points'>
									<li>Head over to Settings > Apps > Optional Features</li>
									<li>
										Hit "Add a Feature" if you don't see OpenSSH in the feature
										list.
									</li>
									<li>
										Search the "OpenSSH Server" in the list and hit Install.
									</li>
									<li>
										After installation, open up Powershell and type in
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											Start-Service sshd
										</p>
									</li>
									<li>
										You are good to go 👍🏽
										<p style={{ margin: '10px 0' }}>
											Just hit the <b>Open SSH</b> button on the top of this
											manual
										</p>
									</li>
									<p>
										------<b>Optional</b> but recommended steps---------
									</p>
									<li>
										To ensure working, type in the following :
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											Set-Service -Name sshd -StartupType 'Automatic'
										</p>
										Confirm if the rule is configured by executing
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											Get-NetFirewallRule -Name ssh
										</p>
										There should be a firewall rule named
										"OpenSSH-Server-In-TCP", <br />
										which should be enabled .
									</li>
									<li>
										If the firewall does not exist, create one
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH
											Server (sshd)' -Enabled True -Direction Inbound -Protocol
											TCP -Action Allow -LocalPort 22
										</p>
									</li>
								</ol>
							</p>
						</div>
						<div className='demo'>
							<div
								className='box'
								style={{
									borderColor: 'white',
									height: 'auto',
									width: '90%',
									border: 'none',
								}}
							>
								<ReactPlayer
									url={win_tut}
									loop
									playing
									height='100%'
									width='100%'
									muted
								/>
							</div>
							<h2>Windows Video Tutorial</h2>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
			{win === 3 ? (
				<>
					<div id='linux'>
						<div className='mannual_data'>
							<h1
								className='heading'
								style={{
									padding: '3% 5%',
									paddingTop: '3%',
									display: 'flex',
									gap: '20px',
									alignItems: 'center',
								}}
							>
								<IconButton
									className='back__but__title'
									href='/'
									aria-label='back'
									style={{
										color: 'orange',
										background: 'transparent',
										padding: 0,
									}}
								>
									<ArrowBackIcon style={{ fontSize: '35px' }} />
								</IconButton>
								<img src={linuxlogo} alt='' width='50px' height='50px' />
								<p>Linux Systems</p>
							</h1>
							<div className='open'>
								<h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
								<sshModal textcolor='white' background='orange' OS='linux' />
							</div>
							<hr></hr>
							<p>
								<ol className='mannual_points'>
									<li>Head on to your local terminal</li>
									<li>
										Put in the following command to setup openssh server
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											sudo apt install openssh-server
										</p>
									</li>
									<li>
										Check to see if the setup has been successfull using
										<p
											style={{
												margin: '10px 0',
												fontFamily: 'monospace',
												fontSize: '15px',
											}}
										>
											sudo systemctl status ssh
										</p>
										<p style={{ margin: '10px 0' }}>
											it should say <b>"active(running)"</b>
										</p>
									</li>
									{/* <li>
                                        Now to find your ip. Type in the following command and check the address under inet6 (not 127.0.0.1)
                                        <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>ifconfig -a</p>
                                        </li>
                                    */}
									<li>
										Note down your username mentioned on the start of any
										terminal command
									</li>
									<li>
										You are good to go 👍🏽
										<p style={{ margin: '10px 0' }}>
											Just hit the <b>Open SSH</b> button on the top of this
											manual
										</p>
									</li>
								</ol>
							</p>
						</div>
						<div className='demo'>
							<div
								className='box'
								style={{
									borderColor: 'white',
									height: 'auto',
									width: '90%',
									border: 'none',
								}}
							>
								<ReactPlayer
									url={Linux_tut}
									loop
									playing
									height='100%'
									width='100%'
									muted
								/>
							</div>
							<h2>Linux Video Tutorial</h2>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
			{tut ? (
				<div
					id='tut'
					style={{
						minHeight: '100vh',
						width: '100vw',
						overflow: 'auto',
						background: '#22272d',
						padding: '30px',
						color: 'white',
					}}
				>
					<h1>Tutorials</h1>
					<h2
						style={{
							margin: '40px 0',
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<LibraryBooksIcon fontSize='large' />
						<p>Concepts</p>
					</h2>
					<div className='concepts'>
						{_map(Array(10), () => (
							<Concept />
						))}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
