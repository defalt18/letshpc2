import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Login.css";
import { login, signup } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const history = useHistory();
    const [page, setpage] = React.useState(1);

    const [loginData, setloginData] = React.useState({
        email: "",
        password: "",
    });

    const [signupData, setsignupData] = React.useState({
        firstName: "",
        lastName: "",
        // username: "",
        email: "",
        password: "",
        // cpass: "",
    });

    const [error, seterror] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const userLogin = (e) => {
        e.preventDefault();
        const user = { email: loginData.email, password: loginData.password };
        dispatch(login(user));
    };

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            email: signupData.email,
            password: signupData.password,
        };
        dispatch(signup(user));
    };

    if (auth.authenticate) {
        return <Redirect to="/" />;
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleSignupChanges = (e) => {
        const { name, value } = e.target;
        setsignupData({ ...signupData, [name]: value });
    };

    const handleLoginChanges = (e) => {
        const { name, value } = e.target;
        setloginData({ ...loginData, [name]: value });
    };

    const Authorize = (e) => {
        try {
            if (page) {
                if (loginData.email === "") {
                    throw "Please enter valid email";
                }

                if (loginData.password === "") {
                    throw "Please enter valid password";
                }
            } else {
                if (signupData.firstName === "") {
                    throw "Please enter valid firstName";
                }

                if (signupData.lastName === "") {
                    throw "Please enter valid lastName";
                }

                if (signupData.password === "") {
                    throw "Please enter valid password";
                }

                if (signupData.email === "") {
                    throw "Please enter valid email";
                }
            }
            history.push("/:uid/dashboard");
        } catch (err) {
            seterror(err);
            handleClick();
        }
    };

    if (auth.authenticate) {
        return <Redirect to="/:user._id/dashboard" />;
    }

    if (user.loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div class="login__page">
            {page ? (
                <div class="login__box">
                    <h2>Login to LetsHPC</h2>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleLoginChanges}
                        placeholder="201xxxxxx@daiict.ac.in"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleLoginChanges}
                        placeholder="Password"
                    />
                    <Button id="loginbut" onClick={userLogin}>
                        Login
                    </Button>
                    <p>
                        Don't have an account yet?{" "}
                        <u
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setpage(0);
                            }}
                        >
                            Sign Up
                        </u>
                    </p>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                </div>
            ) : (
                <div className="login__box">
                    <h2>Sign Up to LetsHPC</h2>
                    <label htmlFor="studentid">Username</label>
                    <input
                        type="number"
                        name="username"
                        id="username"
                        onChange={handleSignupChanges}
                        placeholder="Username"
                    />
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleSignupChanges}
                        placeholder="John Doe"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleSignupChanges}
                        placeholder="Password"
                    />
                    <label htmlFor="cpass">Confirm Password</label>
                    <input
                        type="text"
                        name="cpass"
                        id="cpass"
                        onChange={handleSignupChanges}
                        placeholder="Confirm Password"
                    />

                    <Button id="loginbut" onClick={userSignup}>
                        Sign Up
                    </Button>

                    <p>
                        Already have an account?{" "}
                        <u
                            style={{ cursor: "pointer" }}
                            onClick={() => setpage(1)}
                        >
                            Login
                        </u>
                    </p>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                </div>
            )}
        </div>
    );
}

export default Login;
