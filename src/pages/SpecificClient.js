import React from 'react';
import {Row, Col, Card, Table, Button} from 'react-bootstrap';

import Aux from "../hoc/_Aux";

import avatar2 from '../assets/images/user/avatar-2.jpg';

import {web3, loadWeb3, loadAccount, getCompanyId, getCompanyById, updateClientBlockedStatus, updateInvoiceWorkCompletedStatus,
    getAllInvoicesByClient, getInvoiceDetails, getClientbyId, updateClientDiscount} from "../services/web3";
import Dialog from 'react-bootstrap-dialog';
import RangeSlider from 'react-bootstrap-range-slider';


class ClientDashboard extends React.Component {

    constructor (props) {
        super(props);      
        this.clientId = this.props.match.params.id;
        this.state = {wallet: '', companyId: 0, client:{}, invoices: [], discount: 0};
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

    async getInvoices(){
        try{
            await this.fetchAccount();
            const ids = await getAllInvoicesByClient(this.state.companyId, this.clientId);
            ids.forEach(async id => {
                const data = await getInvoiceDetails(id);
                const invoice = {'id': id, 'data': data}
                this.setState({
                    invoices: [...this.state.invoices, invoice]
                });
            })
        }catch(e){
                console.log(e);
            }
    }

    async getClientDetails(){
        try{
            await this.fetchAccount();
            const client = await getClientbyId(this.state.companyId, this.clientId);
            const companyId = await getCompanyId(client.clientAddr);
            const company = await getCompanyById(companyId);
            const data = {...client, ...company}
            this.setState({
                client: data
            })
            this.setState({discount: this.state.client.discount});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getClientDetails();
        this.getInvoices();
    }  

    async updateDiscount(discount) {
        const result = await updateClientDiscount(this.state.companyId, this.clientId, discount);
        if(result) {
            this.dialog.showAlert('Success!');
            this.setState({
                client: {...this.state.client, 
                    discount: discount
                }
            });
        }
        else {
            this.dialog.showAlert('Something went wrong!');
        }
    }

    async blockClient() {
        const result = await updateClientBlockedStatus(this.state.companyId, this.clientId);
        if(result) {
            this.dialog.showAlert('Success!');
            this.props.history.push({
                pathname: '/dashboard'
            })
        }
        else {
            this.dialog.showAlert('Something went wrong!');
        }
    }

    async updateWorkStatus(invoiceId) {
        const result = await updateInvoiceWorkCompletedStatus(invoiceId);
        if(result) {
            this.dialog.showAlert('Success!');
            window.location.reload();
        }
        else {
            this.dialog.showAlert('Something went wrong!');
        }
    }

    viewDetails(invoice) {
        this.props.history.push({
            pathname: '/view-invoice/',
            state: { invoice: invoice }
        })
    }

    render() {       
        let invoices = [];
        let completedInvoices = [];

        this.state.invoices.forEach(invoice => {
            if(invoice.data.isSettled){
                completedInvoices.push(
                    <tr className="unread" key = {invoice.id}>
                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                        <td>
                            <h6 className="mb-1">{invoice.data.client.name}</h6>
                            <p className="m-0">{invoice.data.client.email}</p>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>    
                        <td>
                            <h6 className="text-muted">{parseFloat(web3.utils.fromWei(invoice.data.payment.totalAmount)).toFixed(2)} ETH</h6>
                        </td>
                        <td>
                            <h6 className="text-muted">Work Status: &nbsp; 
                            {
                                invoice.data.workCompleted &&
                                <span className="text-success">Completed</span>
                            }
                            {
                                !invoice.data.workCompleted &&
                                <span className="text-danger">Not Completed</span>
                            }
                            </h6>
                        </td>
                        <td>
                        <button style={{border: 0}} onClick={() => this.viewDetails(invoice)} className="label theme-bg text-white f-12">View Details</button>
                        <button style={{border: 0}} onClick={() => this.updateWorkStatus(invoice.id)} className="label theme-bg text-white f-12">
                            {
                                !invoice.data.workCompleted &&
                                "Update Progress"
                            }
                            {
                                invoice.data.workCompleted &&
                                "Delete Progress"
                            }
                        </button>
                        </td>
                    </tr>
                )
            }
            else{
                invoices.push(
                    <tr className="unread" key = {invoice.id}>
                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                        <td>
                            <h6 className="mb-1">{invoice.data.client.name}</h6>
                            <p className="m-0">{invoice.data.client.email}</p>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>

                        <td>
                            <h6 className="text-muted">{parseFloat(web3.utils.fromWei(invoice.data.payment.dueAmount)).toFixed(2)} ETH due</h6>
                        </td>
                        <td>
                            <h6 className="text-muted">Work Status: &nbsp; 
                            {
                                invoice.data.workCompleted &&
                                <span className="text-success">Completed</span>
                            }
                            {
                                !invoice.data.workCompleted &&
                                <span className="text-danger">Not Completed</span>
                            }
                            </h6>
                        </td>
                        <td>
                            <button style={{border: 0}} onClick={() => this.viewDetails(invoice)} className="label theme-bg text-white f-12">View Details</button>
                            <button style={{border: 0}} onClick={() => this.updateWorkStatus(invoice.id)} className="label theme-bg text-white f-12">
                            {
                                !invoice.data.workCompleted &&
                                "Update Progress"
                            }
                            {
                                invoice.data.workCompleted &&
                                "Delete Progress"
                            }                            
                            </button>
                            <button style={{border: 0}} onClick={() => this.dialog.showAlert('Reminder sent!')} className="label theme-bg2 text-white f-12">Remind</button>
                            <Dialog ref={(component) => { this.dialog = component }} />
                        </td>
                    </tr>
                )
            }
        })


        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <div className="justify-content-center text-center"><img className="rounded-circle" style={{width: '140px'}} src={avatar2} alt="user"/></div>
                        <div className="mt-3 text-center">
                            <h4 className="mb-0">{this.state.client.name}</h4> 
                            <span className="text-muted d-block mb-2">{this.state.client.email}</span>
                            <span className="text-muted d-block mb-2">{this.state.client.clientAddr}</span> 
                            <h5 className="mb-3">Discount: {this.state.client.discount} %</h5> 
                            <span><RangeSlider value={this.state.discount} onChange={e=>this.setState({discount: e.target.value})}/></span>
                            <Button size='sm' onClick={() => {this.updateDiscount(this.state.discount)}}>Update Discount</Button>
                        </div>  
                    </Col>

                    <Col md={12} xl={12}>
                        <Card className='Recent-Users mt-5'>
                            <Card.Header>
                                <Card.Title as='h5'>Pending Invoices</Card.Title>
                            </Card.Header>
                            
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {invoices}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Settled Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {completedInvoices}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {
                        !this.state.client.isBlocked &&
                        <Col md={12} xl={12}>
                        <div className="justify-content-center text-center">
                            <Button variant='danger' onClick={() => this.blockClient()}>Block Client</Button>
                            <Dialog ref={(component) => { this.dialog = component }} />
                        </div>
                        </Col>
                    }
                    {
                        this.state.client.isBlocked &&
                        <Col md={12} xl={12}>
                        <div className="justify-content-center text-center">
                            <Button variant='primary' onClick={() => this.blockClient()}>Unblock Client</Button>
                            <Dialog ref={(component) => { this.dialog = component }} />
                        </div>
                        </Col>
                    }
                </Row>
            </Aux>
        );
    }
}

export default ClientDashboard;