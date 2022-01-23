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
    address companyAddr;
  }

  mapping(address => Company) public addrToCompany;
  mapping(uint => Company) public idToCompany;

  function createCompany(
    string memory _name,
    string memory _email
  ) 
    public 
  {
    require(msg.sender != address(0), "Company wallet address cannot be 0x00...");
    require(msg.sender != addrToCompany[msg.sender].companyAddr, "Company with this wallet address already exists!");
    
    _companyIds.increment();
    uint256 companyId = _companyIds.current();

    Company memory company = Company(
      companyId,
      _name,
      _email,
      msg.sender
    );

    addrToCompany[msg.sender] = company;
    idToCompany[companyId] = company;
  }

  function getCompanyId(address addr) public view returns(uint) {
    return addrToCompany[addr].companyId;
  }

  function getCompanyAddr(uint companyId) public view returns(address) {
    Company memory company = idToCompany[companyId];
    return company.companyAddr;
  }

  function getAllCompanies() public view returns(
    uint[] memory, 
    string[] memory, 
    string[] memory, 
    address[] memory
  ) {
    uint256 maxCompanies = _companyIds.current();
    uint[] memory companyIdList = new uint[](maxCompanies);
    string[] memory namesList = new string[](maxCompanies);
    string[] memory emailList = new string[](maxCompanies);
    address[] memory addressList = new address[](maxCompanies);

    for (uint i = 1; i <= maxCompanies; i++) {
      Company memory company = idToCompany[i];
      companyIdList[i-1] = company.companyId;
      namesList[i-1] = company.name;
      emailList[i-1] = company.email;
      addressList[i-1] = company.companyAddr;
    }

    return (
      companyIdList,
      namesList,
      emailList,
      addressList
    );
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

  function addClient(address _clientAddr, uint discount) public {
    uint companyId = getCompanyId(msg.sender);
    require(companyId > 0, "Company is not registered");
    uint256 clientId = companyToClients[companyId].length;

    companyToClients[companyId].push(Client(
      clientId,
      _clientAddr,
      false,
      discount
    ));
  }

  function getAllClients() public view returns(Client[] memory) {
    uint companyId = getCompanyId(msg.sender);
    require(companyId > 0, "Company is not registered");
    return companyToClients[companyId];
  }

  function getClientCompanyId(
    uint companyId, 
    uint clientId
  ) 
    private 
    view 
    returns(uint) 
  {
    address clientAddr = companyToClients[companyId][clientId].clientAddr;
    uint clientCompanyId = getCompanyId(clientAddr);
    // require(clientCompanyId > 0, "Client Company is not registered on portal");
    return clientCompanyId;
  }

  function updateClientBlockedStatus(uint companyId, uint clientId) public {
    Client storage client = companyToClients[companyId][clientId];
    client.isBlocked = !client.isBlocked;
  }

  function updateClientDiscount(uint companyId, uint clientId, uint discount) public {
    Client storage client = companyToClients[companyId][clientId];
    client.discount = discount;
  }

  //#################################################################
  //# Invoice
  //#################################################################

  struct Item {
    string desc;
    uint qty;
    uint price;
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
    bool workCompleted;
    bool isSettled; // Amount is paid or not
    string invoiceDate;
    string dueDate;
    string uploadDocURI; // IPFS link
    string note;
  }

  Invoice[] public invoices;
  mapping(uint => mapping(uint => uint[])) private companyToClientToInvoices; // Supplier raises invoice for client 
  mapping(uint => uint[]) private companyToBills; // Clients will pay bill

  function addNewInvoice(
    uint companyId,
    uint clientId,
    Item[] memory _items,
    Payment memory payment,
    bool workCompleted,
    string memory invoiceDate,
    string memory dueDate,
    string memory uploadDocURI ,
    string memory note
  ) 
    public 
  {
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
      item.price = _items[i].price;
      item.discount = _items[i].discount;
      item.tax = _items[i].tax;
      invoice.items.push(item);
    }

    invoice.payment = payment;
    invoice.workCompleted = workCompleted;
    invoice.isSettled = false;
    invoice.invoiceDate = invoiceDate;
    invoice.dueDate = dueDate;
    invoice.uploadDocURI = uploadDocURI;
    invoice.note = note;

    companyToClientToInvoices[companyId][clientId].push(invoiceId);
    uint clientCompanyId = getClientCompanyId(companyId, clientId);
    companyToBills[clientCompanyId].push(invoiceId);

    _invoiceIds.increment();
  }

  function getAllInvoicesByClient(
    uint companyId, 
    uint clientId
  ) 
    public 
    view 
    returns (uint[] memory) 
  {
    return companyToClientToInvoices[companyId][clientId];
  }

  function getAllBills(uint companyId) 
    public 
    view 
    returns (uint[] memory) 
  {
    return companyToBills[companyId];
  }

  function getItemsbyInvoice(uint invoiceId) public view 
    returns (
      string[] memory, 
      uint[] memory, 
      uint[] memory, 
      uint[] memory, 
      uint[] memory
    ) 
  {
    Item[] memory items = invoices[invoiceId].items;
    uint numOfItems = items.length;
    string[] memory descList = new string[](numOfItems);
    uint[] memory qtyList = new uint[](numOfItems);
    uint[] memory priceList = new uint[](numOfItems);
    uint[] memory discountList = new uint[](numOfItems);
    uint[] memory taxList = new uint[](numOfItems);
      
    for (uint i = 0; i < numOfItems; i++) {
      Item memory item = items[i];
      descList[i] = item.desc;
      qtyList[i] = item.qty;
      priceList[i] = item.price;
      discountList[i] = item.discount;
      taxList[i] = item.tax;
    }
        
    return (
      descList, 
      qtyList, 
      priceList, 
      discountList, 
      taxList
    );
  }

  function payBill(uint invoiceId) public payable {
    Invoice storage invoice = invoices[invoiceId];

    uint supplierCompanyId = invoice.companyId; // Supplier -> Service Provider
    address supplierAddr = getCompanyAddr(supplierCompanyId);
    require(supplierAddr != address(0), "Supplier does not exist");

    uint advance = invoice.payment.advancePercent;
    uint dueAmount = invoice.payment.dueAmount;
    bool workCompleted = invoice.workCompleted;

    if(advance == 100 || advance == 0) {
      require(msg.value >= dueAmount, "Please transfer money according to due amount");
      sendFunds(supplierAddr, msg.value);
      dueAmount = 0;
    }
    else {
      if(!workCompleted) {
        uint amountToBePaid = dueAmount * (advance / 100);
        require(msg.value >= amountToBePaid, 
        "Please transfer money according to due amount and advance");
        sendFunds(supplierAddr, msg.value);
        dueAmount -= msg.value;
      }
      else {
        require(msg.value >= dueAmount, "Please transfer money according to due amount");
        sendFunds(supplierAddr, msg.value);
        dueAmount = 0;
      }
    }

    if(dueAmount == 0) {
      invoice.isSettled = true;
    }
    invoice.payment.dueAmount = dueAmount;
  }

  function sendFunds(address beneficiary, uint value) private {
    address payable addr = payable(beneficiary);
    addr.transfer(value);
  }

  function updateInvoice(
    uint invoiceId,
    Item[] memory _items,
    Payment memory payment,
    bool workCompleted,
    string memory invoiceDate,
    string memory dueDate,
    string memory uploadDocURI ,
    string memory note
  ) 
    public 
  {
    Invoice storage invoice = invoices[invoiceId];

    for(uint i = 0; i < _items.length; i++) {
      Item memory item;
      item.desc = _items[i].desc;
      item.qty = _items[i].qty;
      item.price = _items[i].price;
      item.discount = _items[i].discount;
      item.tax = _items[i].tax;
      invoice.items.push(item);
    }

    invoice.payment = payment;
    invoice.workCompleted = workCompleted;
    invoice.invoiceDate = invoiceDate;
    invoice.dueDate = dueDate;
    invoice.uploadDocURI = uploadDocURI;
    invoice.note = note;
  }

  function updateInvoiceWorkCompleted(uint invoiceId) public {
    Invoice storage invoice = invoices[invoiceId];
    invoice.workCompleted = !invoice.workCompleted;
  }

}