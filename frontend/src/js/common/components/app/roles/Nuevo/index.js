import { connect } from 'react-redux';
import { actions } from '../../../../../redux/modules/roles/roles';
import { getMe } from '../../../../../redux/modules/cuenta/login';
import Roles from './roles';


const ms2p = (state) => {
  return {
    ...state.roles,
  };
};

const md2p = { ...actions, getMe: getMe};

export default connect(ms2p, md2p)(Roles);