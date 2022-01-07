import React from 'react';
import {NavLink} from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../store/constant";

class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {email: '', name: ''};
    }
    signupHandler(event) {
        window.location.href='/dashboard/'
        console.log("Email: " + this.state.email);
        console.log("Name: " + this.state.name);
    }
    handleEmailChange (event) {
        this.setState({email: event.target.value});
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Company Name"  value={this.state.password} onChange={this.handleNameChange.bind(this)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Company Email"  value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                                </div>
                                    {/* <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="password"/>
                                    </div> */}
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Checkbox </label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.signupHandler.bind(this)}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp;