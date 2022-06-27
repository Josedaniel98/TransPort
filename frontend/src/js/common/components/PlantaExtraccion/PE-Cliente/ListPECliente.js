import React, { Component } from 'react'
import Grid from '../../Utils/Grid'
import { standardActions } from "../../Utils/Grid/StandardActions"
import currency from 'currency-formatter'
import { Link } from 'react-router-dom';

export default class ListPECliente extends Component {

  componentWillMount = () => {
    const { getListMovimiento } = this.props;

    getListMovimiento();
}

  render() {
    const { data, loader, page, getListMovimiento } = this.props;
    return (
      <React.Fragment>
        <br />
        <h3 className="text">Movimiento</h3>
        <div className="mb-4 card card-small mt-4 container">
          <div className="mt-3 d-flex justify-content-end mb-3">
            <Link
              className="btn btn-primary"
              to="/pe-cliente/create"
            >
              Pedir
            </Link>
          </div>
          <div>
            <Grid
              data={data}
              loading={loader}
              onPageChange={getListMovimiento}
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
