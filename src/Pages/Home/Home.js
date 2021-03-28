import React from 'react'
import Button from '@material-ui/core/Button';
import './Home.css'
import macos from './MacOS_logo.png'
import winlogo from './windows-logo-social.png'
import linuxlogo from './linux.png'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import letshpc from '../../Letshpc.png'
import SSH_Modal from '../../Components/Modal/SSH_modal'
import Mac_tut from './Mac_tut.gif'

function Home() {

    const handleClick = (e) => {
        if (document.getElementById(e) !== null)
            document.getElementById(e).style.display = "flex";
    }

    return (
        <div style={{overflowX:'hidden'}}>
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
                        onClick={handleClick("mac")}
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
                        onClick={handleClick("windows")}
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
                        onClick={handleClick("linux")}
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
            <div id="mac">
                <div className="mannual_data">
                    <h1 style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={macos} alt="" width="50px" height="50px" />
                        <p>MacOS Systems</p>
                    </h1>
                    <div className="open">
                        <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                        <SSH_Modal textcolor="white" background="rgb(0,150,255)" />
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
            </div>
            <div id="windows">
                <div className="mannual_data">
                    <h1 style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={winlogo} alt="" width="50px" height="50px" />
                        <p>Windows Systems</p>
                    </h1>
                    <div className="open">
                        <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                        <SSH_Modal textcolor="black" background="white" />
                    </div>
                    <hr></hr>
                    <p>
                        <ol className="mannual_points">
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            <div id="linux">
                <div className="mannual_data">
                    {/* <Button
                        style={{ color: 'orange', fontWeight: 'bold', textTransform: "capitalize", margin: '1% 3%', padding: 0, marginBottom: '0', fontSize: "medium", display: "flex" }}
                    >
                        <ArrowBackIosIcon />
                         Back to choose OS
                         </Button> */}
                    <h1 style={{ padding: '3% 5%', paddingTop: '3%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={linuxlogo} alt="" width="50px" height="50px" />
                        <p>Linux Systems</p>
                    </h1>
                    <div className="open">
                        <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                        {/* <Link to="/ssh" style={{ textDecoration: "none" }}>
                            <Button style={{ textTransform: 'capitalize', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', padding: '7px', borderRadius: '7px' }}>Open SSH</Button>
                        </Link> */}
                        <SSH_Modal textcolor="white" background="orange" />
                    </div>
                    <hr></hr>
                    <p>
                        <ol className="mannual_points">
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
        </div>
    )
}

export default Home
