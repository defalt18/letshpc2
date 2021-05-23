import { authConstants } from "../actions/constants";

const initialState = {
    token: null,
    user: {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    console.log(action);

    // eslint-disable-next-line default-case
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = { ...state, authenticating: true };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true,
            };
            break;
        case authConstants.LOGOUT_REQUEST:
            state = { ...initialState, loading: true };
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = { ...initialState, loading: false };
            break;
        case authConstants.LOGOUT_FAILUREs:
            state = {
                ...initialState,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};
