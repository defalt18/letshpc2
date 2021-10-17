import React from 'react';
import './SSH.css';
import Boxes from './Boxes';
import RunBoxes from './Run_Boxes';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

function SSH(props) {
  let string =
    'chrome-extension://iodihamcpbpeioajjeobimgagajmlibd/html/nassh.html#' +
    props.match.params.username.toString() +
    '@' +
    props.match.params.ip.toString();
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        minWidth: '100vw',
        overflow: 'auto',
      }}>
      <div className="intructions">
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            zIndex: 2000,
            boxShadow: '0 0 5px 0 rgba(0,0,0,0.75)',
          }}>
          <h1
            style={{
              padding: '15px 30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <g># Topic 1</g>
            <IconButton aria-label="back" color="primary" href="/">
              <ArrowBackIcon />
            </IconButton>
          </h1>
          <h2 style={{ padding: '15px 30px' }}>Steps</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '30px' }}>
            <Boxes OS={props.match.params.OS} />
          </div>
          <h3 style={{ margin: '0px 30px' }}>Sample Code</h3>
          <div className="inst">
            <div ng-non-bindable className="codesss">
              #include <span>{'<'}</span>omp.h<span>{'>'}</span>
              <br></br>
              #include <span>{'<'}</span>stdio.h<span>{'>'}</span>
              <br></br>
              int main()
              <br /> <span>{'{'}</span>
              <br></br>
              #pragma omp parallel<br></br>
              printf("Hello from thread %d, nthreads %d\n", omp_get_thread_num(),
              omp_get_num_threads());<br></br>
              <span>{'}'}</span>
            </div>
          </div>
          <div style={{ margin: '30px' }}>
            <RunBoxes OS={props.match.params.OS} />
          </div>
        </div>
      </div>
      <iframe className="ssh" frameborder="0" src={string} title="SSH Shell" />
    </div>
  );
}

export default SSH;
