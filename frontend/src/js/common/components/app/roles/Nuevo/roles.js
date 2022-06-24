import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import RolesForm from './RolesForm';

class Roles extends Component {
    static propTypes = {
        crear: PropTypes.func.isRequired,
    };
    state ={
        editar: false,
        titulo: 'AGREGAR ROL',
    }
    componentWillMount(){
        if(this.props.match.params.id){
            this.props.leer(this.props.match.params.id)
            this.setState({
                editar:true,
                titulo: 'EDITAR ROL'
            });
        }
    }
    onSubmit = (values) =>{
        const {crear, editar} =this.props
        let id = this.props.match.params.id
        this.state.editar? editar(id,values) : crear(values);
        this.props.getMe()
    }
    render() {
        const { loader } = this.props;
        return (
            <div className="Container">
               <div className="row">
                    <div className="mb-4 col-12">
                        <div className="mb-4 card card-small m-t">
                            <div className="card-body">
                                <h3 className="t-primary text-uppercase">{this.state.titulo}</h3>
                                <div className="p-0 px-3 pt-3">
                                    <LoadMask loading={loader} light type={"TailSpin"}>
                                        <RolesForm onSubmit={this.onSubmit} />
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

export default Roles;
