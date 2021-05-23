import { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import SSH from "./Pages/SSH/SSH";
import Tutorial from "./Pages/Tutorial/Tutorial";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { isUserLoggedIn } from "./actions";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isUserLoggedIn());
        }
    }, []);

    return (
        <>
            <Switch>
                <PrivateRoute path="/" exact component={Home}></PrivateRoute>
                <PrivateRoute
                    path="/ssh/:OS/:username"
                    component={SSH}
                ></PrivateRoute>
                <PrivateRoute
                    path="/tutorials"
                    component={Tutorial}
                ></PrivateRoute>
                <PrivateRoute
                    exact
                    path="/:uid/dashboard"
                    component={Dashboard}
                ></PrivateRoute>
                <Route exact path="/login" component={Login} />
            </Switch>
        </>
    );
}

export default App;
