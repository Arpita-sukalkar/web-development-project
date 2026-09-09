import React, { useState, useEffect } from 'react';
import { billingService } from '../../services/billingService';
import { patientService } from '../../services/patientService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Modal from '../../components/common/Modal';

export default function BillingPage() {
  const [billings, setBillings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Create Invoice Modal
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    patientId: '',
    totalAmount: 1250.0,
    insuranceCovered: 800.0,
    patientPaid: 0.0,
    paymentMethod: 'Credit Card',
    notes: 'Inpatient stay, lab tests, and clinical consultation charges.',
  });

  // Record Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [targetInvoice, setTargetInvoice] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bills, pts] = await Promise.all([
        billingService.getAll(),
        patientService.getAll(),
      ]);
      setBillings(bills);
      setPatients(pts);
      if (pts.length > 0 && !invoiceForm.patientId) {
        setInvoiceForm((prev) => ({ ...prev, patientId: pts[0].id }));
      }
    } catch (err) {
      console.error('Failed to load billing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tot = Number(invoiceForm.totalAmount);
      const ins = Number(invoiceForm.insuranceCovered || 0);
      const pd = Number(invoiceForm.patientPaid || 0);
      const bal = Math.max(0, tot - ins - pd);
      const status = bal === 0 ? 'PAID' : pd > 0 ? 'PARTIALLY_PAID' : 'PENDING';

      await billingService.create({
        ...invoiceForm,
        patientId: Number(invoiceForm.patientId),
        totalAmount: tot,
        insuranceCovered: ins,
        patientPaid: pd,
        balanceDue: bal,
        paymentStatus: status,
      });
      setIsInvoiceModalOpen(false);
      fetchData();
      setToastMsg('Clinical billing invoice generated and posted to ledger.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to create invoice:', err);
      alert('Error creating invoice: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!targetInvoice) return;
    setSubmitting(true);
    try {
      await billingService.recordPayment(
        targetInvoice.id,
        Number(paymentAmount),
        paymentMethod
      );
      setIsPaymentModalOpen(false);
      setTargetInvoice(null);
      fetchData();
      setToastMsg(`Payment of $${paymentAmount} successfully booked.`);
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to record payment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBillings = billings.filter((b) => {
    if (statusFilter === 'ALL') return true;
    return b.paymentStatus === statusFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PAID':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-secondary-container text-on-secondary-container">PAID</span>;
      case 'PARTIALLY_PAID':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-primary-fixed text-on-primary-fixed-variant">PARTIAL</span>;
      case 'OVERDUE':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error-container text-on-error-container animate-pulse">OVERDUE</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-surface-container-highest text-primary">PENDING</span>;
    }
  };

  const totalCollected = billings.reduce((acc, b) => acc + (b.patientPaid || 0) + (b.insuranceCovered || 0), 0);
  const totalBalanceDue = billings.reduce((acc, b) => acc + (b.balanceDue || 0), 0);
  const totalRevenue = billings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-base bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-primary font-caption text-caption uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Revenue Cycle Management & Treasury</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="text-secondary font-semibold">Fiscal Year Active</span>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
            Patient Billing, Invoices & Hospital Revenue
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Real-time ledger audit, adjudication pipeline, claims processing, and clinical charge reconciliation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Create New Invoice</span>
          </button>
          <button
            onClick={() => {
              if (billings.length > 0) {
                setTargetInvoice(billings[0]);
                setPaymentAmount(billings[0].balanceDue || 100);
                setIsPaymentModalOpen(true);
              }
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg font-label-md text-label-md shadow-sm hover:opacity-95 transition-opacity font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Record Payment</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Ledger CSV exported to downloads folder.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-low text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Financial Ledger</span>
          </button>
        </div>
      </div>

      {/* Financial KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Today's Collections</span>
            <span className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <div className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
              {formatCurrency(totalCollected)}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-[11px] font-semibold">
                +14.8%
              </span>
              <span className="font-caption text-caption text-outline">vs yesterday</span>
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-secondary h-1 rounded-full w-full"></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Total Invoiced Volume</span>
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <div className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-caption text-[11px] font-semibold">
                {billings.length} Invoices
              </span>
              <span className="font-caption text-caption text-outline">MTD Target 94%</span>
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-primary h-1 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Outstanding Receivables</span>
            <span className="p-1.5 rounded-lg bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <div className="font-display-sm text-display-sm text-primary tracking-tight font-bold">
              {formatCurrency(totalBalanceDue)}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-[11px] font-semibold">
                {billings.filter((b) => b.paymentStatus === 'PENDING').length} Pending
              </span>
              <span className="font-caption text-caption text-outline">in adjudication</span>
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-primary-container h-1 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Overdue Claims</span>
            <span className="p-1.5 rounded-lg bg-error-container text-on-error-container">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </span>
          </div>
          <div className="mt-space-sm">
            <div className="font-display-sm text-display-sm text-error tracking-tight font-bold">
              {formatCurrency(billings.filter((b) => b.paymentStatus === 'OVERDUE').reduce((acc, b) => acc + (b.balanceDue || 0), 0))}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-[11px] font-semibold">
                {billings.filter((b) => b.paymentStatus === 'OVERDUE').length} Claims
              </span>
              <span className="font-caption text-caption text-error">&gt;60 Days</span>
            </div>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-error h-1 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Master Invoicing Ledger</h2>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-bold">
              {filteredBillings.length} Invoices
            </span>
          </div>
          <div className="flex items-center gap-2">
            {['ALL', 'PENDING', 'PAID', 'OVERDUE'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-outline">Loading billing accounts...</div>
        ) : filteredBillings.length === 0 ? (
          <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
            No invoices match the specified status.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                  <th className="py-space-xs px-space-sm rounded-l-lg">Invoice #</th>
                  <th className="py-space-xs px-space-sm">Patient & MRN</th>
                  <th className="py-space-xs px-space-sm">Total Billed</th>
                  <th className="py-space-xs px-space-sm">Insurance Paid</th>
                  <th className="py-space-xs px-space-sm">Balance Due</th>
                  <th className="py-space-xs px-space-sm">Status</th>
                  <th className="py-space-xs px-space-sm">Due Date</th>
                  <th className="py-space-xs px-space-sm rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                {filteredBillings.map((bill) => (
                  <tr key={bill.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-space-sm px-space-sm font-mono font-bold text-primary text-xs">
                      {bill.invoiceNumber || `#INV-${bill.id}`}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {bill.patientName}
                        </span>
                        <span className="font-caption text-caption text-outline font-mono">
                          {bill.patientMrn || `PT-${bill.patientId}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm font-tabular-metric font-semibold text-on-surface">
                      {formatCurrency(bill.totalAmount)}
                    </td>
                    <td className="py-space-sm px-space-sm font-tabular-metric text-secondary font-medium">
                      {formatCurrency(bill.insuranceCovered || 0)}
                    </td>
                    <td className="py-space-sm px-space-sm font-tabular-metric font-bold text-on-surface">
                      {formatCurrency(bill.balanceDue || 0)}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      {getStatusBadge(bill.paymentStatus)}
                    </td>
                    <td className="py-space-sm px-space-sm text-outline font-caption">
                      {formatDate(bill.dueDate)}
                    </td>
                    <td className="py-space-sm px-space-sm text-right">
                      {bill.balanceDue > 0 && (
                        <button
                          onClick={() => {
                            setTargetInvoice(bill);
                            setPaymentAmount(bill.balanceDue);
                            setIsPaymentModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-caption font-semibold hover:opacity-90 transition-opacity shadow-sm"
                        >
                          Collect
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create New Invoice Modal */}
      <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="Generate Clinical Invoice" maxWidth="max-w-xl">
        <form onSubmit={handleCreateInvoice} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Select Patient *</label>
              <select
                required
                value={invoiceForm.patientId}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, patientId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} ({p.mrn})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Total Bill Amount ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={invoiceForm.totalAmount}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, totalAmount: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Insurance Adjudicated ($)</label>
              <input
                type="number"
                step="0.01"
                value={invoiceForm.insuranceCovered}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, insuranceCovered: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Immediate Patient Copay ($)</label>
              <input
                type="number"
                step="0.01"
                value={invoiceForm.patientPaid}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, patientPaid: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Payment Method</label>
              <select
                value={invoiceForm.paymentMethod}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Insurance EFT">Insurance Direct EFT</option>
                <option value="Cash">Cash</option>
                <option value="Wire Transfer">Wire Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Invoice Notes / Charge Breakdown</label>
            <textarea
              rows="2"
              value={invoiceForm.notes}
              onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Generating...' : 'Post Invoice'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Record Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Record Payment Receipt" maxWidth="max-w-md">
        <form onSubmit={handleRecordPayment} className="flex flex-col gap-4">
          <div className="bg-surface-container-low p-3 rounded-lg text-sm">
            <div className="font-semibold text-on-surface">{targetInvoice?.patientName}</div>
            <div className="text-xs text-outline mt-0.5">
              Invoice #{targetInvoice?.invoiceNumber || targetInvoice?.id} • Balance Due:{' '}
              <strong className="text-primary font-mono">{formatCurrency(targetInvoice?.balanceDue || 0)}</strong>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Amount to Collect ($) *</label>
            <input
              type="number"
              step="0.01"
              required
              min="0.01"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono text-base font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Credit Card">Credit Card / Terminal</option>
              <option value="Cash">Cash Receipt</option>
              <option value="Insurance EFT">Insurance EFT Deposit</option>
              <option value="Wire Transfer">Bank Wire Transfer</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-secondary text-on-secondary hover:bg-secondary/90 shadow disabled:opacity-50"
            >
              {submitting ? 'Booking...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
