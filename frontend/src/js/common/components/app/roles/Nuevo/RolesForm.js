import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField, renderFieldRadio } from '../../../Utils/renderField';
import { renderFieldCheck } from '../../../Utils/renderField/renderField';
import { Link, Redirect } from 'react-router-dom';

const RolesForm = (props) => {
    const { handleSubmit} = props;
    return (
        <form name="Rolesform" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="row justify-content-center">
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <label className="t-azul" htmlFor="role">Nombre del Rol</label>
                    <Field name="nombre" label="role" component={renderField} type="text" className="form-control" />
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <label className="t-azul"  htmlFor="descripcion">Descripción</label>
                    <Field name="descripcion" label="descripcion" component={renderField} type="text" className="form-control" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group has-feedback  col-lg-8 col-md-12  col-12">
                    <h4 className="t-primary text-upercase" >Permisos de Vistas</h4>
                </div>
            </div>
            <div className="row justify-content-center ">
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="planta_extraccion" label="Planta de extracción" component={renderFieldCheck}  className="form-control"/>
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="planta_proceso" label="Planta de proceso" component={renderFieldCheck} className="form-control" />
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="venta_alquiler" label="Venta/Alquiler Maquinaria de contrucción" component={renderFieldCheck} className="form-control" />
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="transporte_materia_prima" label="Transporte de materia prima" component={renderFieldCheck}  className="form-control"/>
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="transporte_productos" label="Transporte de productos" component={renderFieldCheck} className="form-control" />
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="servicios_construccion" label="Servicios de construcción" component={renderFieldCheck} className="form-control" />
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="admin" label="Administración" component={renderFieldCheck} className="form-control"  />
                        </div>
                    </div>                
                </div>
                <div className="form-group has-feedback  col-lg-4 col-md-6  col-12">
                    <div className="row">
                        <div className="col-12">
                            <Field name="cliente" label="Es cliente" component={renderFieldCheck} className="form-control" />
                        </div>
                    </div>                
                </div>

            </div>

            <div className="row  justify-content-sm-around justify-content-center">
                    <Link className="btn btn-secondary m-1 align-self-center" to="/roles" >CANCELAR</Link>
                    <button type="submit" className="btn btn-primary m-1 align-self-center">GUARDAR</button>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'RolesForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
        });
    },
})(RolesForm);
