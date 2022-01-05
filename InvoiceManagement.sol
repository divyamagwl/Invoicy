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

  //#################################################################
  //# Client
  //#################################################################

  struct Client {
    uint clientId;
    address clientaddr;
    bool isBlocked;
    uint discount; // In percentage
  }

  mapping(uint => Client[]) public companyToClients;

  function addClient(address _clientAddr) public {
    uint companyId = addrToCompany[msg.sender].companyId;
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
    uint companyId = addrToCompany[msg.sender].companyId;
    require(companyId > 0, "Company is not registered");
    return companyToClients[companyId];
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
  }

  // EVM has 16 parameter restriction so reduct number of parameter 
  // incase of Stack error
  struct Invoice {
    uint invoiceId;
    uint companyId;
    uint clientId;    
    Item[] items;
    uint totalAmount;
    uint dueAmount;
    uint advancePercent; // Percent of payment to be paid in advance
    bool isSettled; // Amount is paid or not
    string invoiceDate;
    string dueDate;
    Payment payment;
    string uploadDocURI; // IPFS link
    string note;
  }

  mapping(uint => Invoice[]) public clientToInvoices; // Company will reaise invoice for client 
  mapping(uint => Invoice[]) public companyToBills; // Clients will pay bill

  // TODO:
  // 1. Create Invoice
  // 2. Edit Invoice
  // 3. Pay bills
  // ...
}
