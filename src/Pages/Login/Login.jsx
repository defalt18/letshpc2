import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './Login.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {

    const history = useHistory();
    const [page, setpage] = React.useState(1);

    const [login, setlogin] = React.useState({
        email: "", password: ""
    })

    const [error, seterror] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [signup, setsignup] = React.useState({
        username: "",
        email: "",
        password: "",
        cpass: ""
    })


    const handleSignupChanges = (e) => {
        const { name, value } = e.target
        setsignup({ ...signup, [name]: value })
    }

    const handleLoginChanges = (e) => {
        const { name, value } = e.target
        setlogin({ ...login, [name]: value })
    }

    const Authorize = () => {

        try {
            if (page) {
                if (login.email === "") {
                    throw ("Please enter valid email");
                }

                if (login.password === "") {
                    throw ("Please enter valid password");
                }
            }
            else {
                if (signup.username === "") {
                    throw ("Please enter valid Student Id");
                }

                if (signup.name === "") {
                    throw ("Please enter valid name");
                }

                if (signup.password === "") {
                    throw ("Please enter valid password");
                }

                if (signup.cpass !== signup.password) {
                    throw ("Confirm Password and Password don't match");
                }
            }
            history.push('/:uid/dashboard');
        }
        catch (err) { 
            seterror(err); 
            handleClick();
        }
    }

    return (
        <div class="login__page">
            {
                page ? <div class="login__box">
                    <h2>Login to LetsHPC</h2>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={handleLoginChanges} placeholder="201xxxxxx@daiict.ac.in" />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" onChange={handleLoginChanges} placeholder="Password" />
                    <Button id="loginbut" onClick={Authorize}>
                        Login
                    </Button>
                    <p>Don't have an account yet? <u style={{ cursor: 'pointer' }} onClick={() => { setpage(0) }}>Sign Up</u></p>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">{error}</Alert>
                    </Snackbar>
                </div>
                    :
                    <div className="login__box">
                        <h2>Sign Up to LetsHPC</h2>
                        <label htmlFor="studentid">Username</label>
                        <input type="number" name="username" id="username" onChange={handleSignupChanges} placeholder="Username" />
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleSignupChanges} placeholder="John Doe" />
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" onChange={handleSignupChanges} placeholder="Password" />
                        <label htmlFor="cpass">Confirm Password</label>
                        <input type="text" name="cpass" id="cpass" onChange={handleSignupChanges} placeholder="Confirm Password" />

                        <Button id="loginbut" onClick={Authorize}>
                            Sign Up
                        </Button>

                        <p>Already have an account? <u style={{ cursor: 'pointer' }} onClick={() => setpage(1)}>Login</u></p>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">{error}</Alert>
                        </Snackbar>
                    </div>
            }
        </div>
    )
}

export default Login
