import React from 'react'
import Button from '@material-ui/core/Button';
import './Home.css'
import macos from './MacOS_logo.png'
import winlogo from './windows-logo-social.png'
import linuxlogo from './linux.png'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import letshpc from '../../Letshpc.png'
import SSH_Modal from '../../Components/Modal/SSH_modal'
import Mac_tut from './Mac_tut.gif'
import Linux_tut from './Linux_tut.mp4'
import ReactPlayer from 'react-player'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

function Home() {

    const [win, setwin] = React.useState(-1);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <div
                style=
                {{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100vw', minHeight: '100vh',
                    background: "black", color: "white",
                }}>
                <img src={letshpc} alt="Lets HPC 2.0" height="200px" width="200px" />
                <h1>Choose Your Operating System</h1>
                <div className="OS">
                    <Button
                        href="/#mac"
                        onClick={() => { setwin(1); }}
                        style={{
                            textTransform: 'capitalize',
                            border: 'none',
                            fontSize: 'large',
                            padding: '5px',
                            width: '10vw',
                            background: 'linear-gradient(180deg, white, #fcfcfc, #f5f5f5)'
                        }} >
                        Mac OS
                    </Button>
                    <Button
                        href="/#windows"
                        onClick={() => { setwin(2); }}
                        style={{
                            textTransform: 'capitalize',
                            border: 'none',
                            fontSize: 'large',
                            padding: '5px',
                            width: '10vw',
                            background: 'linear-gradient(180deg, white, #fcfcfc, #f5f5f5)'
                        }}>
                        Windows
                    </Button>
                    <Button
                        href="/#linux"
                        onClick={() => { setwin(3); }}
                        style={{
                            textTransform: 'capitalize',
                            border: 'none',
                            fontSize: 'large',
                            padding: '5px',
                            width: '10vw',
                            background: 'linear-gradient(180deg, white, #fcfcfc, #f5f5f5)'
                        }}>
                        Linux
                    </Button>
                </div>
            </div>
            {
                win === 1 ? (<>
                    <div id="mac">
                        <div className="mannual_data">
                            <h1 className="heading" style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <IconButton className="back__but__title" href="/" aria-label="back" style={{ color: 'black', background: "white", padding: 0 }}><ArrowBackIcon style={{ fontSize: '35px' }} /></IconButton>
                                <img src={macos} alt="" width="50px" height="50px" />
                                <p>MacOS Systems</p>
                            </h1>
                            <div className="open">
                                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                                <SSH_Modal textcolor="white" background="rgb(0,150,255)" OS="mac" />
                            </div>
                            <hr></hr>
                            <p>
                                <ol className="mannual_points">
                                    <li>
                                        Head on to "System Preferences" > "Sharing".
                            </li>
                                    <li>
                                        Check "Remote Login" in the list of services on the left.
                            </li>
                                    <li>
                                        Note down the Username and IP Address
                                <p style={{ margin: '10px 0' }}>It shall be displayed in this fashion</p>
                                        <b>username@IP</b>
                                        <p style={{ margin: '10px 0' }}>For e.g. mark@192.168.0.145</p>
                                    </li>
                                    <li>
                                        You are good to go 👍🏽
                                <p style={{ margin: '10px 0' }}>
                                            Just hit the <b>Open SSH</b> button on the top of this manual
                                </p>
                                    </li>
                                </ol>
                                <p style={{ margin: '50px 10%' }}><i>Note: The latest M1 chips are not supported yet!</i></p>
                            </p>
                        </div>
                        <div className="demo">
                            <h1>Video Tutorial</h1>
                            <div className="box" style={{ background: `url(${Mac_tut})`, backgroundPosition: 'center', border: 'none' }}></div>
                            <div>
                                <p>Make sure any firewalls aren't obstructing the network</p>
                            </div>
                        </div>
                    </div></>) : (<></>)
            }
            {
                win === 2 ? (<>
                    <div id="windows">
                        <div className="mannual_data">
                            <h1 className="heading" style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <IconButton className="back__but__title" href="/" aria-label="back" style={{ color: 'white', background: "rgb(23,23,23)", padding: 0 }}><ArrowBackIcon style={{ fontSize: '35px' }} /></IconButton>
                                <img src={winlogo} alt="" width="50px" height="50px" />
                                <p>Windows Systems</p>
                            </h1>
                            <div className="open">
                                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                                <SSH_Modal textcolor="black" background="white" OS="windows" />
                            </div>
                            <hr></hr>
                            <p>
                                <ol className="mannual_points">
                                    <li>
                                        Head over to Settings > Apps > Optional Features
                            </li>
                                    <li>
                                        Hit "Add a Feature" if you don't see OpenSSH in the feature list.
                            </li>
                                    <li>
                                        Search the "OpenSSH Server" in the list and hit Install.
                            </li>
                                    <li>
                                        After installation, open up Powershell and type in
                                        <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>StartService sshd</p>
                                    </li>
                                    <li>
                                        You are good to go 👍🏽
                                <p style={{ margin: '10px 0' }}>
                                            Just hit the <b>Open SSH</b> button on the top of this manual
                                </p>
                                    </li>
                                </ol>
                            </p>
                        </div>
                        <div className="demo">
                            <div className="box" style={{ borderColor: 'white' }}>
                                <PlayCircleFilledIcon style={{ fontSize: '70px' }} />
                                <p style={{ fontSize: '30px' }}>Setup Video Coming Soon!</p>
                            </div>
                        </div>
                    </div>
                </>) : (<></>)
            }
            {
                win === 3 ? (<>
                    <div id="linux">
                        <div className="mannual_data">
                            <h1 className="heading" style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <IconButton className="back__but__title" href="/" aria-label="back" style={{ color: 'orange', background: "transparent", padding: 0 }}><ArrowBackIcon style={{ fontSize: '35px' }} /></IconButton>
                                <img src={linuxlogo} alt="" width="50px" height="50px" />
                                <p>Linux Systems</p>
                            </h1>
                            <div className="open">
                                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                                <SSH_Modal textcolor="white" background="orange" OS="linux" />
                            </div>
                            <hr></hr>
                            <p>
                                <ol className="mannual_points">
                                    <li>
                                        Head on to your local terminal
                            </li>
                                    <li>
                                        Put in the following command to setup openssh server
                                <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>sudo apt install openssh-server</p>
                                    </li>
                                    <li>
                                        Check to see if the setup has been successfull using
                                <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>sudo systemctl status ssh</p>
                                        <p style={{ margin: '10px 0' }}>it should say <b>"active(running)"</b></p>
                                    </li>
                                    <li>
                                        Now to find your ip. Type in the following command and check the address under inet6 (not 127.0.0.1)
                                <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>ifconfig -a</p>
                                    </li>
                                    <li>
                                        Note down your IP and username
                            </li>
                                    <li>
                                        You are good to go 👍🏽
                                <p style={{ margin: '10px 0' }}>
                                            Just hit the <b>Open SSH</b> button on the top of this manual
                                </p>
                                    </li>
                                </ol>
                            </p>
                        </div>
                        <div className="demo">
                            <div className="box" style={{ borderColor: 'white', height: "auto", width: "auto", border: 'none' }}>
                                <ReactPlayer url={Linux_tut} loop playing height="100%" width="100%" muted />
                            </div>
                        </div>
                    </div></>) : (<></>)
            }

        </div>
    )
}

export default Home
