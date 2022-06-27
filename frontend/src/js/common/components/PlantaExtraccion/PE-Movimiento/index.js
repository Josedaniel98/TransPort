import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/plantaextraccion/pemovimiento';
import ListMovimiento from './ListMovimiento';


const ms2p = (state) => {
    return {
        ...state.pemovimiento,
    };
};

const md2p = { ...actions };

export const listPEMovimiento = connect(ms2p, md2p)(ListMovimiento);
