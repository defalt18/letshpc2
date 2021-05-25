import axios from "../helpers/axios";
import { tutorialConstants } from "./constants";

export const getAllTutorials = () => {
    return async (dispatch) => {
        dispatch({ type: tutorialConstants.GET_ALL_TUTORIALS_REQUEST });
        const res = await axios.get("/tutorial");

        if (res.status === 200) {
            const { message, tutorials } = res.data;
            dispatch({
                type: tutorialConstants.GET_ALL_TUTORIALS_SUCCESS,
                payload: { message, tutorials },
            });
        } else {
            if (res.status === 400) {
                const { message, error } = res.data;

                dispatch({
                    type: tutorialConstants.GET_ALL_TUTORIALS_FAILURE,
                    payload: { message, error },
                });
            }
        }
    };
};
