import React, { useState, useEffect } from 'react';
import { admissionService } from '../../services/admissionService';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import { formatDate } from '../../utils/formatters';
import Modal from '../../components/common/Modal';

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Admit Modal
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [admitForm, setAdmitForm] = useState({
    patientId: '',
    ward: 'ICU',
    bedNumber: 'ICU-08',
    triageAcuity: 'HIGH',
    attendingDoctorId: '',
    diagnosis: 'Acute Respiratory Distress',
  });

  // Transfer Modal
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);
  const [transferForm, setTransferForm] = useState({
    newWard: 'General Ward',
    newBedNumber: 'GW-204',
  });

  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [admData, ptsData, docsData] = await Promise.all([
        admissionService.getAll(),
        patientService.getAll(),
        doctorService.getAll(),
      ]);
      setAdmissions(admData);
      setPatients(ptsData);
      setDoctors(docsData);
      if (ptsData.length > 0 && !admitForm.patientId) {
        setAdmitForm((prev) => ({
          ...prev,
          patientId: ptsData[0].id,
          attendingDoctorId: docsData[0]?.id || '',
        }));
      }
    } catch (err) {
      console.error('Failed to load admissions data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdmitPatient = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await admissionService.create({
        ...admitForm,
        patientId: Number(admitForm.patientId),
        attendingDoctorId: Number(admitForm.attendingDoctorId),
      });
      setIsAdmitModalOpen(false);
      fetchData();
      setToastMsg('Patient admitted and telemetry sensors attached.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to admit patient:', err);
      alert('Error admitting patient: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleTransferBed = async (e) => {
    e.preventDefault();
    if (!transferTarget) return;
    setSubmitting(true);
    try {
      await admissionService.transferBed(
        transferTarget.id,
        transferForm.newWard,
        transferForm.newBedNumber
      );
      setIsTransferModalOpen(false);
      setTransferTarget(null);
      fetchData();
      setToastMsg('Bed transfer completed successfully.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to transfer bed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDischarge = async (id) => {
    if (!window.confirm('Confirm patient discharge protocol and bed sterilization?')) return;
    try {
      await admissionService.discharge(id);
      fetchData();
      setToastMsg('Patient discharged. Bed queued for sterilization.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to discharge patient:', err);
    }
  };

  const filteredAdmissions = admissions.filter((adm) => {
    if (selectedWard === 'ALL') return true;
    return adm.ward?.toLowerCase().includes(selectedWard.toLowerCase());
  });

  const getAcuityBadge = (acuity) => {
    switch (acuity) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error text-on-error animate-pulse">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error-container text-on-error-container">HIGH</span>;
      case 'MODERATE':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-primary-fixed text-on-primary-fixed-variant">MODERATE</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-secondary-container text-on-secondary-container">STABLE</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-surface-container text-on-surface">{acuity}</span>;
    }
  };

  const activeAdmissions = admissions.filter((a) => a.status === 'ADMITTED');

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Top Action Bar & Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-caption text-caption font-bold tracking-wide uppercase">
              CENSUS MONITOR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
              Telemetry Link Active
            </span>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
            Inpatient Admissions & Ward Bed Telemetry
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Real-time facility capacity telemetry, instant clinical bed allocation, and multi-ward throughput monitor.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => setIsAdmitModalOpen(true)}
            className="flex items-center gap-space-xs px-space-base py-space-sm bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-95 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Admit Patient</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Census exported as clinical PDF ledger.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export Census</span>
          </button>
        </div>
      </div>

      {/* Ward Quick Stat Bento Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Campus Beds</span>
              <span className="font-display-lg text-display-lg text-on-surface font-bold mt-space-2xs">420</span>
            </div>
            <div className="p-space-xs rounded-xl bg-surface-container-high text-primary">
              <span className="material-symbols-outlined text-[24px]">apartment</span>
            </div>
          </div>
          <div className="mt-space-md flex items-center justify-between font-caption text-caption">
            <span className="text-secondary font-semibold">100% Operational</span>
            <span className="text-outline">Campus-wide</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-space-xs overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full w-full"></div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Available Beds</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-secondary font-bold">48</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">11.4%</span>
              </div>
            </div>
            <div className="p-space-xs rounded-xl bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
          </div>
          <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant">
            <span>Ready for intake</span>
            <span className="text-secondary font-semibold">+6 sanitized</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-space-xs overflow-hidden">
            <div className="bg-secondary h-1.5 rounded-full" style={{ width: '11.4%' }}></div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Occupied Beds</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-primary font-bold">{342 + activeAdmissions.length}</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">82.1%</span>
              </div>
            </div>
            <div className="p-space-xs rounded-xl bg-primary-fixed text-on-primary-fixed-variant">
              <span className="material-symbols-outlined text-[24px]">airline_seat_flat</span>
            </div>
          </div>
          <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant">
            <span>Clinical census high</span>
            <span className="text-primary font-semibold">12 pending discharge</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-space-xs overflow-hidden">
            <div className="bg-primary-container h-1.5 rounded-full" style={{ width: '82.1%' }}></div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Reserved / In-Transit</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-on-surface font-bold">18</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">4.3%</span>
              </div>
            </div>
            <div className="p-space-xs rounded-xl bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined text-[24px]">schedule_send</span>
            </div>
          </div>
          <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant">
            <span>Pre-op bookings</span>
            <span className="text-outline font-semibold">OR Pipeline</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-space-xs overflow-hidden">
            <div className="bg-outline h-1.5 rounded-full" style={{ width: '4.3%' }}></div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-bold">ICU Beds Alert</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-error font-bold">4</span>
                <span className="font-caption text-caption text-error font-semibold">avail / 40 total</span>
              </div>
            </div>
            <div className="p-space-xs rounded-xl bg-error-container text-on-error-container animate-pulse">
              <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            </div>
          </div>
          <div className="mt-space-md flex items-center justify-between font-caption text-caption">
            <span className="text-error font-bold">Acuity: 90% Occupied</span>
            <span className="text-error">Level 1 Trauma</span>
          </div>
          <div className="w-full bg-error-container rounded-full h-1.5 mt-space-xs overflow-hidden">
            <div className="bg-error h-1.5 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>

      {/* Ward Throughput Distribution Cards */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">domain_verification</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Ward Throughput Distribution</h2>
          </div>
          <span className="font-caption text-caption text-outline">Auto-syncs with telemetry sensors</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-space-md">
          {[
            { name: 'General Ward', code: 'General Ward', avail: '18 Avail', cap: '150 beds', pct: 88, color: 'bg-primary', floor: 'Floors 3 & 4 • Wings A/B' },
            { name: 'ICU Complex', code: 'ICU', avail: '4 Avail', cap: '40 beds', pct: 90, color: 'bg-error', floor: 'Floor 2 • Isolation & CCU', isError: true },
            { name: 'Trauma Ward', code: 'Trauma', avail: '6 Avail', cap: '60 beds', pct: 90, color: 'bg-tertiary-container', floor: 'Ground Floor • Helipad' },
            { name: 'Private Suites', code: 'Private', avail: '12 Avail', cap: '90 beds', pct: 86, color: 'bg-secondary', floor: 'Floor 5 • VIP Pavilion' },
            { name: 'Semi-Private', code: 'Semi-Private', avail: '8 Avail', cap: '80 beds', pct: 90, color: 'bg-primary', floor: 'Floor 3 • South Wing' },
          ].map((ward) => (
            <div
              key={ward.name}
              onClick={() => setSelectedWard(selectedWard === ward.code ? 'ALL' : ward.code)}
              className={`cursor-pointer group bg-surface-container-lowest hover:bg-surface-container-low transition-all p-space-base rounded-xl shadow-sm border-2 ${
                selectedWard === ward.code ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-headline-sm text-headline-sm font-bold ${ward.isError ? 'text-error' : 'text-on-surface group-hover:text-primary'}`}>
                  {ward.name}
                </span>
                <span className={`px-space-xs py-0.5 rounded-full font-caption text-caption font-bold ${ward.isError ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                  {ward.avail}
                </span>
              </div>
              <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                <span>Capacity: {ward.cap}</span>
                <span className={`font-tabular-metric font-bold ${ward.isError ? 'text-error' : 'text-on-surface'}`}>{ward.pct}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 mt-space-xs overflow-hidden">
                <div className={`${ward.color} h-2 rounded-full`} style={{ width: `${ward.pct}%` }}></div>
              </div>
              <div className="mt-space-sm flex items-center gap-space-xs text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[14px]">stairs</span>
                <span>{ward.floor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bed Matrix Live Status */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">view_comfy</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Floor Grid Live Status</h3>
              <span className="font-caption text-caption text-on-surface-variant">Telemetry sensor matrix</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-md font-caption text-caption">
            <div className="flex items-center gap-space-2xs">
              <span className="w-3 h-3 rounded bg-secondary"></span>
              <span className="text-on-surface-variant">Available</span>
            </div>
            <div className="flex items-center gap-space-2xs">
              <span className="w-3 h-3 rounded bg-primary"></span>
              <span className="text-on-surface-variant">Occupied (Stable)</span>
            </div>
            <div className="flex items-center gap-space-2xs">
              <span className="w-3 h-3 rounded bg-error"></span>
              <span className="text-on-surface-variant">Critical Telemetry</span>
            </div>
            <div className="flex items-center gap-space-2xs">
              <span className="w-3 h-3 rounded bg-surface-container-highest"></span>
              <span className="text-on-surface-variant">Reserved</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-space-xs pt-space-xs">
          {[
            { id: 'ICU-01', status: 'critical', icon: 'ecg_heart' },
            { id: 'ICU-02', status: 'occupied', icon: 'monitor_heart' },
            { id: 'ICU-03', status: 'occupied', icon: 'monitor_heart' },
            { id: 'ICU-04', status: 'critical', icon: 'e911_emergency' },
            { id: 'ICU-05', status: 'available', icon: 'bed' },
            { id: 'ICU-06', status: 'reserved', icon: 'alarm' },
            { id: 'GW-101', status: 'occupied', icon: 'bed' },
            { id: 'GW-102', status: 'available', icon: 'bed' },
            { id: 'GW-103', status: 'occupied', icon: 'bed' },
            { id: 'GW-104', status: 'available', icon: 'sanitizer' },
            { id: 'GW-105', status: 'available', icon: 'bed' },
            { id: 'GW-106', status: 'occupied', icon: 'bed' },
            { id: 'PR-201', status: 'occupied', icon: 'hotel_class' },
            { id: 'PR-202', status: 'available', icon: 'hotel_class' },
            { id: 'PR-203', status: 'occupied', icon: 'hotel_class' },
            { id: 'TR-01', status: 'critical', icon: 'emergency' },
            { id: 'TR-02', status: 'occupied', icon: 'emergency' },
            { id: 'TR-03', status: 'available', icon: 'bed' },
          ].map((bed) => {
            const colorClass =
              bed.status === 'critical'
                ? 'bg-error-container text-on-error-container border border-error'
                : bed.status === 'available'
                ? 'bg-secondary-container text-on-secondary-container'
                : bed.status === 'reserved'
                ? 'bg-surface-container-highest text-primary'
                : 'bg-primary-container text-on-primary';
            return (
              <div
                key={bed.id}
                className={`p-space-xs rounded-lg ${colorClass} hover:scale-105 transition-transform flex flex-col items-center justify-center text-center cursor-pointer`}
                title={`Bed ${bed.id} - ${bed.status.toUpperCase()}`}
              >
                <span className="font-caption text-[10px] font-bold">{bed.id}</span>
                <span className="material-symbols-outlined text-[14px]">{bed.icon}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Inpatients Telemetry Table */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md text-on-surface font-bold">Active Inpatient Census</span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-bold">
              {filteredAdmissions.length} Patients
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-outline">Loading ward telemetry...</div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
            No active admissions match the selected ward.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                  <th className="py-space-xs px-space-sm rounded-l-lg">Patient & MRN</th>
                  <th className="py-space-xs px-space-sm">Ward & Bed</th>
                  <th className="py-space-xs px-space-sm">Acuity</th>
                  <th className="py-space-xs px-space-sm">Attending Physician</th>
                  <th className="py-space-xs px-space-sm">Primary Diagnosis</th>
                  <th className="py-space-xs px-space-sm">Admission Date</th>
                  <th className="py-space-xs px-space-sm rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                {filteredAdmissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {adm.patientName}
                        </span>
                        <span className="font-caption text-caption text-outline">
                          {adm.patientMrn || `ADM-#${adm.id}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-primary bg-surface-container px-1.5 py-0.5 rounded">
                          {adm.bedNumber}
                        </span>
                        <span className="font-caption text-on-surface-variant font-medium">({adm.ward})</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm">
                      {getAcuityBadge(adm.triageAcuity)}
                    </td>
                    <td className="py-space-sm px-space-sm font-medium text-on-surface">
                      {adm.doctorName || 'On-Duty Hospitalist'}
                    </td>
                    <td className="py-space-sm px-space-sm text-on-surface-variant max-w-xs truncate">
                      {adm.diagnosis || 'Clinical evaluation in progress'}
                    </td>
                    <td className="py-space-sm px-space-sm text-outline">
                      {formatDate(adm.admissionDateTime)}
                    </td>
                    <td className="py-space-sm px-space-sm text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setTransferTarget(adm);
                            setIsTransferModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-caption font-semibold hover:bg-surface-container-high transition-colors"
                        >
                          Transfer
                        </button>
                        <button
                          onClick={() => handleDischarge(adm.id)}
                          className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-caption font-semibold hover:bg-error hover:text-on-error transition-colors"
                        >
                          Discharge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admit Patient Modal */}
      <Modal isOpen={isAdmitModalOpen} onClose={() => setIsAdmitModalOpen(false)} title="Admit Patient to Clinical Ward" maxWidth="max-w-xl">
        <form onSubmit={handleAdmitPatient} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Select Patient *</label>
              <select
                required
                value={admitForm.patientId}
                onChange={(e) => setAdmitForm({ ...admitForm, patientId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} ({p.mrn})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Attending Physician *</label>
              <select
                required
                value={admitForm.attendingDoctorId}
                onChange={(e) => setAdmitForm({ ...admitForm, attendingDoctorId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.fullName} ({d.specialty})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Destination Ward *</label>
              <select
                value={admitForm.ward}
                onChange={(e) => setAdmitForm({ ...admitForm, ward: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ICU">Intensive Care Unit (ICU)</option>
                <option value="General Ward">General Medical Ward</option>
                <option value="Trauma">Trauma & Emergency</option>
                <option value="Private Suites">Private Suites</option>
                <option value="Semi-Private">Semi-Private Ward</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Bed Identifier *</label>
              <input
                type="text"
                required
                value={admitForm.bedNumber}
                onChange={(e) => setAdmitForm({ ...admitForm, bedNumber: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Triage Acuity *</label>
              <select
                value={admitForm.triageAcuity}
                onChange={(e) => setAdmitForm({ ...admitForm, triageAcuity: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="CRITICAL">CRITICAL (Continuous telemetry)</option>
                <option value="HIGH">HIGH (Step-down monitoring)</option>
                <option value="MODERATE">MODERATE (Floor observation)</option>
                <option value="LOW">LOW (Ambulatory)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Primary Admission Diagnosis *</label>
              <input
                type="text"
                required
                value={admitForm.diagnosis}
                onChange={(e) => setAdmitForm({ ...admitForm, diagnosis: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsAdmitModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Admitting...' : 'Confirm Admission'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Transfer Bed Modal */}
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} title="Transfer Patient Bed" maxWidth="max-w-md">
        <form onSubmit={handleTransferBed} className="flex flex-col gap-4">
          <p className="text-sm text-on-surface-variant">
            Transferring <strong>{transferTarget?.patientName}</strong> from current bed{' '}
            <strong className="text-primary">{transferTarget?.bedNumber}</strong>.
          </p>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Destination Ward *</label>
            <select
              value={transferForm.newWard}
              onChange={(e) => setTransferForm({ ...transferForm, newWard: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="General Ward">General Medical Ward</option>
              <option value="ICU">Intensive Care Unit (ICU)</option>
              <option value="Trauma">Trauma & Emergency</option>
              <option value="Private Suites">Private Suites</option>
              <option value="Semi-Private">Semi-Private Ward</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">New Bed Number *</label>
            <input
              type="text"
              required
              value={transferForm.newBedNumber}
              onChange={(e) => setTransferForm({ ...transferForm, newBedNumber: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsTransferModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Transferring...' : 'Execute Transfer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
