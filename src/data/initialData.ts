import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  desc: '',
  qty: '1',
  price: '0.00',
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  clientID:'1',
  companyID:'1',
  companyName: '',
  companyAddr: '',
  email: '',
  clientName: '',
  clientAddr: '',
  clientEmail: '',
  invoiceId: '',
  invoiceDate: '',
  dueDate: '',
  productLines: [
    {
      desc: 'Brochure Design',
      qty: '2',
      price: '100.00',
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  advancePercent: '50',
  note: 'It was great doing business with you.',
  totalAmount: '1000.00',
  dueAmount: '100',
  discount: '10',
  tax: '10',
}
