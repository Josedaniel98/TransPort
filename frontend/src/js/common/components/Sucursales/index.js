import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/sucursal/sucursal';
import ListSucursal from './ListSucursal';
import Sucursal from './Sucursal';


const ms2p = (state) => {
  return {
    ...state.sucursal,
  };
};

const md2p = { ...actions };

// List
export const listSucursal = connect(ms2p,md2p)(ListSucursal)

export const  sucursal = connect(ms2p, md2p)(Sucursal);
