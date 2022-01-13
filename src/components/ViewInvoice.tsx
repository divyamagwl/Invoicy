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
- append this object:
  {
    "logo": "",
    "logoWidth": 100,
  }

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


const convertData:any = (data:any)=>{
  return data;
}

const ViewInvoice: FC<Props> = (props) => {
  // let data = props.location.state.invoice;
  let data = convertData(props.location.state.invoice);
  console.log(data);

  return (
      <div >
        <PDFViewer style={{marginLeft:"25%",width:"50%",height:"140vh"}}>
            <InvoicePage pdfMode={true} data={data} />
        </PDFViewer>
        </div>
  )
}

export default ViewInvoice
