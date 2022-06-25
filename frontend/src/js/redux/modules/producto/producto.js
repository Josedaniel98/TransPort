import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
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

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch) => {
    const newData = {
        ...data,
        sucursal: data.sucursal.value
    }

    dispatch(setLoader(true));
    api.post('producto', newData).then(() => {
        dispatch(push("/producto"));
        NotificationManager.success('Producto creada con éxito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Hubo error en la creación', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const getList = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };

    api.get('producto', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {
    
    api.eliminar(`producto/${id}`).then(() => {
        NotificationManager.success('Producto eliminado correctamente', 'Éxito', 1000);
        dispatch(getList());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

const getListSucursal = (page = 1) => (dispatch) => {

    let sucursales = []

    return api.get('sucursal').then((response) => {
        response.results.forEach(sucursal => {
            sucursales.push({ value: sucursal.id, label: sucursal.nombre })
        })
        return sucursales;
    }).catch(() => {
        return sucursales;
    })
};


export const actions = {
    onSubmit,
    getListSucursal,
    getList,
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
    page: 1,
    data: []
};

export default handleActions(reducers, initialState);
