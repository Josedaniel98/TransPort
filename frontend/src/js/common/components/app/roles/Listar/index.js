import { connect } from 'react-redux';
import {actions} from '../../../../../redux/modules/roles/roles';
import RolesGrid from './rolesGrid';

const mstp = state => {
    return {
        ...state.roles,
        permisos: state.login.me.permisos,
        staff: state.login.me.is_staff
    }
};

const mdtp = {
    ...actions
};

export default connect(mstp, mdtp)(RolesGrid)
