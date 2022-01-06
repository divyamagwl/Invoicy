// SPDX-License-Identifier: MIT 
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract InvoiceManagement {
  using Counters for Counters.Counter;
  Counters.Counter private _companyIds;
  Counters.Counter private _invoiceIds;

  constructor() {}

  //#################################################################
  //# Company
  //#################################################################

  struct Company {
    uint companyId;
    string name;
    string email;
  }

  mapping(address => Company) public addrToCompany;

  function createCompany(
    string memory _name,
    string memory _email
  ) public {
    _companyIds.increment();
    uint256 companyId = _companyIds.current();

    addrToCompany[msg.sender] =  Company(
      companyId,
      _name,
      _email
    );
  }

  function getCompanyId(address addr) public view returns(uint) {
    return addrToCompany[addr].companyId;
  }

  //#################################################################
  //# Client
  //#################################################################

  struct Client {
    uint clientId;
    address clientAddr;
    bool isBlocked;
    uint discount; // In percentage
  }

  mapping(uint => Client[]) public companyToClients;

  function addClient(address _clientAddr) public {
    uint companyId = getCompanyId(msg.sender);
    require(companyId > 0, "Company is not registered");
    uint256 clientId = companyToClients[companyId].length;

    companyToClients[companyId].push(Client(
      clientId,
      _clientAddr,
      false,
      0
    ));
  }

  function getAllClients() public view returns(Client[] memory) {
    uint companyId = getCompanyId(msg.sender);
    require(companyId > 0, "Company is not registered");
    return companyToClients[companyId];
  }

  function getClientCompanyId(uint companyId, uint clientId) private view returns(uint) {
    address clientAddr = companyToClients[companyId][clientId].clientAddr;
    uint clientCompanyId = getCompanyId(clientAddr);
    // require(clientCompanyId > 0, "Client Company is not registered on portal");
    return clientCompanyId;
  }

  //#################################################################
  //# Invoice
  //#################################################################

  struct Item {
    string desc;
    uint qty;
    uint uintPrice;
    uint discount;
    uint tax;
  }

  struct Payment {
    string method; // Coin Name
    string network; // Blockchain network
    uint totalAmount;
    uint dueAmount;
    uint advancePercent; // Percent of payment to be paid in advance
  }

  // EVM has 16 parameter restriction so reduce number of parameter 
  // incase of Stack error
  struct Invoice {
    uint invoiceId;
    uint companyId;
    uint clientId;    
    Item[] items;
    Payment payment;
    bool isSettled; // Amount is paid or not
    string invoiceDate;
    string dueDate;
    string uploadDocURI; // IPFS link
    string note;
  }

  Invoice[] invoices;
  mapping(uint => mapping(uint => uint[])) public companyToClientToInvoices; // Company will raise invoice for client 
  mapping(uint => uint[]) public companyToBills; // Clients will pay bill


  function addNewInvoice(
    uint companyId,
    uint clientId,
    Item[] memory _items,
    Payment memory payment,
    bool isSettled,
    string memory invoiceDate,
    string memory dueDate,
    string memory uploadDocURI ,
    string memory note
  ) public {
    uint256 invoiceId = _invoiceIds.current();

    invoices.push();
    Invoice storage invoice = invoices[invoiceId];
    invoice.invoiceId = invoiceId;
    invoice.companyId = companyId;
    invoice.clientId = clientId;

    for(uint i = 0; i < _items.length; i++) {
      Item memory item;
      item.desc = _items[i].desc;
      item.qty = _items[i].qty;
      item.uintPrice = _items[i].uintPrice;
      item.discount = _items[i].discount;
      item.tax = _items[i].tax;
      invoice.items.push(item);
    }

    invoice.payment = payment;
    invoice.isSettled = isSettled;
    invoice.invoiceDate = invoiceDate;
    invoice.dueDate = dueDate;
    invoice.uploadDocURI = uploadDocURI;
    invoice.note = note;

    companyToClientToInvoices[companyId][clientId].push(invoiceId);
    uint clientCompanyId = getClientCompanyId(companyId, clientId);
    companyToBills[clientCompanyId].push(invoiceId);

    _invoiceIds.increment();
  }

  // TODO:
  // 2. Edit Invoice
  // 3. Pay bills
  // 4. Getters for companyToClientToInvoices and comapanyToBills
  // ...
}
