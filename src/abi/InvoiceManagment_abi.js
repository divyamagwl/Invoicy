export const InvoiceManagement_ABI = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "discount",
				"type": "uint256"
			}
		],
		"name": "addClient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "desc",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "qty",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "discount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tax",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Item[]",
				"name": "_items",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "method",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "network",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dueAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "advancePercent",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Payment",
				"name": "payment",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "workCompleted",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "invoiceDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dueDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uploadDocURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"name": "addNewInvoice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addrToCompany",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "companyAddr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "companyToClients",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "clientAddr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isBlocked",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "discount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "createCompany",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			}
		],
		"name": "getAllBills",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllClients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "clientId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "clientAddr",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isBlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "discount",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Client[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCompanies",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			}
		],
		"name": "getAllInvoicesByClient",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			}
		],
		"name": "getCompanyAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getCompanyId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			}
		],
		"name": "getItemsbyInvoice",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToCompany",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "companyAddr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "invoices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "method",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "network",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dueAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "advancePercent",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Payment",
				"name": "payment",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "workCompleted",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isSettled",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "invoiceDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dueDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uploadDocURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			}
		],
		"name": "payBill",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			}
		],
		"name": "updateClientBlockedStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "companyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "clientId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "discount",
				"type": "uint256"
			}
		],
		"name": "updateClientDiscount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "desc",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "qty",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "discount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tax",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Item[]",
				"name": "_items",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "method",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "network",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dueAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "advancePercent",
						"type": "uint256"
					}
				],
				"internalType": "struct InvoiceManagement.Payment",
				"name": "payment",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "workCompleted",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "invoiceDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dueDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uploadDocURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"name": "updateInvoice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			}
		],
		"name": "updateInvoiceWorkCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]