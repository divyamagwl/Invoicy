import { CSSProperties } from 'react'

export interface ProductLine {
  desc: string
  qty: string
  price: string
}

export interface Invoice {
  
  clientId:string
  companyId: string
  invoiceId: string

  invoiceDate: string
  dueDate: string

  note: string

  method: string
  network: string
  totalAmount: string
  dueAmount: string
  advancePercent: string

  productLines: ProductLine[]
  discount: string
  tax: string

  companyName: string 
  companyAddr: string
  email: string
  
  clientName: string
  clientAddr: string
  clientEmail: string

  workCompleted: string,
  isSettled: string,
  uploadDocURI: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
