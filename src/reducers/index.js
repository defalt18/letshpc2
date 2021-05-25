import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import tutorialReducer from "./tutorial.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    tutorials: tutorialReducer,
});

export default rootReducer;
