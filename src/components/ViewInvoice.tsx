import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import InvoicePage from './InvoicePage'
import {invoiceData} from './dummyData'
interface Props {
  data: Invoice
}

const ViewInvoice: FC<Props> = ({ data }) => {
data = invoiceData

  return (
      <div >
        <PDFViewer style={{marginLeft:"25%",width:"50%",height:"140vh"}}>
            <InvoicePage pdfMode={true} data={data} />
        </PDFViewer>
        </div>
  )
}

export default ViewInvoice
