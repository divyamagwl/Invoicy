import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import DEMO from "../store/constant";

import {web3, getAllBillsByCompany, getInvoiceDetails, payBill} from '../services/web3';
import {loadWeb3, loadAccount, getCompanyId} from "../services/web3";


class BillsDashboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wallet: '', companyId: 0, client_addr: ''};
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

    
    async addClient(addr){
        alert(`Client (${addr}) added successfully`);
    }

    render() {
        
        return (
            <Aux>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                    {this.state.wallet && <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Client's Eth Address"
                            aria-label="Client's Eth Address"
                            aria-describedby="basic-addon2"
                            onChange={e => this.setState({client_addr: e.target.value})}
                        />
                        <InputGroup.Append>
                            <Button onClick={() => this.addClient(this.state.client_addr)}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>}
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BillsDashboard;