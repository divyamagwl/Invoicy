import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import InvoicePage from './InvoicePage'
import {invoiceData} from './dummyData'

// import { RouteComponentProps } from "react-router-dom";
interface Props {
  // data: Invoice
  location: any
}

const ViewInvoice: FC<Props> = (props) => {
  console.log(props.location.state)
  const data = props.location.state.invoice

  return (
      <div >
        <PDFViewer style={{marginLeft:"25%",width:"50%",height:"140vh"}}>
            <InvoicePage pdfMode={true} data={data} />
        </PDFViewer>
        </div>
  )
}

export default ViewInvoice
