import React, { Component } from 'react';
import Grid from '../../../Utils/Grid/index';
import { TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from 'prop-types';
import { customStandardActions } from "../../../Utils/Grid/StandardActions";
import { Link, Redirect } from 'react-router-dom';
import ToolbarSimple from '../../../Utils/Toolbar/ToolbarSimple';

export default class RolesGrid extends Component {
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

    render() {
        const { data, loader, listar: onPageChange, onSortChange, eliminar, page, permisos, staff } = this.props;
        /* if(staff === false){
            if(permisos["roles"] === false) {
                if(!!permisos[`ver_roles`] === false) {
                    return <Redirect to={`/`} />
                }
            }
        } */
        return (
            <div className="Container bg-white">
                <h3 className="t-primary m-t p-t">ROLES</h3>
                <div className="row justify-content-end">
                    <div className="col-md-8 col-sm-8 col-8">
                        <ToolbarSimple
                            textBoton={"AGREGAR"}
                            ruta="/role/nuevo"
                            buscar={this.props.searchChange}
                            buscador={this.props.search}
                            placeholder={"Buscar por: Nombre, Descripción"}
                        />
                        {/* <Link className="btn btn-primary" to="/role/nuevo">AGREGAR</Link> */}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-12">
                        <div className="mb-4 ">
                            <div className=" card-header"><h6 className="m-0"></h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid hover striped data={data} page={page} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                   <TableHeaderColumn
                                        dataField="id"
                                        dataAlign="center"
                                        dataSort
                                        dataFormat={(cell) => {
                                            return customStandardActions(cell, {
                                                eliminar:eliminar,
                                                editar:  "role",
                                            });
                                        }}
                                    >
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        isKey
                                        dataField="nombre"
                                        dataSort
                                    >
                                        ROL
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="descripcion"
                                        dataSort
                                    >
                                        DESCRIPCIÓN
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

