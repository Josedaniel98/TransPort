import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const SUBMIT = 'PRODUCTO_SUBMIT';
const LOADER = 'PRODUCTO_LOADER';
const SET_DATA = 'SET_DATA';
const SET_PAGE = 'SET_PAGE';
const OPEN_MODAL = 'OPEN_MODAL';

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

const setModal = stateModal => ({
    type: OPEN_MODAL,
    stateModal,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    // console.log(data)
    const { me } = getStore().login;
    // console.log(me.profile)
    const newData = {
        ...data,
        producto: data.producto.value,
        sucursal: me.profile.sucursal.id || null
    }

    dispatch(setLoader(true));
    api.post('movimiento', newData).then(() => {
        // dispatch(push("/plantaextraccion"));
        dispatch(getListInventario());
        dispatch(closeModal())
        NotificationManager.success('Movimiento creado con éxito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Hubo error en la creación', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const getListMovimientoServicios = (page = 1) => (dispatch, getStore) => {

    dispatch(setLoader(true));
    // Los filtros de inventario se hacen con la sucursal que tiene asignado el usuario logueado
    const { me } = getStore().login;
    const sucursal = me.profile.sucursal ? me.profile.sucursal.id : null
    
    const params = { page, sucursal };
    api.get('movimiento', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const detail = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`producto/${id}`).then((response) => {
        dispatch(initializeForm('productoForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
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

const update = (data) => (dispatch, getStore) => {
    const { values } = getStore().form.productoForm;
    const newData = {
        ...data,
        sucursal: data.sucursal.value
    }

    api.put(`producto/${values.id}`, newData).then(() => {
        NotificationManager.success('El producto se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/producto'));
    }).catch(() => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    });
};


//================================
//       Modal
//================================

const getListServicios = (page = 1) => (dispatch) => {

    let productos = []
    let tipo_producto = 4 
    const params = { tipo_producto };

    return api.get('producto').then((response) => {
        response.results.forEach(producto => {
            productos.push({ value: producto.id, label: producto.nombre })
        })
        return productos;
    }).catch(() => {
        return productos;
    })
};

const openModal = () => (dispatch) => {
    dispatch(setModal(true))
}
const closeModal = () => (dispatch) => {
    dispatch(setModal(false))
}

//================================
//       Finish Modal
//================================



export const actions = {
    onSubmit,
    getListMovimientoServicios,
    eliminar,
    detail,
    update,
    openModal,
    closeModal,
    getListServicios
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
    [OPEN_MODAL]: (state, { stateModal }) => {
        return {
            ...state,
            stateModal,
        };
    },
};

export const initialState = {
    loader: false,
    stateModal: false,
    page: 1,
    data: {}
};

export default handleActions(reducers, initialState);
