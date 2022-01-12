import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import DEMO from "../store/constant";

import avatar1 from '../assets/images/user/avatar-1.jpg';
import avatar2 from '../assets/images/user/avatar-2.jpg';

import {web3, getAllBillsByCompany, getInvoiceDetails, payBill} from '../services/web3';
import {loadWeb3, loadAccount, getCompanyId} from "../services/web3";
import {invoiceData} from "../components/dummyData";

class BillsDashboard extends React.Component {

    constructor (props) {
        super(props);
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

    async getBills() {
        await this.fetchAccount();
        try{
            const ids = await getAllBillsByCompany(this.state.companyId);
            ids.forEach(async id => {
                const data = await getInvoiceDetails(id);
                const invoice = {'id': id, 'data': data}
                this.setState({
                    invoices:[...this.state.invoices, invoice]
                });
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getBills();
    }  

    async payInvoice(invoice) {
        // console.log(invoice)
        const invoiceId = invoice.id;
        const advance =  parseInt(invoice.data.payment.advancePercent);
        const workCompleted = invoice.data.workCompleted;
        var amount;
        if(advance === 0 || advance === 100) {
            amount = invoice.data.payment.dueAmount;
        }
        else {
            if(!workCompleted) {
                amount = invoice.data.payment.dueAmount * (advance / 100);
            }
            else {
                amount = invoice.data.payment.dueAmount;
            }
        }
        await payBill(invoiceId, amount);
    }

    viewDetails(invoice) {
        this.props.history.push({
            pathname: '/view-invoice/',
            state: { invoice: invoiceData }
            // state: { invoice: invoice }
        })
    }

    render() {
        const invoices = this.state.invoices;
        let settledData  = []
        let pendingData  = []
        let totalMoneySpent = 0
        let totalMoneyDue = 0

        invoices.forEach(invoice => {
            if(invoice.data.isSettled){
                settledData.push(
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
                totalMoneySpent += parseFloat(web3.utils.fromWei(invoice.data.payment.totalAmount));
            }
            else{
            pendingData.push(
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
                        {/* <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">View Details</a> */}
                        <button style={{border: 0}} onClick={() => this.viewDetails(invoice)} className="label theme-bg text-white f-12">View Details</button>
                        <button style={{border: 0}} onClick={() => this.payInvoice(invoice)} className="label theme-bg text-white f-12">Pay</button>
                    </td>
                </tr>
            )
            totalMoneyDue += parseFloat(web3.utils.fromWei(invoice.data.payment.dueAmount));
            }
        })
        var settledProgressBar = (settledData.length / (settledData.length + pendingData.length) * 100).toString();
        var pendingProgressBar = (pendingData.length / (settledData.length + pendingData.length) * 100).toString();
        var paymentProgressBar = (totalMoneySpent / (totalMoneySpent + totalMoneyDue) * 100).toString();
        
        // invoiceData.
        // const tabContent = (
        //     <Aux>
        //         <div className="media friendlist-box align-items-center justify-content-center m-b-20">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Silje Larsen</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
        //             </div>
        //         </div>
        //         <div className="media friendlist-box align-items-center justify-content-center m-b-20">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Julie Vad</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3544</span>
        //             </div>
        //         </div>
        //         <div className="media friendlist-box align-items-center justify-content-center m-b-20">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Storm Hanse</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>2739</span>
        //             </div>
        //         </div>
        //         <div className="media friendlist-box align-items-center justify-content-center m-b-20">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Frida Thomse</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>1032</span>
        //             </div>
        //         </div>
        //         <div className="media friendlist-box align-items-center justify-content-center m-b-20">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Silje Larsen</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>8750</span>
        //             </div>
        //         </div>
        //         <div className="media friendlist-box align-items-center justify-content-center">
        //             <div className="m-r-10 photo-table">
        //                 <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
        //             </div>
        //             <div className="media-body">
        //                 <h6 className="m-0 d-inline">Storm Hanse</h6>
        //                 <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>8750</span>
        //             </div>
        //         </div>
        //     </Aux>
        // );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Settled Bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{settledData.length}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{settledProgressBar}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" 
                                    style={{width: settledProgressBar.concat("%")}} 
                                    aria-valuenow={settledProgressBar} 
                                    aria-valuemin="0" aria-valuemax="100"
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Pending Bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/>{pendingData.length}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{pendingProgressBar}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" 
                                    style={{width: pendingProgressBar.concat("%")}} 
                                    aria-valuenow={pendingProgressBar} 
                                    aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Money Sent</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> {totalMoneySpent} ETH</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{paymentProgressBar.substring(0, 5)}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" 
                                    style={{width: paymentProgressBar.concat("%")}} 
                                    aria-valuenow={paymentProgressBar} 
                                    aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={10} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Pending Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {pendingData}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={10} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Settled Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {settledData}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        {/* <i className="fa fa-facebook text-primary f-36"/> */}
                                        <h3>Company X</h3>
                                    </div>
                                    <div className="col text-right">
                                        <h3>12,280</h3>
                                        <h5 className="text-c-green mb-0"><span className="text-muted">Total Amount to Pay</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Paid:</span>6,140</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>28 days</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '10%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        {/* <i className="fa fa-facebook text-primary f-36"/> */}
                                        <h3>Company Y</h3>
                                    </div>
                                    <div className="col text-right">
                                        <h3>5,280</h3>
                                        <h5 className="text-c-green mb-0"><span className="text-muted">Total Amount to Pay</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Paid:</span>0</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '1%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>2 months</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '2%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Rating</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center m-b-20">
                                    <div className="col-6">
                                        <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>5</h6>
                                        <h6 className="align-items-center float-right">384</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>4</h6>
                                        <h6 className="align-items-center float-right">145</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>3</h6>
                                        <h6 className="align-items-center float-right">24</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>2</h6>
                                        <h6 className="align-items-center float-right">1</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>1</h6>
                                        <h6 className="align-items-center float-right">0</h6>
                                        <div className="progress m-t-30  m-b-5" style={{height: '6px'}}>
                                            <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col md={6} xl={8} className='m-b-30'>
                        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                            <Tab eventKey="today" title="Today">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="week" title="This Week">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="all" title="All">
                                {tabContent}
                            </Tab>
                        </Tabs>
                    </Col> */}
                </Row>
            </Aux>
        );
    }
}

export default BillsDashboard;