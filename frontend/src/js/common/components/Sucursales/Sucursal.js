import React, { Component } from 'react';
import SucursalForm  from './SucursalForm';


export default class Sucursal extends Component {
    
    componentWillMount = () => {
        const {match, detail} = this.props;
        if(match.params.id){
            const id = match.params.id;
            detail(id);
        }
    }

    render() {
        const { onSubmit, update, match } = this.props;
        const funcionEnvio = match.params.id ? update : onSubmit;

        return (
            <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small mt-4">
                            <SucursalForm  onSubmit={funcionEnvio}/>
                        </div>
                    </div>
                </div>

        );
    }
}

