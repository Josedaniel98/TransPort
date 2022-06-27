import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/serviciosconstruccion/serviciosconstruccion';
import ListServiciosConstruccion from './ListServiciosConstruccion';
import ListServiciosConstruccionCliente from './ListServiciosConstruccion';


const ms2p = (state) => {
    return {
        ...state.serviciosconstruccion,
    };
};

const md2p = { ...actions };

export const listServiciosConstruccion = connect(ms2p, md2p)(ListServiciosConstruccion);

export const listServiciosConstruccionCliente = connect(ms2p, md2p)(ListServiciosConstruccionCliente);
