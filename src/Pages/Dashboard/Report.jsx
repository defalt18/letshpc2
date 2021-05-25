import { Close } from '@material-ui/icons'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save';
import plot_img from './sample_plot.png'
import { IconButton } from '@material-ui/core'
import './Report.css'


function Report({func}) {

    const [Class, setClass] = React.useState("report__page");

    return (
        <div class={Class}>
            <IconButton id="close_icon" onClick={()=>{
                setClass("report__page__down")
                setTimeout(() => {func(false);}, 500);
            }} >
                <SaveIcon />
            </IconButton>
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
