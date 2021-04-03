import React from 'react'
import "./SSH.css"
import Boxes from './Boxes'
import Run_Boxes from './Run_boxes'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

function SSH(props) {

    let string = "chrome-extension://iodihamcpbpeioajjeobimgagajmlibd/html/nassh.html#" + props.match.params.username.toString() + "@127.0.0.1";
    return (
        <div style={{ display: 'flex', height: '100vh', minWidth: '100vw', overflow: 'auto' }}>
            <div className="intructions">
                <div style={{ position: 'sticky', top: 0, background: 'white' ,zIndex:2000, boxShadow:'0 0 5px 0 rgba(0,0,0,0.75)'}}>
                    <h1 style={{ padding: '15px 30px' , display:'flex', justifyContent:'space-between', alignItems:'center'}}><g># Topic 1</g><IconButton href="/" aria-label="back" color="primary" ><ArrowBackIcon/></IconButton></h1>
                    <h2 style={{ padding: '15px 30px' }}>Steps</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ margin: "30px" }}>
                        <Boxes OS= {props.match.params.OS}/>
                    </div>
                    <h3 style={{ margin: '0px 30px' }}>Sample Code</h3>
                    <div className="inst">
                        <div className="codesss" ng-non-bindable>
                            #include <span>{'<'}</span>omp.h<span>{'>'}</span><br></br>
                        #include <span>{'<'}</span>stdio.h<span>{'>'}</span><br></br>
                        int main()<br/> <span>{'{'}</span><br></br>
                        #pragma omp parallel<br></br>
                        printf("Hello from thread %d, nthreads %d\n", omp_get_thread_num(), omp_get_num_threads());<br></br>
                            <span>{'}'}</span>
                        </div>
                    </div>
                    <div style={{ margin: "30px" }}>
                        <Run_Boxes OS= {props.match.params.OS}/>
                    </div>
                </div>
            </div>
            <iframe className="ssh" title="SSH Shell"
                src={string}
                frameborder="0"></iframe>
        </div>
    )
}

export default SSH
