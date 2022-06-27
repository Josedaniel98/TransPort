import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
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

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    
    const { me } = getStore().login;
    // // console.log(me.profile)
    const newData = {
        ...data,
        sucursal_origen: data.sucursal_origen.value,
        producto: data.sucursal_origen.value,
        cliente: me.id || null,
        tipo_empresa: 10,
        sucursal_destino: data.sucursal_destino ? data.sucursal_destino.value : null
    }

    dispatch(setLoader(true));
    api.post('movimiento', newData).then(() => {
        dispatch(push("/pe-cliente"));
        NotificationManager.success('Movimiento creada con éxito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Hubo error en la creación', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const getListMovimiento = (page = 1) => (dispatch, getStore) => {

    dispatch(setLoader(true));
    // Los filtros de inventario se hacen con la sucursal que tiene asignado el usuario logueado
    const { me } = getStore().login;
    
    const params = { page, cliente: me.id };
    api.get('movimiento', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};




const getListProducto = (page = 1) => (dispatch) => {

    let productos = []

    return api.get('producto',{tipo_producto:2}).then((response) => {
        response.results.forEach(producto => {
            productos.push({ value: producto.id, label: producto.nombre })
        })
        return productos;
    }).catch(() => {
        return productos;
    })
};

const getListSucursal = (page = 1) => (dispatch) => {

    let sucursales = []

    return api.get('sucursal', {tipo_empresa:10}).then((response) => {
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
    getListMovimiento,
    getListSucursal,
    getListProducto
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
    }
};

export const initialState = {
    loader: false,
    page: 1,
    data: {}
};

export default handleActions(reducers, initialState);
