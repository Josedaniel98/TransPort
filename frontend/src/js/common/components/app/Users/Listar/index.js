import { connect } from 'react-redux';
import {actions} from '../../../../../redux/modules/usuarios/usuarios';
import UsuariosGrid from './UsuariosGrid';

const mstp = state => {
    return {
        ...state.usuarios, 
        permisos: state.login.me.permisos,
    }
};

const mdtp = {
    ...actions
};

export default connect(mstp, mdtp)(UsuariosGrid)
