import React from 'react';
import {Link} from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import {loadWeb3, loadAccount, getCompanyId} from "../services/web3";
//https://www.npmjs.com/package/react-bootstrap-dialog
import Dialog from 'react-bootstrap-dialog';

class Landing extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wallet: '', companyId: 0};
    }

    async loginHandler (event) {
        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});
        const companyId = await getCompanyId();
        if(companyId > 0) {
            this.setState({companyId: companyId});
            this.props.history.push({
                pathname: '/dashboard/',
                state: { wallet: this.state.wallet, companyId: this.state.companyId }
            })
        }
        else {
            this.dialog.showAlert('Please register your company first or connnect with other wallet address.');
        }
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
                                <h3 className="mb-4">Welcome to Invoicy</h3>
                                <p className="mb-4">Invoice management systemized!</p>
                                <Link to="/signup" className="btn btn-primary shadow-2 mb-4" 
                                    style={{color: 'white', fontWeight: 'normal'}}>
                                    Sign up
                                </Link>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.loginHandler.bind(this)}>Login</button>
                                <Dialog ref={(component) => { this.dialog = component }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Landing;