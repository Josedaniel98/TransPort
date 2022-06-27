import React from 'react'
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import {
    AsyncSelectField,
    renderNumber
} from "Utils/renderField/renderField";

// import {
//     renderField,
// } from "Utils/renderField/renderField";

import './style1.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '400px',
        width: 'auto',
        // minWidth:'50%',
        padding: '20px',
    },
};

Modal.setAppElement('#app-container');

const MovimientoModal = (props) => {

    // const closeModel = () => { };
    const { handleSubmit, stateModal, closeModal, listProducto } = props;

    return (
        <Modal
            isOpen={stateModal}
            onRequestClose={closeModal}
            style={customStyles}
            // className="Modal"
            overlayClassName="Overlay"
        >
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    <h5 className="">Ingresar pedido</h5>
                    <a onClick={closeModal} className="close">x</a>
                </div>
                <div className='row'>
                    <div className="col-md-12 col-sm-6 mb-2">
                        <label htmlFor="normal_field">Nombre</label>

                        <Field
                            name="producto"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={listProducto}
                            component={AsyncSelectField}
                        />
                    </div>
                    <div className="col-md-12 col-sm-6 mb-2">
                        <label htmlFor="normal_field">Cantidad</label>
                        <Field
                            name="cantidad"
                            placeholder="Número de item"
                            component={renderNumber}
                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-md-6 col-12 mb-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary m-1">Registrar</button>
                    </div>
                </div>

            </form>

        </Modal>
    )
}


export default reduxForm({
    form: 'MovimientoServicioModalForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            producto: validators.exists()('Este campo es requerido'),
            cantidad: validators.exists()('Este campo es requerido'),
        });
    },
})(MovimientoModal);