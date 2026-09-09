import React, { useState, useEffect } from 'react';
import { doctorService } from '../../services/doctorService';
import Modal from '../../components/common/Modal';

const STATUS_OPTIONS = ['All', 'On Duty', 'In Surgery', 'In Consultation', 'On Leave'];
const SPECIALTY_OPTIONS = [
  'All Specialties',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'Emergency Medicine',
  'General Surgery',
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  // Add Doctor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    specialty: 'Cardiology',
    department: 'Cardiovascular Sciences',
    licenseNumber: '',
    email: '',
    phone: '',
    ward: 'Cath Lab • Ward 4A',
    qualifications: 'MD, FACC',
    status: 'ON_DUTY',
  });
  const [submitting, setSubmitting] = useState(false);

  // Quick action alerts
  const [toastMsg, setToastMsg] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
      if (data.length > 0 && !selectedDoctor) {
        setSelectedDoctor(data[0]);
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Could not connect to medical directory service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleStatusChange = async (doctorId, newStatus) => {
    try {
      await doctorService.updateStatus(doctorId, newStatus);
      setToastMsg(`Status updated to ${newStatus}`);
      setTimeout(() => setToastMsg(null), 3000);
      fetchDoctors();
      if (selectedDoctor && selectedDoctor.id === doctorId) {
        setSelectedDoctor((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await doctorService.create({
        ...formData,
        avatarUrl: `https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80`,
      });
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        specialty: 'Cardiology',
        department: 'Cardiovascular Sciences',
        licenseNumber: '',
        email: '',
        phone: '',
        ward: 'Cath Lab • Ward 4A',
        qualifications: 'MD, FACC',
        status: 'ON_DUTY',
      });
      fetchDoctors();
      setToastMsg('Doctor successfully credentialed.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to create doctor:', err);
      alert('Error adding doctor: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.licenseNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'On Duty' && doc.status === 'ON_DUTY') ||
      (selectedStatus === 'In Surgery' && doc.status === 'IN_SURGERY') ||
      (selectedStatus === 'In Consultation' && doc.status === 'IN_CONSULTATION') ||
      (selectedStatus === 'On Leave' && (doc.status === 'ON_LEAVE' || doc.status === 'OFF_DUTY'));

    const matchesSpecialty =
      selectedSpecialty === 'All Specialties' ||
      doc.specialty?.toLowerCase() === selectedSpecialty.toLowerCase();

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ON_DUTY':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-secondary-container text-on-secondary-container">On Duty</span>;
      case 'IN_SURGERY':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-error-container text-on-error-container">In Surgery</span>;
      case 'IN_CONSULTATION':
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-surface-container-highest text-primary font-semibold">In Consultation</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-surface-container text-outline">On Leave</span>;
    }
  };

  // Metrics computation
  const activeDutyCount = doctors.filter((d) => d.status === 'ON_DUTY').length;
  const inSurgeryCount = doctors.filter((d) => d.status === 'IN_SURGERY').length;
  const inConsultCount = doctors.filter((d) => d.status === 'IN_CONSULTATION').length;
  const onLeaveCount = doctors.filter((d) => d.status === 'ON_LEAVE' || d.status === 'OFF_DUTY').length;

  return (
    <div className="flex flex-col w-full">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Top Command & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm mb-space-2xs">
            <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-primary font-caption text-caption uppercase tracking-wider font-semibold">
              Staff Command
            </span>
            <span className="text-outline text-caption font-caption">•</span>
            <span className="text-outline font-caption text-caption flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Live Sync Enabled
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Medical Staff & Doctors Directory
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            {doctors.length} Registered Physicians, Surgeons & Specialists across clinical wards
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={() => {
              setSelectedStatus('On Duty');
              setToastMsg('Filtered to On-Call Roster');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-base py-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface shadow-sm rounded-lg font-label-md text-label-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">assignment_ind</span>
            <span>On-Call Roster</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Duty Schedule synced for current rotation');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-base py-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface shadow-sm rounded-lg font-label-md text-label-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">date_range</span>
            <span>Duty Schedule</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-space-xs px-space-base py-space-xs bg-primary hover:bg-primary-container text-on-primary shadow-md rounded-lg font-label-md text-label-md transition-all group"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
            <span className="font-semibold">+ Add Doctor</span>
          </button>
        </div>
      </div>

      {/* Operational Overview Metric Rail */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Active On-Duty</span>
            <span className="p-1 rounded-md bg-secondary-container text-on-secondary-container material-symbols-outlined text-[18px]">badge</span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">{activeDutyCount}</span>
            <span className="font-caption text-caption text-secondary font-semibold">/ {doctors.length} total</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-space-sm overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${doctors.length ? (activeDutyCount / doctors.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">In Active Surgery</span>
            <span className="p-1 rounded-md bg-error-container text-error material-symbols-outlined text-[18px]">e911_emergency</span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-space-sm">
            <span className="font-display-sm text-display-sm text-error font-bold">{inSurgeryCount}</span>
            <span className="font-caption text-caption text-on-surface-variant">in OR suites</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-space-sm overflow-hidden">
            <div
              className="bg-error h-full rounded-full transition-all duration-500"
              style={{ width: `${doctors.length ? (inSurgeryCount / doctors.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">In Consultations</span>
            <span className="p-1 rounded-md bg-surface-container-highest text-primary material-symbols-outlined text-[18px]">forum</span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">{inConsultCount}</span>
            <span className="font-caption text-caption text-primary font-semibold">active appointments</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-space-sm overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${doctors.length ? (inConsultCount / doctors.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Leave / Deputed</span>
            <span className="p-1 rounded-md bg-surface-container-high text-on-surface-variant material-symbols-outlined text-[18px]">flight_takeoff</span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-space-sm">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">{onLeaveCount}</span>
            <span className="font-caption text-caption text-outline">Academic / Rotation</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-space-sm overflow-hidden">
            <div
              className="bg-outline h-full rounded-full transition-all duration-500"
              style={{ width: `${doctors.length ? (onLeaveCount / doctors.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Filter Bar & Controls */}
      <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm mb-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-base">
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-space-base top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Doctor Name, Specialty, License Number..."
              className="w-full pl-11 pr-space-base py-space-xs h-10 bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 md:pb-0">
            <span className="font-caption text-caption uppercase text-outline font-semibold mr-space-2xs whitespace-nowrap">Status:</span>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-space-sm py-1 rounded-full font-caption text-caption font-semibold whitespace-nowrap transition-colors ${
                  selectedStatus === status
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Department Tabs Strip */}
        <div className="flex items-center gap-space-2xs overflow-x-auto pt-space-xs border-t border-surface-container-high">
          {SPECIALTY_OPTIONS.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-space-md py-space-xs rounded-lg font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                selectedSpecialty === spec
                  ? 'bg-primary-fixed text-on-primary-fixed-variant font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Workspace: Grid + Sticky Profile Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Doctor Cards Grid (8 cols on XL) */}
        <div className="xl:col-span-8 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Active Practitioner Roster</span>
            <span className="font-caption text-caption text-outline">
              Displaying {filteredDoctors.length} of {doctors.length} credentialed physicians
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-outline">Loading physician roster...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-xl text-outline">
              No medical staff matched the selected criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {filteredDoctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`p-space-base rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden border-2 ${
                      isSelected ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-space-md">
                      <div className="relative shrink-0">
                        <img
                          src={doc.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200'}
                          alt={doc.fullName}
                          className="w-16 h-16 rounded-xl object-cover shadow-sm"
                        />
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-container-lowest flex items-center justify-center ${
                          doc.status === 'ON_DUTY' ? 'bg-secondary' : doc.status === 'IN_SURGERY' ? 'bg-error' : doc.status === 'IN_CONSULTATION' ? 'bg-primary' : 'bg-outline'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                            {doc.fullName}
                          </span>
                          {getStatusBadge(doc.status)}
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold truncate mt-0.5">
                          {doc.specialty}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px] text-outline">apartment</span>
                          {doc.ward || doc.department}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-surface-container text-center">
                      <div>
                        <span className="block font-caption text-caption text-outline">Lifetime Pts</span>
                        <span className="font-tabular-metric font-bold text-on-surface">
                          {doc.lifetimePatients || '1,200+'}
                        </span>
                      </div>
                      <div>
                        <span className="block font-caption text-caption text-outline">Success Rate</span>
                        <span className="font-tabular-metric font-bold text-secondary">
                          {doc.successRate ? `${doc.successRate}%` : '98.5%'}
                        </span>
                      </div>
                      <div>
                        <span className="block font-caption text-caption text-outline">Today Pts</span>
                        <span className="font-tabular-metric font-bold text-primary">
                          {doc.todayAppointmentsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sticky Doctor Inspector Panel (4 cols on XL) */}
        <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm sticky top-20">
          {selectedDoctor ? (
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Doctor Inspector</span>
                {getStatusBadge(selectedDoctor.status)}
              </div>

              <div className="flex items-center gap-space-md">
                <img
                  src={selectedDoctor.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300'}
                  alt={selectedDoctor.fullName}
                  className="w-20 h-20 rounded-2xl object-cover shadow"
                />
                <div className="flex flex-col min-w-0">
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">
                    {selectedDoctor.fullName}
                  </h3>
                  <span className="text-primary font-medium text-sm mt-0.5">{selectedDoctor.specialty}</span>
                  <span className="text-outline text-xs mt-0.5">{selectedDoctor.department}</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1.5 text-xs text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-outline">License ID:</span>
                  <span className="font-mono font-semibold text-on-surface">{selectedDoctor.licenseNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Assigned Ward:</span>
                  <span className="font-medium text-on-surface">{selectedDoctor.ward || 'General Outpatient'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Clinical Email:</span>
                  <span className="font-medium text-primary truncate max-w-[180px]">{selectedDoctor.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Direct Extension:</span>
                  <span className="font-medium text-on-surface">{selectedDoctor.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Credentials:</span>
                  <span className="font-medium text-on-surface">{selectedDoctor.qualifications || 'MD, Board Certified'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-caption text-caption text-outline uppercase font-semibold">Change Operational Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedDoctor.id, 'ON_DUTY')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedDoctor.status === 'ON_DUTY'
                        ? 'bg-secondary text-on-secondary border-secondary'
                        : 'bg-surface hover:bg-surface-container text-on-surface border-surface-container-high'
                    }`}
                  >
                    On Duty
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedDoctor.id, 'IN_SURGERY')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedDoctor.status === 'IN_SURGERY'
                        ? 'bg-error text-on-error border-error'
                        : 'bg-surface hover:bg-surface-container text-on-surface border-surface-container-high'
                    }`}
                  >
                    In Surgery
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedDoctor.id, 'IN_CONSULTATION')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedDoctor.status === 'IN_CONSULTATION'
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface hover:bg-surface-container text-on-surface border-surface-container-high'
                    }`}
                  >
                    In Consultation
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedDoctor.id, 'ON_LEAVE')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedDoctor.status === 'ON_LEAVE'
                        ? 'bg-outline text-white border-outline'
                        : 'bg-surface hover:bg-surface-container text-on-surface border-surface-container-high'
                    }`}
                  >
                    On Leave
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
                <button
                  onClick={() => {
                    setToastMsg(`Urgent page dispatched to ${selectedDoctor.fullName} via hospital pager system.`);
                    setTimeout(() => setToastMsg(null), 3500);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-error-container text-error font-label-md font-semibold hover:bg-error hover:text-on-error transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">emergency</span>
                  Page Doctor Urgently
                </button>
                <button
                  onClick={() => {
                    setToastMsg(`Routing to appointment scheduler for ${selectedDoctor.fullName}...`);
                    setTimeout(() => setToastMsg(null), 2500);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  Book Patient Consultation
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-outline">Select a physician from the roster to inspect full clinical details.</div>
          )}
        </div>
      </div>

      {/* Add Doctor Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Credential New Medical Doctor" maxWidth="max-w-2xl">
        <form onSubmit={handleCreateDoctor} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Full Legal & Clinical Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. Samantha Ward, MD"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">State License Number *</label>
              <input
                type="text"
                required
                placeholder="LIC-MD-10928-TX"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Clinical Specialty *</label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {SPECIALTY_OPTIONS.filter((s) => s !== 'All Specialties').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Department *</label>
              <input
                type="text"
                required
                placeholder="Cardiovascular Sciences"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Institutional Email *</label>
              <input
                type="email"
                required
                placeholder="s.ward@carepulse-hms.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Phone / Extension *</label>
              <input
                type="text"
                required
                placeholder="+1 (555) 482-9901"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Assigned Ward</label>
              <input
                type="text"
                placeholder="Cath Lab • Ward 4A"
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Degrees & Fellowships</label>
              <input
                type="text"
                placeholder="Harvard Medical School • Johns Hopkins Fellow"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Credentialing...' : 'Register Doctor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
