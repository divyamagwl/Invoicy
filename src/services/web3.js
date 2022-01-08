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
  const result = await InvoiceManagement_Contract.methods
    .createCompany(name, email)
    .send({
      from: account,
    });

  console.log(result);
  if (result) return true;
  else return false;
};

export const checkCompanyExists = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const companyId = await InvoiceManagement_Contract.methods
    .getCompanyId(account)
    .call();

  if (companyId > 0) return true;
  else return false;
};
