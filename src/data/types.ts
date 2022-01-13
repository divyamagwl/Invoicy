import { CSSProperties } from 'react'

export interface ProductLine {
  desc: string
  qty: string
  price: string
}

export interface Invoice {
  
  
  clientID:string
  companyID: string
  invoiceId: string
  invoiceDate: string
  dueDate: string
  note: string
  advancePercent: string
  productLines: ProductLine[]
  name: string
  companyAddr: string
  email: string
  
  totalAmount: string
  dueAmount: string
  discount: string
  tax: string

  clientName: string
  clientAddr: string
  clientEmail: string

  logo: string
  logoWidth: number
  title: string
  companyName: string 
  companyCountry: string
  billTo: string  
  clientCountry: string
  invoiceTitleLabel: string
  invoiceDateLabel: string
  invoiceDueDateLabel: string
  productLineDescription: string
  productLineQuantity: string
  productLineQuantityRate: string
  productLineQuantityAmount: string
  subTotalLabel: string
  taxLabel: string
  totalLabel: string
  currency: string
  notesLabel: string
  termLabel: string
  term: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
