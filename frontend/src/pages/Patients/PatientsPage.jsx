import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';

export default function PatientsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 1420,
    inpatient: 412,
    outpatient: 829,
    observation: 137,
    criticalIcu: 42,
    discharged: 36,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedBlood, setSelectedBlood] = useState('All Blood Groups');

  // New Patient Registration Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    contactNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    residentialAddress: '',
    insuranceCarrier: 'Blue Cross Blue Shield',
    policyId: '',
    department: 'Cardiology',
    assignedDoctorId: '',
    careStatus: 'INPATIENT',
    bedNumber: 'Gen Ward 4B-10',
    triageNotes: '',
  });

  // Action popover
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    loadPatients();
    loadDoctors();
    loadStats();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await patientService.getAll();
      setPatients(data);
    } catch {
      // Fallback data if server not running yet
      setPatients([
        {
          id: 1,
          mrn: 'MRN-89421',
          fullName: 'Arthur Pendelton',
          nationalId: 'SSN-982-12-8821',
          age: 68,
          gender: 'Male',
          insuranceCarrier: 'Medicare Gold',
          bloodGroup: 'O+',
          contactNumber: '+1 (555) 234-8901',
          assignedDoctorName: 'Dr. Marcus Vance, MD',
          department: 'Cardiology',
          careStatus: 'Inpatient',
          bedNumber: 'Bed 302-B',
          admissionDate: '2026-10-24T08:30:00',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuweab9W_fojYbjK9yElg3AiVnv54SfPoE0J3j1U_LbYYbw9Dkss_gzRgg53aG-QPoQzjqGfgKqM2GntdhKtI6KMbiMEDUIdEi6TKNcNxfHUfPnEb90yvV9YlGiZC9xfhysMo_8IuXrJhh9EYAtXaCRLCNO2jePOHByMuXsqXbj1910etW81e1Py9NcidJcQVcprLF6JU1311Jj9CQn9dP4H0cQ4ukXv4vgOQMqwc9RtjXpT2FdMbc1g',
        },
        {
          id: 2,
          mrn: 'MRN-89422',
          fullName: 'Elena Morales-Rios',
          nationalId: 'SSN-881-43-1290',
          age: 42,
          gender: 'Female',
          insuranceCarrier: 'BlueCross PPO',
          bloodGroup: 'A+',
          contactNumber: '+1 (555) 489-3321',
          assignedDoctorName: 'Dr. Sarah Lin, MD',
          department: 'Neurology',
          careStatus: 'Outpatient',
          bedNumber: 'OPD Wing B',
          admissionDate: '2026-10-24T09:15:00',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6_4gjQRjjqAuugwxzMb4FiO-z3-9QyZJoHmQo2YxIDGIzQK-CQUvmd9p3PgOpzWBmH8Lb_kt8A9tk3oaYen1ayOGHzvFxGp5BUi1TTIn2N7sERy149FpT_FrXZ31NhcjSFEkHb0ysifKcL5KBPAkfOmjBvzhAj-eoChf6KMWOfWInFekSG3hwUohoWiEFdRVHMIFWD8qQZDNCMPKmSKL0c17ZBdDXs5z-pfPhUAFwokhYGtq0JPTsw',
        },
        {
          id: 3,
          mrn: 'MRN-89423',
          fullName: 'Tariq Al-Mansoor',
          nationalId: 'SSN-773-90-5512',
          age: 29,
          gender: 'Male',
          insuranceCarrier: 'Aetna Premier',
          bloodGroup: 'B-',
          contactNumber: '+1 (555) 712-4099',
          assignedDoctorName: 'Dr. Arvind Patel, MD',
          department: 'Trauma ER',
          careStatus: 'Critical ICU',
          bedNumber: 'ICU Bed 04',
          admissionDate: '2026-10-23T23:45:00',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq1G-UpvsRsPOkXIMNrjU5vt6hlToPEdDq6p3zuAjY60vQnFfMZDWILvGT5MZULXUValSgMUDyAZnVDgYyIv02I_DUG9vdqLt33_IhbIswMglfov_kV9HpmjWLiZcjd3zXjCpazp27Iazjd00_chXkaN3qnHdq5ppjK2OmENBmekYXFoEO8Px2FxuVVLmW94_6s6BVHmR0a_NpNNfdiahlJaS3tyyuwVAvz7jWYx-rmZUREY6LETGI7w',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, assignedDoctorId: data[0].id }));
      }
    } catch {
      // Ignored
    }
  };

  const loadStats = async () => {
    try {
      const data = await patientService.getStats();
      setStats(data);
    } catch {
      // Ignored
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        assignedDoctorId: formData.assignedDoctorId ? Number(formData.assignedDoctorId) : null,
      };
      await patientService.create(payload);
      setIsModalOpen(false);
      loadPatients();
      loadStats();
      alert(`Patient record registered successfully!`);
    } catch (err) {
      alert('Failed to register patient: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, mrn) => {
    if (confirm(`Confirm clinical deletion of Patient #${mrn}? Action will be recorded in audit log.`)) {
      try {
        await patientService.delete(id);
        loadPatients();
        loadStats();
      } catch (err) {
        alert('Failed to delete: ' + (err.response?.data?.message || err.message));
      }
    }
    setActiveMenuId(null);
  };

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      p.fullName?.toLowerCase().includes(q) ||
      p.mrn?.toLowerCase().includes(q) ||
      p.nationalId?.toLowerCase().includes(q) ||
      p.contactNumber?.toLowerCase().includes(q);

    const matchesStatus = selectedStatus === 'ALL' ||
      p.careStatus?.toLowerCase() === selectedStatus.toLowerCase() ||
      (selectedStatus === 'INPATIENT' && p.careStatus?.toLowerCase().includes('inpatient')) ||
      (selectedStatus === 'OUTPATIENT' && p.careStatus?.toLowerCase().includes('outpatient')) ||
      (selectedStatus === 'OBSERVATION' && p.careStatus?.toLowerCase().includes('observation')) ||
      (selectedStatus === 'DISCHARGED' && p.careStatus?.toLowerCase().includes('discharged'));

    const matchesDept = selectedDept === 'All Departments' ||
      p.department?.toLowerCase() === selectedDept.toLowerCase();

    const matchesBlood = selectedBlood === 'All Blood Groups' ||
      p.bloodGroup?.toLowerCase() === selectedBlood.toLowerCase() ||
      selectedBlood.includes(p.bloodGroup);

    return matchesQuery && matchesStatus && matchesDept && matchesBlood;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header & New Patient Button */}
      <div className="flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Patient Management Directory</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Master index of clinical records, active admissions, outpatient consults, and emergency intakes
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Register New Patient</span>
        </button>
      </div>

      {/* 1. Top Demographic KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="p-space-base bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Inpatient Admissions</span>
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">{stats.inpatient}</span>
            <span className="font-caption text-caption text-secondary font-medium mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +8.4% this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">hotel</span>
          </div>
        </div>

        <div className="p-space-base bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Outpatient Consults</span>
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">{stats.outpatient}</span>
            <span className="font-caption text-caption text-primary font-medium mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span> 18 waitlisted
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
          </div>
        </div>

        <div className="p-space-base bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">High-Acuity ICU / Ward</span>
            <span className="font-display-sm text-display-sm text-error font-bold tracking-tight">{stats.criticalIcu}</span>
            <span className="font-caption text-caption text-error font-medium mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span> Critical care alerts
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[24px]">e911_emergency</span>
          </div>
        </div>

        <div className="p-space-base bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Scheduled Discharges</span>
            <span className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">{stats.discharged}</span>
            <span className="font-caption text-caption text-on-surface-variant font-medium mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">done_all</span> Pending clearance
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-[24px]">output</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Advanced Filter Toolbar */}
      <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-sm">
          {/* Universal Search */}
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient Name, Hospital MRN, National ID, Phone..."
              className="w-full pl-10 pr-24 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm focus:outline-none focus:bg-surface-container focus:ring-2 focus:ring-primary-container transition-all"
            />
            <div className="absolute right-space-sm top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-caption text-caption">
                {filteredPatients.length} items
              </span>
            </div>
          </div>

          {/* Quick Status Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 xl:pb-0">
            {['ALL', 'INPATIENT', 'OUTPATIENT', 'OBSERVATION', 'DISCHARGED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-space-sm py-1 rounded-full font-caption text-caption font-semibold transition-colors whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {st === 'ALL' ? `All Patients (${stats.total})` : `${st.charAt(0) + st.slice(1).toLowerCase()}`}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-space-xs pt-space-xs">
          <div className="flex flex-col gap-1">
            <label className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Clinical Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface font-body-sm px-space-sm py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Oncology</option>
              <option>Trauma Emergency</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Blood Group</label>
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface font-body-sm px-space-sm py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <option>All Blood Groups</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Patients Interactive Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-surface-container-low font-caption text-caption uppercase text-on-surface-variant font-semibold tracking-wider">
                <th className="py-space-sm px-space-md w-12 text-center">
                  <input type="checkbox" className="rounded accent-primary cursor-pointer w-4 h-4" />
                </th>
                <th className="py-space-sm px-space-md">MRN / Patient ID</th>
                <th className="py-space-sm px-space-md">Patient & Demographics</th>
                <th className="py-space-sm px-space-md">Blood Type</th>
                <th className="py-space-sm px-space-md">Contact No.</th>
                <th className="py-space-sm px-space-md">Assigned Physician</th>
                <th className="py-space-sm px-space-md">Department</th>
                <th className="py-space-sm px-space-md">Care Status</th>
                <th className="py-space-sm px-space-md">Admission Date</th>
                <th className="py-space-sm px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container-low">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors group">
                  <td className="py-space-sm px-space-md text-center">
                    <input type="checkbox" className="rounded accent-primary cursor-pointer w-4 h-4" />
                  </td>
                  <td className="py-space-sm px-space-md">
                    <span className="font-tabular-metric text-tabular-metric font-semibold text-primary">#{p.mrn}</span>
                    {p.bedNumber && (
                      <span className="block font-caption text-caption text-outline">{p.bedNumber}</span>
                    )}
                  </td>
                  <td className="py-space-sm px-space-md">
                    <div className="flex items-center gap-space-sm">
                      {p.avatarUrl ? (
                        <img className="w-10 h-10 rounded-full object-cover shadow-sm" src={p.avatarUrl} alt={p.fullName} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold">
                          {p.fullName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {p.fullName}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          {p.age ? `${p.age} yrs • ` : ''}{p.gender} • {p.insuranceCarrier || 'Self-Pay'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <span className="px-2 py-0.5 rounded-md bg-error-container text-on-error-container font-tabular-metric text-caption font-bold">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-tabular-metric">
                    {p.contactNumber}
                    <span className="block font-caption text-caption text-secondary">Verified Mobile</span>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">stethoscope</span>
                      <span className="font-label-md text-label-md font-medium">{p.assignedDoctorName || 'Attending Physician'}</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold">
                      {p.department}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <StatusBadge status={p.careStatus} />
                  </td>
                  <td className="py-space-sm px-space-md font-tabular-metric text-on-surface-variant">
                    {p.admissionDate ? p.admissionDate.split('T')[0] : 'Today'}
                  </td>
                  <td className="py-space-sm px-space-md text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admissions`)}
                        className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                        title="View Full Chart"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={() => navigate(`/billing`)}
                        className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors"
                        title="Generate Bill"
                      >
                        <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                      </button>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === p.id ? null : p.id)}
                        className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                        title="More Actions"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>

                    {/* Action Popover Menu */}
                    {activeMenuId === p.id && (
                      <div className="absolute right-4 top-10 w-48 bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 py-1 z-30 text-left">
                        <button
                          onClick={() => {
                            navigate('/appointments');
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-surface-container text-body-sm flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                          <span>Schedule Consult</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/laboratory');
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-surface-container text-body-sm flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">biotech</span>
                          <span>Order Labs</span>
                        </button>
                        <div className="border-t border-surface-container-high my-1"></div>
                        <button
                          onClick={() => handleDelete(p.id, p.mrn)}
                          className="w-full px-3 py-2 text-left hover:bg-error-container text-error text-body-sm flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Archive Record</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. New Patient Registration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Patient Registration"
        subtitle="Enter clinical admission particulars to issue a unique Hospital MRN"
        icon="person_add"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          {/* Section 1: Demographics */}
          <div>
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-low mb-3">
              <span className="font-caption text-caption uppercase tracking-wider text-primary font-bold">
                1. Primary Demographics
              </span>
              <span className="font-caption text-caption text-outline">* Mandatory Fields</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">National ID / SSN *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSN-982-12-8821"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact */}
          <div>
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-low mb-3">
              <span className="font-caption text-caption uppercase tracking-wider text-primary font-bold">
                2. Contact & Next of Kin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Primary Contact Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Emergency Next of Kin Name</label>
                <input
                  type="text"
                  placeholder="e.g. Samantha Vance (Spouse)"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="Street address, city, state, zip code"
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Insurance & Routing */}
          <div>
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-low mb-3">
              <span className="font-caption text-caption uppercase tracking-wider text-primary font-bold">
                3. Insurance & Admission Classification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Insurance Carrier</label>
                <select
                  value={formData.insuranceCarrier}
                  onChange={(e) => setFormData({ ...formData, insuranceCarrier: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option>Blue Cross Blue Shield</option>
                  <option>Aetna Healthcare</option>
                  <option>UnitedHealthcare</option>
                  <option>Medicare Part A/B</option>
                  <option>Self-Pay / Direct Bill</option>
                </select>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Policy ID</label>
                <input
                  type="text"
                  placeholder="POL-99214-X"
                  value={formData.policyId}
                  onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Admitting Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Trauma Emergency</option>
                  <option>Orthopedics</option>
                  <option>General Medicine</option>
                </select>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Attending Physician</label>
                <select
                  value={formData.assignedDoctorId}
                  onChange={(e) => setFormData({ ...formData, assignedDoctorId: e.target.value })}
                  className="w-full h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.fullName} ({doc.specialty})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Triage Notes */}
          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Initial Triage & Chief Complaint Notes</label>
            <textarea
              rows="2"
              placeholder="Document symptoms upon intake, known drug allergies, vitals at triage desk..."
              value={formData.triageNotes}
              onChange={(e) => setFormData({ ...formData, triageNotes: e.target.value })}
              className="w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-space-lg py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-xl py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold shadow-sm"
            >
              Confirm & Register Patient
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
