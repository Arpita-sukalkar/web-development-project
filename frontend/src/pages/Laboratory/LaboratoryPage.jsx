import React, { useState, useEffect } from 'react';
import { labService } from '../../services/labService';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import { formatDate } from '../../utils/formatters';
import Modal from '../../components/common/Modal';

export default function LaboratoryPage() {
  const [labTests, setLabTests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Order modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    patientId: '',
    doctorId: '',
    testName: 'Complete Blood Count (CBC with Diff)',
    category: 'Hematology',
    priority: 'URGENT',
    referenceRange: '4.5 - 11.0',
    unit: '10^3/uL',
  });

  // Enter Result Modal
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [targetTest, setTargetTest] = useState(null);
  const [resultSummary, setResultSummary] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tests, pts, docs] = await Promise.all([
        labService.getAll(),
        patientService.getAll(),
        doctorService.getAll(),
      ]);
      setLabTests(tests);
      setPatients(pts);
      setDoctors(docs);
      if (pts.length > 0 && !orderForm.patientId) {
        setOrderForm((prev) => ({
          ...prev,
          patientId: pts[0].id,
          doctorId: docs[0]?.id || '',
        }));
      }
    } catch (err) {
      console.error('Failed to load lab data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderTest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await labService.create({
        ...orderForm,
        patientId: Number(orderForm.patientId),
        doctorId: Number(orderForm.doctorId),
      });
      setIsOrderModalOpen(false);
      fetchData();
      setToastMsg('Diagnostic laboratory requisition created and sample accessioned.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to order lab test:', err);
      alert('Error creating lab order: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveResult = async (e) => {
    e.preventDefault();
    if (!targetTest) return;
    setSubmitting(true);
    try {
      await labService.updateResult(targetTest.id, resultSummary, 'COMPLETED');
      setIsResultModalOpen(false);
      setTargetTest(null);
      setResultSummary('');
      fetchData();
      setToastMsg('Lab test verified and clinical result released to EHR.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to save lab result:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const urgentTests = labTests.filter((t) => t.priority === 'STAT' || t.priority === 'PANIC' || t.priority === 'URGENT');

  const filteredTests = labTests.filter((t) => {
    if (filterPriority === 'ALL') return true;
    if (filterPriority === 'URGENT') return t.priority === 'STAT' || t.priority === 'URGENT' || t.priority === 'PANIC';
    return t.priority === filterPriority;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'STAT':
      case 'PANIC':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error text-on-error animate-pulse">STAT / PANIC</span>;
      case 'URGENT':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error-container text-on-error-container">URGENT</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-semibold bg-surface-container text-primary">ROUTINE</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-caption text-caption font-bold">Verified</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-caption text-caption font-bold">On Analyzer</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-caption text-caption font-bold">Pending Draw</span>;
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Critical / Panic Banner */}
      {urgentTests.length > 0 && (
        <div className="relative overflow-hidden bg-error text-on-error rounded-xl p-space-md shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px] animate-pulse">crisis_alert</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="font-headline-sm text-headline-sm uppercase tracking-wider font-bold">
                  {urgentTests.length} Critical / Urgent Tests Active
                </span>
                <span className="px-space-sm py-0.5 rounded-full bg-surface text-error font-caption text-caption font-bold tracking-tight">
                  ATTENDING ESCALATION REQUIRED
                </span>
              </div>
              <p className="font-body-sm text-body-sm opacity-95">
                Stat specimen batches requiring immediate verbal doctor sign-off and immediate EHR reporting.
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterPriority(filterPriority === 'URGENT' ? 'ALL' : 'URGENT')}
            className="px-space-md py-space-xs rounded-lg bg-surface text-error font-label-md text-label-md font-bold shadow-sm hover:bg-surface-container transition-colors flex items-center gap-space-xs shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>{filterPriority === 'URGENT' ? 'Show All Tests' : `Filter ${urgentTests.length} Urgent Tests`}</span>
          </button>
        </div>
      )}

      {/* Operational Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs text-secondary font-caption text-caption uppercase tracking-widest font-semibold mb-space-2xs">
            <span>Pathology Department</span>
            <span>•</span>
            <span>CLIA & CAP Certified Core Lab</span>
            <span>•</span>
            <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-ping"></span>
            <span className="text-on-surface-variant font-normal">Analyzers Synchronized</span>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">
            Clinical Laboratory & Pathology Diagnostic Center
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Automated specimen accessioning, real-time analyzer interfaces, and critical value alerting.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-space-sm shrink-0">
          <button
            onClick={() => {
              setToastMsg('Batch barcode accessioning scanner ready.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">qr_code_scanner</span>
            <span>Batch Sample Intake</span>
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:brightness-110 transition-all flex items-center gap-space-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Order New Lab Test</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Tests</span>
            <span className="material-symbols-outlined text-[20px] text-primary">science</span>
          </div>
          <div className="my-space-sm flex items-baseline gap-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">{labTests.length}</span>
            <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-caption text-caption font-semibold">Active Cycle</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div className="bg-primary h-1 rounded-full w-full"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Urgent / STAT</span>
            <span className="material-symbols-outlined text-[20px] text-error">notification_important</span>
          </div>
          <div className="my-space-sm flex items-baseline gap-space-sm">
            <span className="font-display-sm text-display-sm text-error font-bold tracking-tight">{urgentTests.length}</span>
            <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-caption text-caption font-semibold">Priority</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div className="bg-error h-1 rounded-full" style={{ width: `${labTests.length ? (urgentTests.length / labTests.length) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">In Processing</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">precision_manufacturing</span>
          </div>
          <div className="my-space-sm flex items-baseline gap-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">
              {labTests.filter((t) => t.status === 'IN_PROGRESS').length}
            </span>
            <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-caption text-caption font-semibold">On Analyzers</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div className="bg-secondary h-1 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Completed & Verified</span>
            <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
          </div>
          <div className="my-space-sm flex items-baseline gap-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">
              {labTests.filter((t) => t.status === 'COMPLETED').length}
            </span>
            <span className="px-space-xs py-0.5 rounded bg-surface-container text-secondary font-caption text-caption font-semibold">Ready in EHR</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
            <div className="bg-primary h-1 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* Pathology Worklist Table */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Accessioning Worklist</h2>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-bold">
              {filteredTests.length} Orders
            </span>
          </div>
          <div className="flex items-center gap-2">
            {['ALL', 'URGENT', 'ROUTINE'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterPriority === p
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-outline">Accessioning pathology orders...</div>
        ) : filteredTests.length === 0 ? (
          <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
            No lab tests match the current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                  <th className="py-space-xs px-space-sm rounded-l-lg">Accession # & Test</th>
                  <th className="py-space-xs px-space-sm">Patient & MRN</th>
                  <th className="py-space-xs px-space-sm">Ordering Physician</th>
                  <th className="py-space-xs px-space-sm">Priority</th>
                  <th className="py-space-xs px-space-sm">Results / Reference Range</th>
                  <th className="py-space-xs px-space-sm">Status</th>
                  <th className="py-space-xs px-space-sm rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-primary text-xs">
                          {test.testCode || `#LAB-${test.id}`}
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {test.testName}
                        </span>
                        <span className="font-caption text-caption text-outline">{test.category}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-on-surface">{test.patientName}</span>
                        <span className="font-caption text-caption text-outline font-mono">
                          {test.patientMrn || `PT-${test.patientId}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm font-medium text-on-surface">
                      {test.doctorName}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      {getPriorityBadge(test.priority)}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-sm text-on-surface">
                          {test.resultSummary || 'Awaiting Instrument Run'}
                        </span>
                        <span className="font-caption text-outline">
                          Ref: {test.referenceRange || 'N/A'} {test.unit}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm">
                      {getStatusBadge(test.status)}
                    </td>
                    <td className="py-space-sm px-space-sm text-right">
                      <button
                        onClick={() => {
                          setTargetTest(test);
                          setResultSummary(test.resultSummary || '');
                          setIsResultModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-surface-container text-primary font-caption font-semibold hover:bg-surface-container-high transition-colors"
                      >
                        {test.status === 'COMPLETED' ? 'Edit Result' : 'Enter Result'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order New Lab Test Modal */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Order Diagnostic Laboratory Test" maxWidth="max-w-xl">
        <form onSubmit={handleOrderTest} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Patient *</label>
              <select
                required
                value={orderForm.patientId}
                onChange={(e) => setOrderForm({ ...orderForm, patientId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} ({p.mrn})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Ordering Physician *</label>
              <select
                required
                value={orderForm.doctorId}
                onChange={(e) => setOrderForm({ ...orderForm, doctorId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Test Name *</label>
              <input
                type="text"
                required
                value={orderForm.testName}
                onChange={(e) => setOrderForm({ ...orderForm, testName: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Laboratory Discipline *</label>
              <select
                value={orderForm.category}
                onChange={(e) => setOrderForm({ ...orderForm, category: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Hematology">Hematology</option>
                <option value="Biochemistry">Clinical Biochemistry</option>
                <option value="Microbiology">Microbiology & Cultures</option>
                <option value="Immunology">Immunology & Serology</option>
                <option value="Urinalysis">Urinalysis & Toxicology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Priority Triage *</label>
              <select
                value={orderForm.priority}
                onChange={(e) => setOrderForm({ ...orderForm, priority: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ROUTINE">ROUTINE (Standard TAT)</option>
                <option value="URGENT">URGENT (Within 60 min)</option>
                <option value="STAT">STAT / PANIC (Immediate Analyzer Run)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Reference Range</label>
              <input
                type="text"
                placeholder="e.g. 70 - 99"
                value={orderForm.referenceRange}
                onChange={(e) => setOrderForm({ ...orderForm, referenceRange: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Measurement Unit</label>
              <input
                type="text"
                placeholder="e.g. mg/dL"
                value={orderForm.unit}
                onChange={(e) => setOrderForm({ ...orderForm, unit: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsOrderModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Ordering...' : 'Confirm Lab Requisition'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Enter Result Modal */}
      <Modal isOpen={isResultModalOpen} onClose={() => setIsResultModalOpen(false)} title="Record Instrument Test Result" maxWidth="max-w-md">
        <form onSubmit={handleSaveResult} className="flex flex-col gap-4">
          <div className="bg-surface-container-low p-3 rounded-lg text-sm">
            <div className="font-semibold text-on-surface">{targetTest?.testName}</div>
            <div className="text-xs text-outline mt-0.5">
              Patient: {targetTest?.patientName} | Ordered by: {targetTest?.doctorName}
            </div>
            <div className="text-xs text-secondary mt-1">
              Normal Range: {targetTest?.referenceRange} {targetTest?.unit}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Clinical Value / Result Summary *</label>
            <input
              type="text"
              required
              placeholder="e.g. 14.2 g/dL (Slightly Elevated)"
              value={resultSummary}
              onChange={(e) => setResultSummary(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsResultModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Verify & Release to EHR'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
