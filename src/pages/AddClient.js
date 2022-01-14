import React from 'react';
import {Row, Col, Card, Form, Table, Button, InputGroup, FormControl} from 'react-bootstrap';

import Aux from "../hoc/_Aux";

import {loadWeb3, loadAccount, getCompanyId, web3, addClient, getAllCompanies} from "../services/web3";

import avatar2 from '../assets/images/user/avatar-2.jpg';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Dialog from 'react-bootstrap-dialog';

class BillsDashboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wallet: '', companyId: 0, clientAddr: '', discount: 20, clients: []};
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
            this.dialog.showAlert(`Client '${clientAddr}' is an invalid address`);
            return;
        }
        const result = await addClient(clientAddr, discount);
        if (result) {
            this.dialog.showAlert(`Client '${clientAddr}' added successfully!`);
            this.props.history.push('/dashboard');
        }
        else {
            this.addClient.showAlert(`Something went wrong!`);
        }
    }

    async getClients(){
        await this.fetchAccount();
        try{
            const companies = await getAllCompanies();
            companies.forEach(company => {
                const client = {'id': company.companyId, 'data': company}
                this.setState({
                    clients: [...this.state.clients, client]
                });
            })

        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getClients();
    }  

    filterSuggestedClients(){
        let clients = [];
        this.state.clients.forEach(client => {
            if(client.data.companyAddr !== this.state.wallet) clients.push(client);
        });
        return clients;
    }

    render() {
        let suggestedClients = [];

        let clients = this.filterSuggestedClients();

        clients.forEach(client => {
            suggestedClients.push(
                <tr className="unread" key = {client.id}>
                    <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                    <td>
                        <h6 className="mb-1">{client.data.companyAddr}</h6>
                    </td>
                    <td>
                        <p className="m-0">{client.data.name}</p>
                        <p className="m-0">{client.data.email}</p>
                    </td>
                </tr>
            );
        });

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
                    
                    <Form.Label htmlFor="customRange1">Discount for the client</Form.Label>
                    <RangeSlider value={this.state.discount} onChange={e=>this.setState({discount: e.target.value})}/>
                
                    <InputGroup.Append>
                        <Button onClick={() => this.addClient()}>Add</Button>
                        <Dialog ref={(component) => { this.dialog = component }} />
                    </InputGroup.Append>
                    </div>
                    }
                    </Col>
                    
                    <Col md={12} xl={12} className='mt-5'>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Suggested Clients</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {suggestedClients}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BillsDashboard;