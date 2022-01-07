import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../store/constant";

class Landing extends React.Component {
    loginHandler (event) {

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
                                    <i className="feather icon-clipboard auth-icon"/>
                                </div>
                                <h3 className="mb-4">Welcome to Invoice Management</h3>
                                <Link to="/signup" className="btn btn-primary shadow-2 mb-4">Sign up</Link>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.loginHandler}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Landing;