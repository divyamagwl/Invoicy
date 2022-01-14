import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import windowSize from 'react-window-size';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";
import {loadWeb3, loadAccount} from "../../../../../services/web3";


class NavLeft extends Component {

    constructor(props){
        super(props);
        this.state = {wallet: ''};
        this.fetchAccount();
    }

    async fetchAccount(){
        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});
    }

    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        let dropdownRightAlign = false;
        if (this.props.rtlLayout) {
            dropdownRightAlign = true;
        }


        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                    <li className={navItemClass.join(' ')}>
                        {this.state.wallet!=='' && 
                        <Dropdown alignRight={dropdownRightAlign}>
                            <i className="fa fa-circle text-c-green f-10"/>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            Wallet Connected
                            </Dropdown.Toggle>
                            <ul>
                                <Dropdown.Menu>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>{this.state.wallet}</a></li>
                                </Dropdown.Menu>
                            </ul>
                        </Dropdown>}
                        {this.state.wallet==='' &&                          
                            <p variant={'link'} id="dropdown-basic"> <i className="fa fa-circle text-c-red f-10 m-r-5"/>
                                Connect Wallet
                            </p>}
                    </li>
                    
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
