import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "roles",
    "role",
    "RolesForm",
    "/roles",
);

export default handleActions(reducers, initialState);
