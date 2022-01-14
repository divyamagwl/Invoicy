import React, { FC } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import InvoicePage from './InvoicePage'
import { web3 } from '../services/web3'

interface Props {
  location: any
}



const convertData:any = (input:any)=>{
  const discount = input.data.items[0].discount;
  const tax = input.data.items[0].tax;
  input.data.items.forEach((item:any) => {
    item['price'] = web3.utils.fromWei(item.price)
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
  invoice['totalAmount'] = web3.utils.fromWei(invoice.totalAmount)
  invoice['dueAmount'] = web3.utils.fromWei(invoice.dueAmount)
  return invoice;
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
