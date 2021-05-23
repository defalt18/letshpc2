import React from 'react'
import './Dashboard.css'

function Dashboard() {

    const [page, setpage] = React.useState(0);

    return (
        <div class="dashboard__home">
            <div class="sidebar">
                <h2>Dashboard</h2>
                <h3 style={{color:`${page===0 ? "white" : "lightgray" }`}} onClick={()=>setpage(0)}>Tutorials</h3>
                <h3 style={{color:`${page===1 ? "white" : "lightgray" }`}} onClick={()=>setpage(1)}>Report Generation</h3>
                <h3 style={{color:`${page===2 ? "white" : "lightgray" }`}} onClick={()=>setpage(2)}>Data Visualisation</h3>
                <h3 style={{color:`${page===3 ? "white" : "lightgray" }`}} onClick={()=>setpage(3)}>Profile</h3>
                <h3>Logout</h3>
            </div>
            {
                page===0 ? <div class="page">This is Tutorials Page</div>:<></>
            }
            {
                page===1 ? <div class="page">This is Report Generation Page</div>:<></>
            }
            {
                page===2 ? <div class="page">This is Data Visualisation Page</div>:<></>
            }
            {
                page===3 ? <div class="page">This is Data Profile Page</div>:<></>
            }
        </div>
    )
}

export default Dashboard
