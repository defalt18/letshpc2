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

    const userLogin = React.useCallback(
        (e) => {
            e.preventDefault();
            const user = {
                email: loginData.email,
                password: loginData.password,
            };
            dispatch(login(user));
        },
        [dispatch, loginData]
    );

    const userSignup = React.useCallback(
        (e) => {
            e.preventDefault();
            const user = {
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                email: signupData.email,
                password: signupData.password,
            };
            dispatch(signup(user));
        },
        [dispatch, signupData]
    );

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = React.useCallback((event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }, []);

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
        return <Redirect to={`/${auth.user._id}/dashboard`} />;
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
                        type="password"
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
                    <label htmlFor="studentid">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleSignupChanges}
                        placeholder="first name"
                    />
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleSignupChanges}
                        placeholder="last name"
                    />
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleSignupChanges}
                        placeholder="Confirm Password"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleSignupChanges}
                        placeholder="Password"
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
