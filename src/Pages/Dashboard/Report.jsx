import { Close } from '@material-ui/icons'
import React from 'react'
import plot_img from './sample_plot.png'
import './Report.css'


function Report({func}) {
    return (
        <div class="report__page">
            <Close onClick={()=>{
                func(false);
            }} style={{
                position: 'fixed',
                top: 10,
                right: 10,
                fontSize: 50,
                color: 'gray',
                cursor: 'pointer',
            }} />
            <div class="recent__plots">
                <h2 className="header__side">Generated Plots</h2>
                {
                    Array(5).fill().map((_, i) => (
                        <div key={i} class="plot" id="plot__side">
                            <img src={plot_img} alt="" />
                            <h2>Figure {i+1}</h2>
                            <p>Figure name goes here</p>
                        </div>
                    ))
                }
            </div>
            <div class="paper__show">
                {
                    Array(2).fill().map((_, i) => (
                        <div class="a4-sheet">
                            <h2>Paper sheet {i + 1}</h2>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Report
