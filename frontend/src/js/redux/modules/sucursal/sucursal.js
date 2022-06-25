import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";


const SUBMIT   = 'SUCURSAL_SUBMIT';
const SET_DATA = 'SET_DATA';
const LOADER   = 'SUCURSAL_LOADER';
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


// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch) => {
    
    // dispatch(setLoader(true));
    api.post('sucursal', data).then(() => {
        NotificationManager.success('Sucursal registrado correctamente', 'Éxito', 2000);
        dispatch(push("/sucursal"));
    }).catch(() => {
        NotificationManager.error('Hubo error, vuelva a intentar', 'ERROR', 2000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const getList = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };

    api.get('sucursal', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const detail = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`sucursal/${id}`).then((response) => {
        dispatch(initializeForm('sucursalForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const update = (data) => (dispatch, getStore) => {
    const { values } = getStore().form.sucursalForm;

    api.put(`sucursal/${values.id}`, data).then(() => {
        NotificationManager.success('El sucursal se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/sucursal'));
    }).catch(() => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    });
};

const eliminar = id => (dispatch) => {
    
    api.eliminar(`sucursal/${id}`).then(() => {
        NotificationManager.success('Sucursal eliminado correctamente', 'Éxito', 1000);
        dispatch(getList());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};






export const actions = {
    onSubmit,
    getList,
    detail,
    update,
    eliminar
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
    data: {},
    page: 1 
};

export default handleActions(reducers, initialState);
