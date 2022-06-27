import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"
import InventarioModal from './InventarioModal';
import currency from 'currency-formatter'

export default class ListPlantaExtraccion extends Component {

    componentWillMount = () => {
        const { getListInventario } = this.props;

        getListInventario();
    }

    render() {
        const { data, onSubmit, loader, page, getListInventario, getListProducto,
                stateModal, openModal, closeModal } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Inventario</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div className="mt-3 d-flex justify-content-end mb-3">
                        <button
                            onClick={() => { openModal() }}
                            className="btn btn-primary mr-1"
                        >
                            Agregar
                        </button>
                    </div>
                    <div>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getListInventario}
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
                                Nombre
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="existencias"
                                dataSort
                            >
                                Existencia
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_venta"
                                dataSort
                            >
                                P/U
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
                    listProducto={getListProducto}
                />
            </React.Fragment>
        )
    }
}
