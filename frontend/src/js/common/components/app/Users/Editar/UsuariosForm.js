import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { renderField, SelectField } from '../../../Utils/renderField/renderField';

import { Link, Redirect } from 'react-router-dom';

class UsuariosForm extends React.Component {
    render(){
        const { handleSubmit, format, roles, sucursales} = this.props;
        return(
            <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="form-group has-feedback col-sm-6  col-12">
                        <label className="t-azul" htmlFor="username">Nombre de usuario*</label>
                        <Field name="username" label="Usuario" component={renderField} type="text" className="form-control" />
                    </div>
                    <div className="form-group has-feedback  col-sm-6  col-12">
                        <label className="t-azul"  htmlFor="first_name">Nombre*</label>
                        <Field name="first_name" label="Nombre" component={renderField} type="text" className="form-control" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group has-feedback  col-sm-6  col-12">
                        <label className="t-azul"  htmlFor="last_name">Apellido*</label>
                        <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control" />
                    </div>
                    <div className="form-group has-feedback  col-sm-6  col-12">
                        <label className="t-azul"  htmlFor="password">Contraseña*</label>
                        <Field
                            name="password"
                            label="Contraseña"
                            component={renderField}
                            type="text"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group has-feedback col-sm-6  col-12">
                        <label className="t-azul"  htmlFor="email">Correo*</label>
                        <Field name="email" label="email" component={renderField} type="text" className="form-control" />
                    </div>
                    <div className="form-group has-feedback col-sm-6  col-12">
                        <label className="t-azul"  htmlFor="phone">Teléfono</label>
                        <Field name="profile.phone" label="phone" component={renderField} type="text" className="form-control" />
                    </div>
                </div>
                    
                        <div className="row justify-content-start">
                            <div className="form-group has-feedback col-sm-6  col-12">
                                <label className="t-azul" htmlFor="role">Role*</label>
                                <Field
                                    name="profile.role"
                                    label="role"
                                    options={format(roles)}
                                    component={SelectField}
                                    />
                            </div>
                            <div className="form-group has-feedback col-sm-6  col-12">
                                <label className="t-azul" htmlFor="role">Sucursal*</label>
                                <Field
                                    name="profile.sucursal"
                                    label="sucursal"
                                    options={format(sucursales)}
                                    component={SelectField}
                                    />
                            </div>
                        </div>           
                
                <div className="row  justify-content-sm-around justify-content-center">
                        <Link className="btn btn-secondary  m-1 align-self-center" to={"/usuarios"} >CANCELAR</Link>
                        <button type="submit" className="btn btn-primary m-1  align-self-center">GUARDAR</button>
                </div>
            </form>

        )
    }
}


UsuariosForm = reduxForm({
    form: 'EditarUsuarioForm',
    validate: (data, props) => {
        const errors = {};
        if(!data.username){
            errors.username = "Campo requerido"
        }
        if(!data.first_name){
            errors.first_name = "Campo requerido"
        }
        if(!data.last_name){
            errors.last_name = "Campo requerido"
        }
        if(!data.email){
            errors.email = "Campo requerido"
        }
        
        return errors
    },
})(UsuariosForm);

const selector = formValueSelector('EditarUsuarioForm');
UsuariosForm = connect(state =>{

})(UsuariosForm);

export default UsuariosForm;
