import React from 'react'
import './Dashboard.css'
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom'

function Dashboard() {

    const [page, setpage] = React.useState(0);

    return (
        <div class="dashboard__home">
            <div class="sidebar">
                <h2>Dashboard</h2>
                <h3 style={{ color: `${page === 0 ? "white" : "lightgray"}` }} onClick={() => setpage(0)}>Tutorials</h3>
                <h3 style={{ color: `${page === 1 ? "white" : "lightgray"}` }} onClick={() => setpage(1)}>Report Generation</h3>
                <h3 style={{ color: `${page === 2 ? "white" : "lightgray"}` }} onClick={() => setpage(2)}>Data Visualisation</h3>
                <h3 style={{ color: `${page === 3 ? "white" : "lightgray"}` }} onClick={() => setpage(3)}>Profile</h3>
                <h3><a href="/" style={{textDecoration:'none', color:"lightgray"}}>Logout</a></h3>
            </div>
            {
                page === 0 ?
                <div class="page">
                    <h2>This is Tutorials Page</h2>
                    <div class="tutorial__list">
                    {
                        Array(5).fill().map((_, i) => (
                            <div class="tutorial__item">
                                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                <h3>Topic Name</h3>
                                <Chip variant="outlined" size="small" label="Beginner" style={{ color: 'green', borderColor: 'green' }} />
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
                page === 1 ? <div class="page">This is Report Generation Page</div> : <></>
            }
            {
                page === 2 ? <div class="page">This is Data Visualisation Page</div> : <></>
            }
            {
                page === 3 ? <div class="page">This is Data Profile Page</div> : <></>
            }
        </div>
    )
}

export default Dashboard
