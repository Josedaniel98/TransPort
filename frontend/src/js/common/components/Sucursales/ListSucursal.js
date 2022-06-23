import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"

export default class ListSucursal extends Component {

    componentWillMount = () => {
        const { getList } = this.props;

        getList();
    }

    render() {
        const { data, loader, page, eliminar, getList } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Sucursales</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div className="mt-3 d-flex justify-content-end mb-3">
                        <Link
                            className="btn btn-primary"
                            to="/sucursal/create"
                        >
                            Agregar
                        </Link>
                    </div>
                    <div>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getList}
                            // onSortChange={onSortChange}
                            page={page}
                        >
                            <TableHeaderColumn
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "sucursal", eliminar })}
                            >
                                Acciones
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                isKey
                                dataField="nombre"
                                dataSort
                            >
                                Nombre
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="tipo_empresa"
                                dataSort
                            >
                                Empresa
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="departamento"
                                dataSort
                            /*  dataFormat={(cell) => {
                                return cell.label
                            }} */
                            >
                                Departamento
                            </TableHeaderColumn>

                        </Grid>

                    </div>

                </div>

            </React.Fragment>
        )
    }
}
