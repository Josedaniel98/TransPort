import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"
import MovimientoModal from './MovimientoModal';
import currency from 'currency-formatter'

export default class ListServiciosContruccionCliente extends Component {

    componentWillMount = () => {
        const { getListMovimientoServiciosCliente } = this.props;

        getListMovimientoServiciosCliente();
    }

    render() {
        const { data, onSubmit, loader, page, getListMovimientoServiciosCliente, getListServicios,
                stateModal, openModal, closeModal } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Compra de Servicios de Construcción</h3>
                <div className="mt-3 d-flex justify-content-end mb-3">
                        <button
                            onClick={() => { openModal() }}
                            className="btn btn-primary mr-1"
                        >
                            Agregar
                        </button>
                    </div>
                <div className="mb-4 card card-small mt-4 container">
                    <div>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getListMovimientoServiciosCliente}
                            // onSortChange={onSortChange}
                            page={page}
                        >
                            {/* <TableHeaderColumn
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({ editar: "producto", ver:'producto', eliminar })}
                            >
                                Acciones
                            </TableHeaderColumn> */}

                            <TableHeaderColumn
                                isKey
                                dataField="producto"
                                dataSort
                            >
                                Servicio
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="cantidad"
                                dataSort
                            >
                                Cantidad
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_venta"
                                dataSort
                            >
                                P/U
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="sucursal_origen"
                                dataSort
                            >
                                Sucursal
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="total"
                                dataSort
                                dataFormat={
                                    (cell)=> currency.format( cell, { code: 'GTQ'} )
                                }
                            >
                                Total
                            </TableHeaderColumn>
                        </Grid>

                    </div>
                </div>

                {/* Modal */}
                <InventarioModal
                    onSubmit={onSubmit}
                    stateModal={stateModal}
                    closeModal={closeModal}
                    listProducto={getListServicios}
                />
            </React.Fragment>
        )
    }
}
