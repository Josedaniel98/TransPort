import React, { Component } from 'react';
import "./toolbar.css";
import Search from "./search"
import { Link, Redirect } from 'react-router-dom';


export default class ToolbarSolicitudes extends Component {

  render() {
    return (
      <div className={`col-12 p-0 m-0 mt-5 ${this.props.margen ? "" : "px-4"} row d-flex justify-content-center justify-content-md-end`}>


        {
          this.props.estatefilterBar && (
            <div className="col-lg-7 col-md-7 col-12 pr-md-0 pt-3 pt-md-0 mb-2 mb-md-0">
              {this.props.filterbar}
            </div>
          )
        }
        <div className={`col-lg-3 col-md-3 p-0 search mt-md-4 mt-0 ${this.props.margen}`}>

          {(this.props.buscar !== undefined) && (
            <Search buscar={this.props.buscar} buscador={this.props.buscador} placeholder={this.props.placeholder} />
          )}


        </div>

        {
          (this.props.textBoton) && this.props.permisos && (
            <div className="col-lg-2 col-md-2 pr-md-0 pt-3 pt-md-0 mt-md-4 mt-0">
              <Link className={`btn btn-${this.props.textBoton2 ? 'secondary' : 'primary'} text-uppercase`} to={this.props.ruta}>{this.props.textBoton}</Link>
            </div>
          )
        }
      </div>
    )
  }
}