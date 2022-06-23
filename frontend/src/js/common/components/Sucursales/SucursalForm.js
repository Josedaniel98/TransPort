import React from 'react'
import { Field, reduxForm } from "redux-form";
import {
    renderField,
} from "Utils/renderField/renderField";
import {
    SelectField,
} from "Utils/renderField/renderField";

import { DEPARTAMENTOS, TIPO_EMPRESA } from "../../../utility/constantes"

const SucursalForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 col-12">
                <div className="row mt-3">
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre del sucursal"
                            component={renderField}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Departamento</label>
                        <Field
                            name="departamento"
                            options={DEPARTAMENTOS}
                            component={SelectField}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Tipo de empresa</label>
                        <Field
                            name="tipo_empresa"
                            options={TIPO_EMPRESA}
                            component={SelectField}
                        />
                    </div>

                </div>
                <div className='row mt-2'>

                    <div className="col-md-6 col-12 mb-2">
                        <a
                            className="ml-3 btn btn-danger mr-1"
                            href="/#/sucursal"
                            etapas={null}
                        >
                            Cancelar
                        </a>
                    </div>

                    <div className="col-md-6 col-12 mb-2">
                        <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar</button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'sucursalForm', // a unique identifier for this form
})(SucursalForm);
