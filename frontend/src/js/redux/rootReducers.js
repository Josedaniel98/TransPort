import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import roles from './modules/roles/roles';
import sucursal from './modules/sucursal/sucursal';
import producto from './modules/producto/producto';
import plantaextraccion from './modules/plantaextraccion/plantaextraccion';
import serviciosconstruccion from './modules/serviciosconstruccion/serviciosconstruccion';
import pemovimiento from './modules/plantaextraccion/pemovimiento';
import pecliente from './modules/plantaextraccion/pecliente';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    roles,
    sucursal,
    producto,
    plantaextraccion,
    serviciosconstruccion,
    pemovimiento,
    pecliente
});
