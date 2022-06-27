import React, { Component } from 'react'
import PEClienteForm from './PEClienteForm'

export default class PECliente extends Component {
    render() {
        const { onSubmit, getListSucursal, getListProducto } = this.props;
        return (
            <div className="row">
                <div className="mb-4 col-lg-12">
                    <div className="mb-4 card card-small mt-4">
                        <PEClienteForm
                            onSubmit={onSubmit}
                            getListSucursal={getListSucursal}
                            getListProducto={getListProducto}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
