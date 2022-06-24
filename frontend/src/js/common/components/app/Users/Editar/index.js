import { connect } from 'react-redux';
import {actions} from '../../../../../redux/modules/usuarios/usuarios';
import Usuarios from './Users';

const mstp = state => {
    return {...state.usuarios}
};

const mdtp = {
    ...actions
};

export default connect(mstp, mdtp)(Usuarios)
