import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
import {listProducto,producto} from './common/components/Productos';
import {listSucursal,sucursal} from './common/components/Sucursales';
import{listPlantaExtraccion} from './common/components/PlantaExtraccion/'
import {listServiciosConstruccion} from './common/components/ServiciosConstruccion';
import{listPEMovimiento} from './common/components/PlantaExtraccion/PE-Movimiento'
import{listPECliente, pECliente} from './common/components/PlantaExtraccion/PE-Cliente'

require('../style/index.css');


import {
    Listar as RolesGrid,
    Nuevo as RolesCrear
} from '../js/common/components/app/roles';

import {
    Listar as UsuarioGrid,
    Editar as UsuarioEditar
} from '../js/common/components/app/Users';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />

                <ProtectedRoute exact path="/producto" component={listProducto} />
                <ProtectedRoute exact path="/producto/create" component={producto} />
                <ProtectedRoute exact path="/producto/:id/editar" component={producto} />
                <ProtectedRoute exact path="/producto/:id/ver" component={producto} />

                <ProtectedRoute exact path="/sucursal" component={listSucursal} />
                <ProtectedRoute exact path="/sucursal/create" component={sucursal} />
                <ProtectedRoute exact path="/sucursal/:id/editar" component={sucursal} />
                <ProtectedRoute exact path="/sucursal/:id/ver" component={sucursal} />

                <ProtectedRoute exact path="/plantaextraccion" component={listPlantaExtraccion} />
                <ProtectedRoute exact path="/serviciosconstruccion" component={listServiciosConstruccion} />
                <ProtectedRoute exact path="/pe-movimiento" component={listPEMovimiento} />
                <ProtectedRoute exact path="/pe-cliente" component={listPECliente} />
                <ProtectedRoute exact path="/pe-cliente/create" component={pECliente} />
                
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                
                {/*Roles */}
                <ProtectedRoute exact path="/roles" component={RolesGrid} />
                <ProtectedRoute exact path="/role/nuevo" component={RolesCrear} />
                <ProtectedRoute exact path="/role/:id/editar" component={RolesCrear} />

                {/* Usuarios */}
                <ProtectedRoute exact path="/usuarios" component={UsuarioGrid} title="Usuarios"/>
                <ProtectedRoute exact path="/usuario/nuevo" component={UsuarioEditar} title="Usuarios/Agregar usuario" />
                <ProtectedRoute exact path="/user-profile" component={Profile} title="Perfil" />
                <ProtectedRoute exact path="/usuario/:id/editar" component={UsuarioEditar} title="Usuarios/Editar usuario"/>

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
