import PaymentsAndInvoicesHeader from '@/components/payments-and-invoices/PaymentsAndInvoicesHeader'
import PaymentsAndInvoicesStats from '@/components/payments-and-invoices/PaymentsAndInvoicesStats'
import PaymentsTable from '@/components/payments-and-invoices/PaymentsTable'
import React from 'react'

const page = () => {
  return (
     <div className="px-4 lg:px-10 pb-10">
       <PaymentsAndInvoicesHeader/>
       <PaymentsAndInvoicesStats/>
       <PaymentsTable />
    </div>
  )
}

export default page