import React, { Component } from 'react';
import { ProductoForm } from './ProductoForm';
import { Field, reduxForm } from 'redux-form';
// import {renderField, renderFilePicker} from '../../Utils/renderField/renderField';
// import ProfileForm from "./ProfileForm";


class Producto extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {avatar: null};
    // }

    // setAvatar = (avatar) => {
    //     this.setState({avatar});
    // };

    // update = (data) => {
    //     const { update } = this.props;
    //     update({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    // };

    render() {
        const { onSubmit } = this.props;

        return (
            // <ProfileForm onSubmit={this.update} me={me} setAvatar={this.setAvatar} />
            <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small mt-4">
                            <ProductoForm  onSubmit={onSubmit}/>
                        </div>
                    </div>
                </div>

        );
    }
}

// export default reduxForm({
//     form: 'producto', // a unique identifier for this form
// })(Producto);
export default reduxForm({
    form: 'producto', // a unique identifier for this form
})(Producto);