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

  companyName: string 
  companyAddr: string
  email: string
  
  totalAmount: string
  dueAmount: string
  discount: string
  tax: string

  clientName: string
  clientAddr: string
  clientEmail: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
