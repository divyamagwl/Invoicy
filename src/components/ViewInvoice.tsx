import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import InvoicePage from './InvoicePage'
import {invoiceData} from './dummyData'

interface Props {
  // data: Invoice
  location: any
}

/*
- Release company obj as 
    {
    "companyName": "Your Company",
    "companyAddr": "0x68EFB190a40B2E568E4147BEb01C8D78770eE514",
    "email": "Email Address",
    }

- Release client obj as
    {
      "clientName": "Your Client's Name",
      "clientAddr": "0xE76710212607eFF9E8c021E862D26fe9cE41DC6f",
      "clientEmail": "Email Address",
    }

- Generate 
    {
      "discount":"10",
      "tax":"10",
    }
*/


const convertData:any = (input:any)=>{
  const discount = input.data.items[0].discount;
  const tax = input.data.items[0].tax;
  input.data.items.forEach((item:any) => {
    delete item['discount'];
    delete item['tax'];
  })
  const invoice = {
    ...input.data,
    ...input.data.payment,
    companyName: input.data.company.name,
    companyAddr: input.data.company.companyAddr,
    email: input.data.company.email,
    clientName: input.data.client.name,
    clientAddr: input.data.client.companyAddr,
    clientemail: input.data.client.email,
    productLines: input.data.items,
    discount: discount,
    tax: tax,
  }
  delete invoice['payment']
  delete invoice['company']
  delete invoice['client']
  delete invoice['items']
  // console.log(invoice)
  return invoice;
  // return invoiceData;
}

const ViewInvoice: FC<Props> = (props) => {
  let data = convertData(props.location.state.invoice);

  return (
      <div >
        <PDFViewer style={{marginLeft:"25%",width:"50%",height:"140vh"}}>
            <InvoicePage pdfMode={true} data={data} />
        </PDFViewer>
        </div>
  )
}

export default ViewInvoice
