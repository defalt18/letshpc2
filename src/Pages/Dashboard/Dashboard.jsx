import React from 'react'
import './Dashboard.css'
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import plot_img from './sample_plot.png'
import Button from '@material-ui/core/Button';
import avatar_dummy from './avatar_yello.png'
import Report from './Report'

function Dashboard() {

    const [page, setpage] = React.useState(0);
    const [doc, setDoc] = React.useState(false);

    return (
        <div class="dashboard__home">
            <div class="sidebar">
                <h2>Dashboard</h2>
                <h3 style={{ color: `${page === 0 ? "white" : "gray"}` }} onClick={() => setpage(0)}>Tutorials</h3>
                <h3 style={{ color: `${page === 1 ? "white" : "gray"}` }} onClick={() => setpage(1)}>Report Generation</h3>
                <h3 style={{ color: `${page === 2 ? "white" : "gray"}` }} onClick={() => setpage(2)}>Data Visualisation</h3>
                <h3 style={{ color: `${page === 3 ? "white" : "gray"}` }} onClick={() => setpage(3)}>Profile</h3>
                <h3><a href="/" style={{ textDecoration: 'none', color: "gray" }}>Logout</a></h3>
            </div>
            {
                page === 0 ?
                    <div class="page">
                        <h2>This is Tutorials Page</h2>
                        <div class="tutorial__list">
                            {
                                Array(5).fill().map((_, i) => (
                                    <div class="tutorial__item">
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <h3>Topic Name</h3>
                                            <Chip variant="outlined" size="small" label="Beginner" style={{ color: 'green', borderColor: 'green' }} />
                                            <p style={{marginLeft:'auto', color:'lightgreen', cursor:'pointer'}}>Mark as Read</p>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero autem aperiam et! Repellat minus, omnis earum maxime totam cupiditate sint exercitationem tempora ipsam mollitia id officia qui commodi quo maiores dolores aliquam,
                                            similique cum dolorum pariatur, suscipit quibusdam voluptate? Eaque ex nisi alias error earum explicabo nobis praesentium obcaecati consequuntur.</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : <></>
            }
            {
                page === 1 ?
                    <div class="page">
                        <h1>Welcome to Report Generation page</h1>
                        <div class="tutorial__list">
                            <div className="Report_Boxes">
                                <h2>Evaluation Status</h2>
                                <Chip variant="outlined" size="small" label="Pending" style={{ color: 'yellow', borderColor: 'yellow', background: 'rgba(255,255,0,0.1)' }} />
                            </div>
                            <div onClick={()=>setDoc(true)} className="Report_Boxes box_report">
                                <h2>Go to Report</h2>
                                <Chip variant="outlined" size="small" label="Pending" style={{ color: 'yellow', borderColor: 'yellow', background: 'rgba(255,255,0,0.1)' }} />
                            </div>
                        </div>
                        {doc && <Report func={setDoc}/>}
                    </div> : <></>
            }
            {
                page === 2 ? <div class="page">
                    <h1>Welcome to Data Visualisation page</h1>
                    <div class="tutorial__list">
                        <div className="Report_Boxes">
                            <h2>Upload Data</h2>
                            <Button style={{ background: 'rgb(0,150,255)', color: 'white' }}>
                                Upload data as CSV
                            </Button>
                        </div>
                    </div>
                    <h2>Recently Generated Plots</h2>
                    <div class="plots__dashboard">
                        {
                            Array(5).fill().map((_, i) => (
                                <div key={i} className="plot">
                                    <img src={plot_img} alt="" />
                                    <h2>Figure {i+1}</h2>
                                    <p>Figure name goes here</p>
                                </div>
                            ))
                        }
                    </div>

                </div> : <></>
            }
            {
                page === 3 ? <div class="page">
                    <h1>User Profile</h1>
                    <div className="tutorial__list">
                        <div className="profile__item">
                            <div class="desc__profile">
                                <div className="info">
                                    <h3>Name :</h3>
                                    <p>John Doe</p>
                                    <Chip variant="outlined" size="small" label="Student" style={{ color: 'rgb(0,150,255)', borderColor: 'rgb(0,150,255)' }} />
                                </div>
                                <div className="info">
                                    <h3>Email :</h3>
                                    <p>JohnDoe@gmail.com</p>
                                </div>
                                <div className="info">
                                    <h3>Student ID :</h3>
                                    <p>201xxxxxx</p>
                                </div>
                                <div class="bio">
                                    <h3>Bio</h3>
                                    <p>I am a ICT with Minors in CS student</p>
                                </div>
                            </div>
                            <div class="profile__right">
                            <Avatar src={avatar_dummy} alt="K" style={{height:200,width:200}}/>
                            </div>
                        </div>
                    </div>
                </div> : <></>
            }
        </div>
    )
}

export default Dashboard
