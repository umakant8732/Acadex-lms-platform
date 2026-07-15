import React, { useState } from 'react'
import { FiPrinter, FiBookOpen, FiClock, FiFileText, FiX, FiCheckCircle } from 'react-icons/fi'
import { useGetInvoices } from '../queries/use-get-invoices'
import type { InvoiceItem } from '../types/invoice-types'

// Invoice Modal Component for viewing and printing
interface InvoiceModalProps {
  invoice: InvoiceItem
  onClose: () => void
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const formattedDate = new Date(invoice.paidAt || invoice.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const amountRupees = (invoice.amount / 100).toFixed(2)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm print:static print:bg-white print:p-0'>
      
      {/* Styles injected specifically for perfect A4 page print outputs */}
      <style>{`
        @media print {
          /* Hide everything except the printable invoice */
          body * {
            visibility: hidden;
          }
          #printable-invoice-container, #printable-invoice-container * {
            visibility: visible;
          }
          #printable-invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          /* Prevent grey/dark backgrounds from displaying in print to save ink and look clean */
          .print-clean-bg {
            background-color: transparent !important;
            background-image: none !important;
          }
          .print-border {
            border: 1px solid #000000 !important;
          }
          .print-text-dark {
            color: #000000 !important;
          }
        }
      `}</style>

      {/* Modal Card wrapper */}
      <div 
        id='printable-invoice-container' 
        className='w-full max-w-2xl bg-white shadow-2xl transition-all flex flex-col max-h-[90vh] border border-black/10 print:max-h-full print:shadow-none print:border-0'
      >
        
        {/* Modal Controls (Hidden in Print) */}
        <div className='flex items-center justify-between border-b border-black/5 bg-gray-50/50 px-6 py-4 print:hidden'>
          <h3 className='text-sm font-bold text-black flex items-center gap-2 tracking-wide uppercase'>
            <FiFileText className='text-lg text-black/70' /> Official Invoice Receipt
          </h3>
          <div className='flex items-center gap-2'>
            <button
              onClick={handlePrint}
              className='flex items-center gap-1.5 bg-black text-white px-4 py-2 text-xs font-bold hover:bg-black/90 active:scale-[0.98] transition-all rounded-sm'
            >
              <FiPrinter /> Print Receipt
            </button>
            <button
              onClick={onClose}
              className='text-lg p-2 border border-black/5 text-black hover:bg-black hover:text-white transition-all rounded-sm'
              aria-label='Close modal'
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div className='flex-1 overflow-y-auto p-8 sm:p-12 print:overflow-visible print:p-0'>
          
          {/* Main Sheet Design */}
          <div className='border border-black/10 p-8 sm:p-12 print:border-0 print:p-0 print-clean-bg flex flex-col justify-between min-h-[500px]'>
            
            <div>
              {/* BRAND HEADER BAR */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start border-b-2 border-black pb-8 gap-6'>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-black tracking-widest text-black uppercase print-text-dark'>
                    ACADEX LEARNING
                  </h1>
                  <div className='h-1.5 w-20 bg-black mt-2 print-text-dark'></div>
                  <p className='text-[10px] text-black/50 tracking-wider uppercase font-semibold mt-3'>
                    Official Payment Invoice
                  </p>
                </div>
                
                {/* Transaction Stamp */}
                <div className='text-left sm:text-right flex flex-col sm:items-end'>
                  <div className='flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm print-border print-text-dark print-clean-bg'>
                    <FiCheckCircle className='text-sm' /> Fully Paid
                  </div>
                  <p className='text-[9px] font-bold text-black/40 tracking-widest uppercase mt-4'>RECEIPT ID</p>
                  <p className='text-sm font-mono font-bold text-black tracking-tight mt-0.5 print-text-dark'>{invoice.receipt}</p>
                </div>
              </div>

              {/* TRANSACTION INFO META */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-black/10 text-xs'>
                <div>
                  <h4 className='font-bold text-black/40 tracking-wider uppercase mb-2.5'>BILL TO</h4>
                  <p className='font-bold text-black text-sm print-text-dark'>Verified Student Account</p>
                  <p className='text-black/60 mt-1 font-mono'>User ID: {invoice.userId}</p>
                </div>
                <div className='sm:text-right text-black/70'>
                  <h4 className='font-bold text-black/40 tracking-wider uppercase mb-2.5 sm:text-right'>PAYMENT METADATA</h4>
                  <p className='mt-1'><span className='font-semibold text-black print-text-dark'>Date/Time:</span> {formattedDate}</p>
                  <p className='mt-1'><span className='font-semibold text-black print-text-dark'>Razorpay Order ID:</span> <span className='font-mono'>{invoice.providerOrderId}</span></p>
                  {invoice.providerPaymentId && (
                    <p className='mt-1 font-bold text-black print-text-dark'><span className='font-semibold text-black/70'>Transaction ID:</span> <span className='font-mono'>{invoice.providerPaymentId}</span></p>
                  )}
                </div>
              </div>

              {/* COURSE DETAILS TABLE */}
              <div className='py-8'>
                <table className='w-full text-left text-xs'>
                  <thead>
                    <tr className='border-b-2 border-black pb-3 text-black font-bold uppercase tracking-wider'>
                      <th className='pb-3 font-extrabold'>Product Description</th>
                      <th className='pb-3 text-right font-extrabold'>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-black/5'>
                      <td className='py-5 font-bold text-black text-sm leading-tight print-text-dark'>
                        {invoice.courseId?.title || 'Course Purchase'}
                        <span className='block text-xs text-black/50 font-normal mt-1.5'>
                          Lifetime digital access to study materials, lessons, and updates.
                        </span>
                      </td>
                      <td className='py-5 text-right font-mono font-bold text-black text-base print-text-dark'>
                        INR {amountRupees}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOTALS & WATERMARK */}
            <div>
              <div className='border-t border-black/10 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6'>
                {/* Visual authenticity seal */}
                <div className='text-[10px] text-black/40 font-semibold tracking-wider uppercase border border-black/10 inline-block px-3 py-1.5 rounded-sm bg-gray-50/50 print-border print-clean-bg'>
                  ✓ SECURED WITH RAZORPAY
                </div>

                <div className='w-full sm:w-64 text-xs text-black/60 space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span className='font-semibold text-black print-text-dark'>INR {amountRupees}</span>
                  </div>
                  <div className='flex justify-between border-t border-black/10 pt-2.5 text-sm font-black text-black print-text-dark'>
                    <span>Grand Total:</span>
                    <span className='text-base font-mono'>INR {amountRupees}</span>
                  </div>
                </div>
              </div>

              {/* SYSTEM FOOTER */}
              <div className='mt-16 text-center text-[10px] text-black/40 border-t border-black/5 pt-8 print-text-dark'>
                <p className='font-semibold'>This is a system-generated electronic receipt and does not require a physical signature.</p>
                <p className='mt-1.5'>For billing support, email us at support@acadexlearning.xyz.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

const StudentInvoicesPage: React.FC = () => {
  const { data: invoices, isLoading, isError } = useGetInvoices()
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null)

  return (
    <div className='max-w-4xl mx-auto py-8 sm:py-12'>
      
      {/* Title Header */}
      <div className='border-b border-black/10 pb-6 mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-black flex items-center gap-2'>
          <FiFileText /> Invoices & Billing
        </h2>
        <p className='text-sm text-black/60 mt-1'>Manage your purchases, payment receipts and billing history.</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className='space-y-4'>
          {[1, 2, 3].map(i => (
            <div key={i} className='bg-white border border-black/10 p-6 animate-pulse flex flex-col sm:flex-row justify-between gap-4'>
              <div className='space-y-2 flex-1'>
                <div className='h-4 bg-black/5 w-1/3'></div>
                <div className='h-3 bg-black/5 w-1/4'></div>
              </div>
              <div className='h-10 bg-black/5 w-24 sm:self-center'></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className='border border-red-200 bg-red-50 text-red-700 p-6 text-sm flex items-center gap-3'>
          <span>Error loading billing history. Please refresh the page or try again later.</span>
        </div>
      )}

      {/* Loaded Content */}
      {!isLoading && !isError && (
        <>
          {(!invoices || invoices.length === 0) ? (
            <div className='border border-black/10 bg-white p-12 text-center flex flex-col items-center justify-center'>
              <div className='w-16 h-16 bg-black/5 flex items-center justify-center rounded-full text-2xl text-black/45 mb-4 border border-black/5'>
                <FiBookOpen />
              </div>
              <h3 className='text-base font-semibold text-black'>No Invoices Found</h3>
              <p className='text-sm text-black/50 mt-1.5 max-w-sm'>
                You have not purchased any courses yet. Once you complete a purchase, your receipt will appear here.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {invoices.map((invoice) => {
                const amountRupees = (invoice.amount / 100).toFixed(2)
                const formattedDate = new Date(invoice.paidAt || invoice.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })

                return (
                  <div
                    key={invoice._id}
                    className='bg-white border border-black/10 hover:border-black/25 transition p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'
                  >
                    <div className='space-y-1.5 flex-1 min-w-0'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <span className='text-xs font-mono font-semibold text-black/40'>
                          #{invoice.receipt}
                        </span>
                        <span className='inline-flex items-center text-[10px] bg-green-50 border border-green-200 text-green-700 font-bold uppercase px-2 py-0.5 rounded-sm'>
                          Paid
                        </span>
                      </div>
                      <h4 className='text-base font-bold text-black truncate'>
                        {invoice.courseId?.title || 'Course Purchase'}
                      </h4>
                      <div className='flex items-center gap-4 text-xs text-black/60'>
                        <span className='flex items-center gap-1'>
                          <FiClock /> {formattedDate}
                        </span>
                        <span className='flex items-center gap-0.5 font-bold text-black'>
                          ₹{amountRupees}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className='w-full sm:w-auto bg-black text-white hover:bg-black/90 active:scale-[0.98] transition-all text-xs font-semibold px-4 py-2.5 flex items-center justify-center gap-1.5 rounded-sm'
                    >
                      <FiFileText /> View Invoice
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Invoice Modal Overlay */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  )
}

export default StudentInvoicesPage
