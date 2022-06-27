import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/plantaextraccion/plantaextraccion';
import ListPlantaExtraccion from './ListPlantaExtraccion';


const ms2p = (state) => {
    return {
        ...state.plantaextraccion,
    };
};

const md2p = { ...actions };

export const listPlantaExtraccion = connect(ms2p, md2p)(ListPlantaExtraccion);
