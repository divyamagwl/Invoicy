import React from 'react';
import {NavLink} from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import {loadWeb3, loadAccount, createCompany, getCompanyId} from "../services/web3";

class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {email: '', name: '', wallet: '', companyId: 0};
    }
    async signupHandler(event) {
        event.preventDefault();

        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});

        const result = await createCompany(this.state.name, this.state.email);
        if (result) {
            const companyId = await getCompanyId();
            if(companyId === 0) {
                window.alert('Something Went Wrong!');
                return;
            }
            this.setState({companyId: companyId});
            this.props.history.push({
                pathname: '/dashboard/',
                state: { wallet: this.state.wallet, companyId: this.state.companyId }
            })
        }
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
                                    <input type="text" className="form-control" placeholder="Company Name"  value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Company Email"  value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                                </div>
                                    {/* <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="password"/>
                                    </div> */}
                                {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Checkbox </label>
                                    </div>
                                </div> */}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.signupHandler.bind(this)}>Sign up</button>
                                <p className="mb-0 text-muted">Already have an account? <NavLink to="/">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp;