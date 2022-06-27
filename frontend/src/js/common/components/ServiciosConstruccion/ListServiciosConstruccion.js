import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"
import MovimientoModal from './MovimientoModal';
import currency from 'currency-formatter'

export default class ListServiciosConstruccion extends Component {

    componentWillMount = () => {
        const { getListMovimientoServicios } = this.props;

        getListMovimientoServicios();
    }

    render() {
        const { data, onSubmit, loader, page, getListMovimientoServicios, getListServicios,
                stateModal, openModal, closeModal } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Ventas de Servicios de Construcción</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getListMovimientoServicios}
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
                <MovimientoModal
                    onSubmit={onSubmit}
                    stateModal={stateModal}
                    closeModal={closeModal}
                    listProducto={getListServicios}
                />
            </React.Fragment>
        )
    }
}
