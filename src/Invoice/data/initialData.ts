import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  desc: '',
  qty: '1',
  price: '0.00',
}

export const initialInvoice: Invoice = {
  clientId:'1',
  companyId:'1',
  companyName: '',
  companyAddr: '',
  email: '',
  clientName: '',
  clientAddr: '',
  clientEmail: '',
  invoiceId: '1',
  invoiceDate: 'Jan 15, 2022',
  dueDate: 'Feb 24, 2022',
  productLines: [
    {
      desc: 'Item 1',
      qty: '2',
      price: '10.00',
    }
  ],
  advancePercent: '50',
  note: 'It was great doing business with you.',
  totalAmount: '18.00',
  dueAmount: '18.00',
  discount: '20',
  tax: '10',
  method: "ETH",
  network: "Ethereum",

  workCompleted:"false",
  isSettled: "false",
  uploadDocURI: "www.google.com"
}
