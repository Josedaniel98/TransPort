import { handleActions } from 'redux-actions';
import { api } from "api";

const SUBMIT = 'PRODUCTO_SUBMIT';
const LOADER = 'PRODUCTO_LOADER';
const SET_DATA = 'SET_DATA';
const SET_PAGE = 'SET_PAGE';


export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA,
    data,
});

const setPage = page => ({
    type: SET_PAGE,
    page,
});



const getListMovimiento = (page = 1) => (dispatch, getStore) => {

    dispatch(setLoader(true));
    
    const params = { page, tipo_empresa: 10 }

    api.get('movimiento', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};







export const actions = {
    getListMovimiento,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
};

export const initialState = {
    loader: false,
    page: 1,
    data: {}
};

export default handleActions(reducers, initialState);
