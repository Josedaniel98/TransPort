import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/plantaextraccion/pecliente';
import ListPECliente from './ListPECliente';
import PECliente from './PECliente';



const ms2p = (state) => {
    return {
        ...state.pecliente,
    };
};

const md2p = { ...actions };

export const listPECliente = connect(ms2p, md2p)(ListPECliente);
export const pECliente = connect(ms2p, md2p)(PECliente);
