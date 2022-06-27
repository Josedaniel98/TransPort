import React from 'react'
import { Field, reduxForm } from "redux-form";
import {
    renderNumber,
} from "Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

import {
    SelectField,
    AsyncSelectField
} from "Utils/renderField/renderField";

const PEClienteForm = (props) => {
    const { handleSubmit, getListSucursal, getListProducto } = props

    const TIPO_PRODUCTO = [
        { "value": 1, "label": 'Producto' },
        { "value": 2, "label": 'Materia Prima' },
    ]

    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-3 col-12">
                <div className="row">

                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="sucursal">Producto</label>
                        <Field
                            name="producto"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={getListProducto}
                            component={AsyncSelectField}
                        />
                    </div>

                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Cantidad</label>
                        <Field
                            name="cantidad"
                            placeholder="Número de item"
                            component={renderNumber}
                        />
                    </div>

                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="sucursal">Sucursal de origen</label>
                        <Field
                            name="sucursal_origen"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={getListSucursal}
                            component={AsyncSelectField}
                        />
                    </div>
                    {/* <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="sucursal">Sucursal de destino</label>
                        <Field
                            name="sucursal_destino"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={getListSucursal}
                            component={AsyncSelectField}
                        />
                    </div> */}
                </div>
            </div>
            <div className='row mt-2'>

                <div className="col-md-6 col-12 mb-2">
                    <a
                        className="ml-3 btn btn-danger mr-1"
                        href="/#/pe-cliente"
                    >
                        Cancelar
                    </a>
                </div>

                <div className="col-md-6 col-12 mb-2">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar</button>
                </div>


            </div>

        </form>
    )
}

export default reduxForm({
    form: 'peclienteForm',
    validate: (data) => {
        return validate(data, {
            producto: validators.exists()('Este campo es requerido'),
            cantidad: validators.exists()('Este campo es requerido'),
            sucursal_origen: validators.exists()('Este campo es requerido'),
        });
    }, // a unique identifier for this form
})(PEClienteForm);
