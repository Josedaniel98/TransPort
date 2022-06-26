import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"

export default class ListProducto extends Component {

    componentWillMount = () => {
        const { getList } = this.props;

        getList();
    }

    render() {
        const { data, loader, page, getList, eliminar } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Productos</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div className="mt-3 d-flex justify-content-end mb-3">
                        <Link
                            className="btn btn-primary"
                            to="/producto/create"
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
                                dataFormat={standardActions({ editar: "producto", ver:'producto', eliminar })}
                            >
                                Acciones
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                isKey
                                dataField="codigo"
                                dataSort
                            >
                                Código
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="nombre"
                                dataSort
                            >
                                Nombre
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_venta"
                                dataSort
                            >
                                Precio
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="tipo_producto"
                                dataSort
                            >
                                Tipo de producto
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="sucursal"
                                dataSort
                            >
                                Sucursal
                            </TableHeaderColumn>

                        </Grid>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
