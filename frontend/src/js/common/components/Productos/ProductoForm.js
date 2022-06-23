import React from 'react'
import { Field, reduxForm } from "redux-form";
import {
    renderCurrency,
    renderNumber,
    renderField,
    renderFilePicker,
    renderTextArea,
} from "Utils/renderField/renderField";


export const ProductoForm = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Inputs</strong>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Nombre</label>
                            <Field
                                name="nombre"
                                placeholder="Normal Field"
                                component={renderField}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Código</label>
                            <Field
                                name="codigo"
                                placeholder="Normal Field"
                                component={renderField}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Precio</label>
                            <Field
                                name="precio_venta"
                                placeholder="Currency Field"
                                component={renderCurrency}
                            />
                        </div>
                        {/* TODO: Select para el tipo de producto */} 
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Tipo de Producto</label>
                            <Field
                                name="password_field"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
                        </div>
                        {/* TODO: Consulta a la base de datos */}
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Sucursal</label>
                            <Field
                                name="number_field"
                                placeholder="Number Field"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Descripción</label>
                            <Field
                                name="normal_field"
                                placeholder="Normal Field"
                                component={renderTextArea}
                            />
                        </div>
                    </div>
            </div>
            <div className='d-flex'>
                <div className="col-md-6 col-12 mb-2">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">Registrar</button>
                </div>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'producto', // a unique identifier for this form
})(ProductoForm);
