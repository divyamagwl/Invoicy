import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import DEMO from "../store/constant";

import avatar1 from '../assets/images/user/avatar-1.jpg';
import avatar2 from '../assets/images/user/avatar-2.jpg';
import avatar3 from '../assets/images/user/avatar-3.jpg';
import invoiceData from './invoices.json'

import {web3} from '../services/web3';
import {loadWeb3, loadAccount, getCompanyId} from "../services/web3";

import NVD3Chart from 'react-nvd3';

const pieChartData = [
    {key: "Type1", y: 33, color: "#1de9b6"},
    {key: "Type2", y: 33, color: "#f4c22b"},
    {key: "Type3", y: 33, color: "#ff8a65"},
];

function lineChart() {
    var raised = [],
        pending = [];
    for (var i = 0; i < 365; i++) {
        raised.push({
            'x': i,
            'y': 400*(Math.sin(i / 70) * 0.25 + 0.5)
        });
        pending.push({
            'x': i,
            'y': Math.abs(100*(Math.sin(i / 100)))
        });
    }
    return [
        {
            values: raised,
            key: 'Invoices Raised',
            color: '#1de9b6',
            area: true
        },
        {
            values: pending,
            key: 'Pending Invoices',
            color: '#ff8a65'
        }
    ];
}

const _clients = 
[
    {
        "id":"0",
        "data": {
            "clientId" : 0,
            "clientAddr" : "0x123456789",
            "isBlocked" : false,
            "discount" : 97,
            "numInvoices" : 10
        }
    },
    {
        "id":"1",
        "data": {
            "clientId" : 1,
            "clientAddr" : "0x987654321",
            "isBlocked" : false,
            "discount" : 97,
            "numInvoices" : 10
        }
    },
    {
        "id":"2",
        "data": {
            "clientId" : 2,
            "clientAddr" : "0x1234598765",
            "isBlocked" : false,
            "discount" : 97,
            "numInvoices" : 10
        }
    }
];

const _topPendingInvoices =
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
]

class Dashboard extends React.Component {

    constructor (props) {
        super(props);        
        this.state = {wallet: '', companyId: 0, clients: [], topInvoices: []};
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

    /*Set both clients and topInvoices state vars*/
    async getClients(){
        try{
            ; 
        }catch{
            ;
        }
    }

    componentDidMount() {
        this.getClients();
    }  

    render() {       
        let topPendingInvoices = [];
        let clients = [];
        let totalInvoices = 100;
        let totalPendingInvoices = 56;
        let totalClients = 30;

        _topPendingInvoices.forEach(invoice => {
            topPendingInvoices.push(
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
                        <h6 className="text-muted">10 ETH</h6>
                    </td>
                    <td>
                        <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">View Details</a>
                        <button style={{border: 0}} onClick={() => {alert("Reminder sent!")}} className="label theme-bg text-white f-12">Remind</button>
                    </td>
                </tr>
            )
        })

        _clients.forEach(client => {
            clients.push(
                <tr className="unread" key = {client.id}>
                    <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                    <td>
                        <h6 className="mb-1">{client.data.clientAddr}</h6>
                        <p className="m-0">Name</p>
                    </td>
                    <td>
                        <h6 className="text-muted">{client.data.numInvoices} Invoices</h6>
                    </td>
                    <td><a href={'/clients/'+client.data.clientId} className="label theme-bg text-white f-12">View Details</a></td>
                </tr>
            );
        });

        return (
            <Aux>
                <Row>
                    {/* Row 1 */}
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Invoices Generated</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-file-text f-30 m-r-5"/>{totalInvoices}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Pending Invoices</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-file-text text-c-red f-30 m-r-5"/>{totalPendingInvoices}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Clients</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-users f-30 m-r-5"/> {totalClients}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Row 2 */}
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Types of Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                            <NVD3Chart id="chart" height={300} type="pieChart" datum={pieChartData} x="key" y="y"  />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Invoices Raised</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <div>
                                    {
                                        React.createElement(NVD3Chart, {
                                            xAxis: {
                                                tickFormat: function(d){ return d; },
                                                axisLabel: 'Time (days)'
                                            },
                                            yAxis: {
                                                axisLabel: 'Invoices Count',
                                                tickFormat: function(d) {return parseFloat(d).toFixed(2); }
                                            },
                                            type:'lineChart',
                                            datum: lineChart(),
                                            x: 'x',
                                            y: 'y',
                                            height: 300,
                                            renderEnd: function(){
                                                console.log('renderEnd');
                                            }
                                        })
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    {/* Row 3 */}
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Top Pending Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {topPendingInvoices}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Row 4 */}
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Clients</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {clients}
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