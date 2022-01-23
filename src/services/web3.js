import Web3 from "web3";
import { InvoiceManagement_ABI } from "../abi/InvoiceManagment_abi";

require('dotenv').config();

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

// export const web3 = window.web3;
export const web3 = new Web3(Web3.givenProvider);

export const loadAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  return account;
};

const InvoiceManagement_addr = process.env.REACT_APP_INVOICEMANAGEMENT_ADDR;
export const InvoiceManagement_Contract = new web3.eth.Contract(
  InvoiceManagement_ABI,
  InvoiceManagement_addr
);

//#################################################################
//# Company
//#################################################################

export const createCompany = async (name, email) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
    const result = await InvoiceManagement_Contract.methods
    .createCompany(name, email)
    .send({
      from: account,
    });
    
  if (result) return true;
  } catch (error) {
    const reason = error.message.split("reason\":\"")[1].split('"}')[0]
    window.alert(reason)
    return false;
  }

};

export const getCompanyId = async (address) => {
  if(address === undefined) {  // Optional parameter
    const accounts = await web3.eth.getAccounts();
    address = accounts[0];
  }
  const companyId = await InvoiceManagement_Contract.methods
    .getCompanyId(address)
    .call();
  return companyId;
};

export const getCompanyById = async (companyId) => {
  const company = await InvoiceManagement_Contract.methods
    .idToCompany(companyId)
    .call();

  return company;
};


export const getAllCompanies = async () => {
  const data = await InvoiceManagement_Contract.methods
    .getAllCompanies()
    .call();

  const companies = []
  for(var i = 0; i < data[0].length; i++) {
    const company = {
      'companyId': data[0][i],
      'name': data[1][i],
      'email': data[2][i],
      'companyAddr': data[3][i],
    }
    companies.push(company);
  }
  console.log(companies);
  return companies;
};


//#################################################################
//# Client
//#################################################################

export const addClient = async (clientAddr, discount) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .addClient(clientAddr, discount)
    .send({
      from: account,
    });

  if (result) return true;
  else return false;
};


export const getAllClients = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const clients = await InvoiceManagement_Contract.methods
    .getAllClients()
    .call({
      from: account,
    });
  return clients;
};


export const getClientbyId = async (companyId, clientId) => {
  const client = await InvoiceManagement_Contract.methods
    .companyToClients(companyId, clientId)
    .call();
  return client;
};

export const updateClientDiscount = async (companyId, clientId, discount) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .updateClientDiscount(companyId, clientId, discount)
    .send({
      from: account,
    });

  if (result) return true;
  else return false;
};

export const updateClientBlockedStatus = async (companyId, clientId) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .updateClientBlockedStatus(companyId, clientId)
    .send({
      from: account,
    });

  if (result) return true;
  else return false;
};


//#################################################################
//# Invoice
//#################################################################

export const getAllBillsByCompany = async (companyId) => {
  const invoiceIds = await InvoiceManagement_Contract.methods
    .getAllBills(companyId)
    .call();
  return invoiceIds;
};

export const getClientCompany = async (companyId, clientId) => {
  const clientForCompany = await getClientbyId(companyId, clientId)
  const clientAddr = clientForCompany['clientAddr']
  const clientCompanyId = await getCompanyId(clientAddr);
  const clientCompany = await getCompanyById(clientCompanyId);
  return clientCompany;
}

export const getInvoiceDetails = async (invoiceId) => {
  const invoice = await InvoiceManagement_Contract.methods
    .invoices(invoiceId)
    .call();

  const items = await getItemsbyInvoice(invoiceId);
  invoice['items'] = items;

  const company = await getCompanyById(invoice.companyId);
  invoice['company'] = company;

  const clientCompany = await getClientCompany(invoice.companyId, invoice.clientId)
  invoice['client'] = clientCompany;

  return invoice;
};
export const createInvoice = async (array) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .addNewInvoice(...array)
    .send({
      from: account,
    });

  if (result) return true;
  else return false;
};

export const getItemsbyInvoice = async (invoiceId) => {
  const items = await InvoiceManagement_Contract.methods
    .getItemsbyInvoice(invoiceId)
    .call();

  const itemArr = []
  for(var i = 0; i < items[0].length; i++) {
    const item = {
      'desc': items[0][i],
      'qty': items[1][i],
      'price': items[2][i],
      'discount': items[3][i],
      'tax': items[4][i]
    }
    itemArr.push(item);
  }

  return itemArr;
};


export const payBill = async (invoiceId, amount) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await InvoiceManagement_Contract.methods
    .payBill(invoiceId)
    .send({
      from: account,
      value: amount,
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", function (confirmationNumber, receipt) {
      window.alert("Money has been transferred successfully!");
    })
    .on("error", function (error, receipt) {
      console.log(error);
      window.alert("An error has occured!");
    });

  window.location.reload();
  console.log(result);
};

export const getAllInvoicesByClient = async (companyId, clientId) => {
  const invoiceIds = await InvoiceManagement_Contract.methods
    .getAllInvoicesByClient(companyId, clientId)
    .call();
  return invoiceIds;
};


export const updateInvoiceWorkCompletedStatus = async (invoiceId) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .updateInvoiceWorkCompleted(invoiceId)
    .send({
      from: account,
    });

  if (result) return true;
  else return false;
};