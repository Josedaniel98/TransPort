import React from 'react'
import { Field, reduxForm } from "redux-form";
import {
    renderCurrency,
    renderField,
    renderTextArea,
} from "Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

import {
    SelectField,
    AsyncSelectField
} from "Utils/renderField/renderField";



export const ProductoForm = (props) => {
    const { handleSubmit, getListSucursal } = props

    const TIPO_PRODUCTO = [
        {"value":1, "label":'Producto'},
        {"value":2, "label":'Materia Prima'},
    ]

    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-3 col-12">
                <strong className="text-muted d-block mb-2">Inputs</strong>
                <div className="row">
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre del item"
                            component={renderField}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Código</label>
                        <Field
                            name="codigo"
                            placeholder="Código del elemento"
                            component={renderField}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="number_field">Precio</label>
                        <Field
                            name="precio_venta"
                            placeholder="Precio del item"
                            component={renderCurrency}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Tipo de Producto</label>
                        <Field
                            name="departamento"
                            options={TIPO_PRODUCTO}
                            component={SelectField}
                        />
                    </div>
                    
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="sucursal">Sucursal</label>
                        <Field
                            name="sucursal"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={getListSucursal}
                            component={AsyncSelectField}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Descripción</label>
                        <Field
                            name="descripcion"
                            placeholder="Observaciones"
                            component={renderTextArea}
                        />
                    </div>
                </div>
            </div>
            <div className='d-flex'>
                <div className="col-md-6 col-12 mb-2 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar</button>
                </div>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'producto',
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            codigo: validators.exists()('Este campo es requerido'),
            precio_venta: validators.exists()('Este campo es requerido'),
            departamento: validators.exists()('Este campo es requerido'),
            sucursal: validators.exists()('Este campo es requerido'),
        });
    }, // a unique identifier for this form
})(ProductoForm);
