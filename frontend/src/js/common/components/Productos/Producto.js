import React, { Component } from 'react';
import  ProductoForm  from './ProductoForm';


export default class Producto extends Component {

    componentWillMount = () => {
        const {match, detail} = this.props;
        if(match.params.id){
            const id = match.params.id;
            detail(id);
        }
    }


    render() {
        const { onSubmit, getListSucursal, match, update } = this.props;
        const funcionEnvio = match.params.id ? update : onSubmit;

        return (
            <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small mt-4">
                            <ProductoForm
                                read={location.pathname.includes('ver')}  
                                onSubmit={funcionEnvio}
                                getListSucursal={ getListSucursal }
                                />
                        </div>
                    </div>
                </div>

        );
    }
}
