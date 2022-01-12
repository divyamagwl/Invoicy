import React from 'react';
import {Row, Col, Button, InputGroup, FormControl} from 'react-bootstrap';

import Aux from "../hoc/_Aux";

import {web3, addClient} from '../services/web3';
import {loadWeb3, loadAccount, getCompanyId} from "../services/web3";

class BillsDashboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wallet: '', companyId: 0, clientAddr: '', discount: 0};
        this.fetchAccount();
    }

    async fetchAccount(){
        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});
        const companyId = await getCompanyId();
        if(companyId > 0) {
            this.setState({companyId: companyId});
        }
        else{
            this.props.history.push('/');
        }
    }

    
    async addClient(){
        const clientAddr = this.state.clientAddr;
        const discount = this.state.discount;
        const isValidAddr = web3.utils.isAddress(clientAddr)
        if(!isValidAddr) {
            alert(`Client ${clientAddr} is an invalid address`);
            return;
        }
        const result = await addClient(clientAddr, discount);
        if (result) {
            alert(`Client ${clientAddr} added successfully`);
            this.props.history.push('/dashboard');
        }
        else {
            alert(`Something went wrong!`);
        }
    }

    render() {
        
        return (
            <Aux>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                    {this.state.wallet && 
                    <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Client's Ethereum Wallet Address"
                            aria-label="Client's Ethereum Wallet Address"
                            aria-describedby="basic-addon2"
                            onChange={e => this.setState({clientAddr: e.target.value})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Discount for the client in Percentage (0 - 100)"
                            aria-label="Discount for the client in Percentage (0 - 100)"
                            aria-describedby="basic-addon2"
                            onChange={e => this.setState({discount: e.target.value})}
                        />
                    </InputGroup>
                    <InputGroup.Append>
                        <Button onClick={() => this.addClient()}>Add</Button>
                    </InputGroup.Append>
                    </div>
                    }
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BillsDashboard;