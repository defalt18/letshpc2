import { tutorialConstants } from "../actions/constants";

const initialState = {
    tutorials: [],
    loading: false,
    error: null,
    message: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    console.log(action);

    // eslint-disable-next-line default-case
    switch (action.type) {
        case tutorialConstants.GET_ALL_TUTORIALS_REQUEST:
            state = { ...state, loading: true };
            break;
        case tutorialConstants.GET_ALL_TUTORIALS_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                tutorials: action.payload.tutorials,
                loading: false,
            };
            break;
        case tutorialConstants.GET_ALL_TUTORIALS_FAILURE:
            state = {
                ...initialState,
                error: action.payload.error,
                message: action.payload.message,
                loading: false,
            };
            break;
    }

    return state;
};
