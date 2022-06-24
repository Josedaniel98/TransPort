import React, {Component} from 'react';
import Grid from '../../../Utils/Grid/index';
import { TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from 'prop-types';
import {customStandardActions} from "../../../Utils/Grid/StandardActions";
import ToolbarFiltroUsuarios from './filtroUsuarios';
import { Link, Redirect } from 'react-router-dom';
import ToolbarSimple from '../../../Utils/Toolbar/ToolbarSimple';
export default class UsuariosGrid extends Component{
    static propTypes = {
        data: PropTypes.object.isRequired,
        loader: PropTypes.bool.isRequired,
        onPageChange: PropTypes.func,
        onSortChange: PropTypes.func,
    };

    static defaultProps = {
        loading: false
    };

    componentWillMount() {
        const { listar, page } = this.props;
        listar(page);
    }
    boton_adicional2 = (id, row) => {
        return (
            <div style={{ width: '2.1rem' }}></div>
        )
    }

    render(){
        const { data, loader, listar: onPageChange, onSortChange, eliminar, page, permisos } = this.props;
        /* if(permisos["usuarios"] === false) {
            if(!!permisos[`ver_usuarios`] === false) {
                return <Redirect to={`/`} />
            }
        }  */
        return(
            <div className="Container bg-white">
                <h3 className="t-primary m-t p-t">USUARIOS</h3>
                <div className="row justify-content-end">
                    <div className="col-md-10 col-sm-10 col-12">
                        <ToolbarSimple
                            textBoton={ "AGREGAR"}
                            ruta="/usuario/nuevo"
                            buscar={this.props.searchChange}
                            buscador={this.props.search}
                            placeholder={"Buscar por: Nombre, Apellido "}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-12">
                        <div className="mb-4 ">
                            <div className=" card-header"><h6 className="m-0"></h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid hover page={page} striped data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                        
                                        <TableHeaderColumn
                                            dataField="id"
                                            dataAlign=""
                                            dataSort
                                            dataFormat={(cell, row) => {
                                                return customStandardActions(cell, {
                                                    eliminar:  eliminar,
                                                    editar: "usuario",
                                                });
                                            }}
                                        >
                                        </TableHeaderColumn>
                                    
                                    <TableHeaderColumn
                                        isKey
                                        dataField="first_name"
                                        dataSort
                                    >
                                        NOMBRE
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        APELLIDOS
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="profile"
                                        dataFormat={cell => cell ? cell.phone : "---"}
                                        dataSort
                                    >
                                        TELEFONO
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="email"
                                        dataSort
                                    >
                                        CORREO
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

