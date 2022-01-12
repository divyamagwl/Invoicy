import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import DEMO from "../store/constant";

import avatar1 from '../assets/images/user/avatar-1.jpg';
import avatar2 from '../assets/images/user/avatar-2.jpg';

import {web3, loadWeb3, loadAccount, getCompanyId, getAllInvoicesByClient, getInvoiceDetails} from "../services/web3";

const _invoices =
[
    {
        "id":"0",
        "data": {
            "company": {
                "name": "ClientX",
                "email": "xyz@gnail.com",
                "companyId": 1,
                "companyAddr": "0x5cB2dB3A9c7C073D619C637dfD99dE2cf2C51037"
            },
            "invoiceId": 0,
            "companyId": 1,
            "clientId": 0,
            "items" : [ 
                {
                    "desc": "",
                    "qty":1,
                    "price":1,
                    "discount":1,
                    "tax":1
                }
            ],
            "payment": {    
                "method": "", 
                "network": "",
                "totalAmount":1000,
                "dueAmount":1,
                "advancePercent":1 
            },
            "workCompleted": false,
            "isSettled": false,
            "invoiceDate": "09-01-22",
            "dueDate": "09-02-22",
            "uploadDocURI": "", 
            "note": "Important"
        }
    },
    {
        "id":"1",
        "data": {
            "company": {
                "name": "ClientX",
                "email": "xyz@gnail.com",
                "companyId": 1,
                "companyAddr": "0x5cB2dB3A9c7C073D619C637dfD99dE2cf2C51037"
            },
            "invoiceId": 1,
            "companyId": 1,
            "clientId": 0,
            "items" : [ 
                {
                    "desc": "",
                    "qty":1,
                    "price":1,
                    "discount":1,
                    "tax":1
                }
            ],
            "payment": {    
                "method": "", 
                "network": "",
                "totalAmount":1500,
                "dueAmount":1,
                "advancePercent":1 
            },
            "workCompleted": false,
            "isSettled": false,
            "invoiceDate": "09-01-22",
            "dueDate": "25-02-22",
            "uploadDocURI": "", 
            "note": "Important"
        }
    },
    {
        "id":"2",
        "data": {
            "company": {
                "name": "ClientX",
                "email": "xyz@gnail.com",
                "companyId": 1,
                "companyAddr": "0x5cB2dB3A9c7C073D619C637dfD99dE2cf2C51037"
            },
            "invoiceId": 2,
            "companyId": 1,
            "clientId": 0,
            "items" : [ 
                {
                    "desc": "",
                    "qty":1,
                    "price":1,
                    "discount":1,
                    "tax":1
                }
            ],
            "payment": {    
                "method": "", 
                "network": "",
                "totalAmount":2000,
                "dueAmount":1,
                "advancePercent":1 
            },
            "workCompleted": false,
            "isSettled": true,
            "invoiceDate": "09-01-22",
            "dueDate": "15-03-22",
            "uploadDocURI": "", 
            "note": "Important"
        }
    }
];

class Dashboard extends React.Component {

    constructor (props) {
        super(props);      
        this.clientId = this.props.match.params.id;
        this.state = {wallet: '', companyId: 0, invoices: []};
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

    componentDidMount() {
        this.getInvoices();
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
                            <h6 className="mb-1">{invoice.data.company.name}</h6>
                            {/* <p className="m-0">{invoice.data.note}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>
    
                        <td>
                            <h6 className="text-muted">{web3.utils.fromWei(invoice.data.payment.totalAmount)} ETH</h6>
                        </td>
                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">View Details</a></td>
                    </tr>
                )
            }
            else{
                invoices.push(
                    <tr className="unread" key = {invoice.id}>
                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                        <td>
                            <h6 className="mb-1">{invoice.data.company.name}</h6>
                            {/* <p className="m-0">{invoice.data.note}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>

                        <td>
                            <h6 className="text-muted">{web3.utils.fromWei(invoice.data.payment.dueAmount)} ETH</h6>
                        </td>
                        <td>
                            <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">View Details</a>
                            <button style={{border: 0}} onClick={() => alert('Reminder sent!')} className="label theme-bg text-white f-12">Remind</button>
                        </td>
                    </tr>
                )
            }
        })


        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Invoices</Card.Title>
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
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;