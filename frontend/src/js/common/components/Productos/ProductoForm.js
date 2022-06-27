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
    const { handleSubmit, getListSucursal, read } = props

    const TIPO_PRODUCTO = [
        { "value": 1, "label": 'Producto' },
        { "value": 2, "label": 'Materia Prima' },
    ]

    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-3 col-12">
                <div className="row">
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Nombre</label>
                        <Field
                            name="nombre"
                            placeholder="Nombre del item"
                            component={renderField}
                            disable={read}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Código</label>
                        <Field
                            name="codigo"
                            placeholder="Código del elemento"
                            component={renderField}
                            disable={read}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="number_field">Precio</label>
                        <Field
                            name="precio_venta"
                            placeholder="Precio del item"
                            component={renderCurrency}
                            disable={read}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Tipo de Producto</label>
                        <Field
                            name="tipo_producto"
                            options={TIPO_PRODUCTO}
                            component={SelectField}
                            disable={read}
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
                            disable={read}
                        />
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                        <label htmlFor="normal_field">Descripción</label>
                        <Field
                            name="descripcion"
                            placeholder="Observaciones"
                            component={renderTextArea}
                            disable={read}
                        />
                    </div>
                </div>
            </div>
            <div className='row mt-2'>

                <div className="col-md-6 col-12 mb-2">
                    <a
                        className="ml-3 btn btn-danger mr-1"
                        href="/#/producto"
                    >
                        Cancelar
                    </a>
                </div>
                {
                    !read
                    &&
                    (<div className="col-md-6 col-12 mb-2">
                        <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar</button>
                    </div>)
                }

            </div>

        </form>
    )
}

export default reduxForm({
    form: 'productoForm',
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
