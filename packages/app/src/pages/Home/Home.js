import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './Home.css';
import macos from './home_assets/MacOS_logo.png';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import winlogo from './home_assets/windows-logo-social.png';
import linuxlogo from './home_assets/linux.png';
import letshpc from '../../assets/Letshpc.png';
import SshModal from '../../components/Modal/SshModal';
import Mac_tut from './home_assets/Mac_tut.gif';
import Linux_tut from './home_assets/Linux_tut2.mp4';
import win_tut from './home_assets/win_tut.mp4';
import _map from 'lodash/map';
import Linux from './home_assets/linux.svg';
import windows from './home_assets/windows.svg';
import AppleIcon from '@material-ui/icons/Apple';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ReactPlayer from 'react-player';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Avatar, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Concept from './Concept Matter/Concept';
import { Link, useHistory } from 'react-router-dom';
import { fetchAllTutorials, useUser } from '../../services/services';
import avatar from '../Dashboard/avatar_yello.png';

export function DisabledTabs({ func, func2 }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    func(newValue);
    if (newValue === 1) func2(-1);
    setValue(newValue);
  };

  return (
    <Paper
      square
      style={{
        background: 'transparent',
        color: 'white',
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%,0)',
        width: 'auto',
      }}>
      <Tabs
        TabIndicatorProps={{ style: { background: 'white' } }}
        style={{ color: 'white' }}
        value={value}
        onChange={handleChange}>
        <Tab label="SSH" />
        <Tab label="Tutorials" />
      </Tabs>
    </Paper>
  );
}

export default function Home() {
  const [win, setwin] = React.useState(-1);
  const [tut, setut] = React.useState(0);
  const [concepts, setConcepts] = React.useState([]);

  const user = useUser();
  const history = useHistory();

  const fetchAll = async () => {
    const result = await fetchAllTutorials();
    setConcepts(result.data.tutorials);
  };
  useEffect(() => fetchAll(), []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      {user ? (
        <Button
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
            background: '#1c2125',
            padding: '10px 20px',
          }}
          onClick={() => {
            if (user.role === 'Student') history.push('/dashboard');
            else history.push('/admin-dashboard');
          }}>
          <h3>{user.firstName}</h3>
          <Avatar src={avatar} style={{ marginLeft: 10 }} />
        </Button>
      ) : (
        <Link to="/login">
          <Button
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'black',
              background: 'white',
            }}>
            Login
          </Button>
        </Link>
      )}
      <DisabledTabs func={setut} func2={setwin} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5vh',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          minHeight: '100vh',
          background: 'black',
          color: 'white',
        }}>
        <img alt="Lets HPC 2.0" height="200px" src={letshpc} width="200px" />
        {tut === 1 ? (
          <>
            <h1>Tutorials</h1>
            <p style={{ textAlign: 'center', marginBottom: '10px' }}>
              A couple of tutorials based on the elementary concepts of HPC
              <br /> to build a greater understanding about the subject.
            </p>
            <div class="arrow bounce">
              <a href="#tut">
                <ArrowDownwardIcon fontSize="large" />
              </a>
            </div>
          </>
        ) : (
          <>
            <h1>Choose Your Operating System</h1>
            <ButtonGroup style={{ color: 'black' }} variant="contained">
              <Button
                href="/#mac"
                startIcon={<AppleIcon style={{ fontSize: '35px' }} />}
                style={{
                  textTransform: 'capitalize',
                  fontSize: 'large',
                  width: '10vw',
                  color: 'white',
                  background: 'transparent',
                }}
                onClick={() => {
                  setwin(1);
                }}>
                Mac OS
              </Button>
              <Button
                href="/#windows"
                startIcon={<img alt="windows" height="35px" src={windows} />}
                style={{
                  textTransform: 'capitalize',
                  color: 'white',
                  fontSize: 'large',
                  width: '13vw',
                  background: 'transparent',
                }}
                onClick={() => {
                  setwin(2);
                }}>
                Windows
              </Button>
              <Button
                href="/#linux"
                startIcon={<img alt="Linux" height="35px" src={Linux} />}
                style={{
                  textTransform: 'capitalize',
                  color: 'white',
                  fontSize: 'large',
                  width: '10vw',
                  background: 'transparent',
                }}
                onClick={() => {
                  setwin(3);
                }}>
                Linux
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
      {win === 1 ? (
        <>
          <div id="mac">
            <div className="mannual_data">
              <h1
                className="heading"
                style={{
                  padding: '3% 5%',
                  paddingTop: '3%',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}>
                <IconButton
                  aria-label="back"
                  className="back__but__title"
                  href="/"
                  style={{ color: 'black', background: 'white', padding: 0 }}>
                  <ArrowBackIcon style={{ fontSize: '35px' }} />
                </IconButton>
                <img alt="" height="50px" src={macos} width="50px" />
                <p>MacOS Systems</p>
              </h1>
              <div className="open">
                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                <SshModal OS="mac" background="rgb(0,150,255)" textcolor="white" />
              </div>
              <hr></hr>
              <p>
                <ol className="mannual_points">
                  <li>Head on to "System Preferences" > "Sharing".</li>
                  <li>Check "Remote Login" in the list of services on the left.</li>
                  <li>
                    Note down the Username
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
                <p style={{ margin: '50px 10%' }}>
                  <i>Note: The latest M1 chips are not supported yet!</i>
                </p>
              </p>
            </div>
            <div className="demo">
              <h1>Video Tutorial</h1>
              <div
                className="box"
                style={{
                  background: `url(${Mac_tut})`,
                  backgroundPosition: 'center',
                  border: 'none',
                }}></div>
              <div>
                <p>Make sure any firewalls aren't obstructing the network</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {win === 2 ? (
        <>
          <div id="windows">
            <div className="mannual_data">
              <h1
                className="heading"
                style={{
                  padding: '3% 5%',
                  paddingTop: '3%',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}>
                <IconButton
                  aria-label="back"
                  className="back__but__title"
                  href="/"
                  style={{
                    color: 'white',
                    background: 'rgb(23,23,23)',
                    padding: 0,
                  }}>
                  <ArrowBackIcon style={{ fontSize: '35px' }} />
                </IconButton>
                <img alt="" height="50px" src={winlogo} width="50px" />
                <p>Windows Systems</p>
              </h1>
              <div className="open">
                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                <SshModal OS="windows" background="white" textcolor="black" />
              </div>
              <hr></hr>
              <p>
                <ol className="mannual_points">
                  <li>Head over to Settings > Apps > Optional Features</li>
                  <li>Hit "Add a Feature" if you don't see OpenSSH in the feature list.</li>
                  <li>Search the "OpenSSH Server" in the list and hit Install.</li>
                  <li>
                    After installation, open up Powershell and type in
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      Start-Service sshd
                    </p>
                  </li>
                  <li>
                    You are good to go 👍🏽
                    <p style={{ margin: '10px 0' }}>
                      Just hit the <b>Open SSH</b> button on the top of this manual
                    </p>
                  </li>
                  <p>
                    ------<b>Optional</b> but recommended steps---------
                  </p>
                  <li>
                    To ensure working, type in the following :
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      Set-Service -Name sshd -StartupType 'Automatic'
                    </p>
                    Confirm if the rule is configured by executing
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      Get-NetFirewallRule -Name ssh
                    </p>
                    There should be a firewall rule named "OpenSSH-Server-In-TCP", <br />
                    which should be enabled .
                  </li>
                  <li>
                    If the firewall does not exist, create one
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled
                      True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
                    </p>
                  </li>
                </ol>
              </p>
            </div>
            <div className="demo">
              <div
                className="box"
                style={{
                  borderColor: 'white',
                  height: 'auto',
                  width: '90%',
                  border: 'none',
                }}>
                <ReactPlayer loop muted playing height="100%" url={win_tut} width="100%" />
              </div>
              <h2>Windows Video Tutorial</h2>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {win === 3 ? (
        <>
          <div id="linux">
            <div className="mannual_data">
              <h1
                className="heading"
                style={{
                  padding: '3% 5%',
                  paddingTop: '3%',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}>
                <IconButton
                  aria-label="back"
                  className="back__but__title"
                  href="/"
                  style={{
                    color: 'orange',
                    background: 'transparent',
                    padding: 0,
                  }}>
                  <ArrowBackIcon style={{ fontSize: '35px' }} />
                </IconButton>
                <img alt="" height="50px" src={linuxlogo} width="50px" />
                <p>Linux Systems</p>
              </h1>
              <div className="open">
                <h2 style={{ padding: '2% 5%' }}>Setup Steps</h2>
                <SshModal OS="linux" background="orange" textcolor="white" />
              </div>
              <hr></hr>
              <p>
                <ol className="mannual_points">
                  <li>Head on to your local terminal</li>
                  <li>
                    Put in the following command to setup openssh server
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      sudo apt install openssh-server
                    </p>
                  </li>
                  <li>
                    Check to see if the setup has been successfull using
                    <p
                      style={{
                        margin: '10px 0',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                      }}>
                      sudo systemctl status ssh
                    </p>
                    <p style={{ margin: '10px 0' }}>
                      it should say <b>"active(running)"</b>
                    </p>
                  </li>
                  {/* <li>
                                        Now to find your ip. Type in the following command and check the address under inet6 (not 127.0.0.1)
                                        <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '15px' }}>ifconfig -a</p>
                                        </li>
                                    */}
                  <li>Note down your username mentioned on the start of any terminal command</li>
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
              <div
                className="box"
                style={{
                  borderColor: 'white',
                  height: 'auto',
                  width: '90%',
                  border: 'none',
                }}>
                <ReactPlayer loop muted playing height="100%" url={Linux_tut} width="100%" />
              </div>
              <h2>Linux Video Tutorial</h2>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {tut ? (
        <div
          id="tut"
          style={{
            minHeight: '100vh',
            width: '100vw',
            overflow: 'auto',
            background: '#22272d',
            padding: '30px',
            color: 'white',
          }}>
          <h1>Tutorials</h1>
          <h2
            style={{
              margin: '40px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
            <LibraryBooksIcon fontSize="large" />
            <p>Concepts</p>
          </h2>
          <div className="concepts">
            {_map(concepts, (item, index) => (
              <Concept key={index} tutorial={item} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
