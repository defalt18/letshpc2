import React from 'react'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Chip from '@material-ui/core/Chip';

function Concept() {
    return (
        <Link to='/tutorials' style={{textDecoration:'none',color:'white'}}>
        <div className="concept__box">
                <h2 style={{color:'rgba(0,150,255)'}}>Topic Name</h2>
                <Chip variant="outlined" size="small" label="Beginner" style={{ color: 'green', borderColor: 'green' ,maxWidth:'90px'}} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio architecto ratione accusantium voluptates, nam itaque?</p>
                <Button style={{
                    textTransform: 'capitalize',
                    color: 'white',
                    background: 'green'
                }}>
                    Go to tutorial
                </Button>
        </div>
        </Link>
    )
}

export default Concept
