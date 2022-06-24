import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import UsuariosForm from './UsuariosForm';
import LoadMask from "../../../Utils/LoadMask/LoadMask";

class Registro extends Component {
    state ={
        id: 0,
        editar: false,
        titulo: 'AGREGAR USUARIO',
    }
    static propTypes = {
        editar: PropTypes.func.isRequired,
    };
    componentWillMount(){
        const { selectRoles, selectSucursal} = this.props
        let idU=this.props.match.params.id;

        selectRoles();
        selectSucursal();

        if(this.props.match.params.id != null && this.props.match.params.id > 0){
            this.props.leer(this.props.match.params.id)
            this.setState({
                editar:true,
                titulo: 'EDITAR USUARIO'
            });
        }
    }
    format = (array=[]) =>{
        const nuevoArray = [];
        array.forEach((item,index) => {
            nuevoArray[index]={"label": item.nombre , "value": item.id}
        });
        return nuevoArray
    }
    onSubmit = (values) => {
        this.setState({id:this.props.match.params.id}, () => {
        });
        this.props.match.params.id ? this.props.editar(this.props.match.params.id, values ) : this.props.crear(values)

    }

    render() {
        const { loader, roles, sucursales } = this.props;
        return (
            <div className="Container">
            <div className="row">
                 <div className="mb-4 col-12">
                     <div className="mb-4 card card-small m-t">
                         <div className="card-body">
                             <h3 className="t-primary text-uppercase">{this.state.titulo}</h3>
                             <div className="p-0 px-3 pt-3">
                             <LoadMask loading={loader} light>
                    <UsuariosForm vendedores_form={false} onSubmit={this.onSubmit} format={this.format} roles={roles} sucursales={sucursales} />
                </LoadMask>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
        );
    }
}
export default Registro;
