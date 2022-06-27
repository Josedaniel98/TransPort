import React, { Component } from 'react'
import Grid from '../../Utils/Grid'
import currency from 'currency-formatter'

export default class ListMovimiento extends Component {
    componentWillMount = () => {
        const { getListMovimiento,  } = this.props;

        getListMovimiento();
    }

    render() {
        const { data,  loader, page, getListMovimiento } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Listado de Movimiento</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div className='mt-5'>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getListMovimiento}
                            // onSortChange={onSortChange}
                            page={page}
                        >

                            <TableHeaderColumn
                                isKey
                                dataField="producto"
                                dataSort
                            >
                                Producto
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="cantidad"
                                dataSort
                            >
                                Cantidad
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="sucursal_origen"
                                dataSort
                            >
                                Sucursal Origen
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="cliente"
                                dataSort
                            >
                                Cliente
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_venta"
                                dataSort
                            >
                                p/u
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="total"
                                dataSort
                                dataFormat={
                                    (cell) => currency.format(cell, { code: 'GTQ' })
                                }
                            >
                                Total
                            </TableHeaderColumn>
                        </Grid>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
