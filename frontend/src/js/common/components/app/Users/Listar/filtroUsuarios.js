import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';

let estado = [
    {id: true, value: true, label:"Activos"},
    {id: false, value: false, label: "Inactivos"},
]


export default class ToolbarFiltroUsuarios extends Component {
    componentWillMount(){
    }
    render() {
        const {
            valorEstado,
            changeEstado,
        } = this.props;
        return (
            <div className=" row col-lg-12 col-12 row m-0 p-0 ">
                <div className="col-lg-6 col-12"></div>
                <div className="col-lg-6 col-12">
                     {/* <span className="t-musgo font-weight-bold">Año</span> */}
                        <Select
                            isClearable={false}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={estado}
                            placeholder={"Estado"}
                            value={valorEstado}
                            onChange={changeEstado}
                        />
                    </div>
            </div>
        )
    }
}
