import React, { Component } from 'react';
import  ProductoForm  from './ProductoForm';


export default class Producto extends Component {


    render() {
        const { onSubmit, getListSucursal } = this.props;

        return (
            <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small mt-4">
                            <ProductoForm  
                                onSubmit={onSubmit}
                                getListSucursal={ getListSucursal }
                                />
                        </div>
                    </div>
                </div>

        );
    }
}
