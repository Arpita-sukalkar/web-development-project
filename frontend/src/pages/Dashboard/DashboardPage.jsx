import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import { admissionService } from '../../services/admissionService';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Form states
  const [admissionForm, setAdmissionForm] = useState({
    patientId: '',
    ward: 'ICU & Critical Care',
    bedNumber: 'ICU Bed 05',
    triageAcuity: 'IMMEDIATE',
    attendingDoctorId: '',
    diagnosis: '',
  });

  const [transferForm, setTransferForm] = useState({
    admissionId: '',
    newWard: 'General Medical Ward',
    newBedNumber: 'Bed 401-A',
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const summary = await dashboardService.getSummary();
      setData(summary);
    } catch {
      // Data fallback handled gracefully in render
    } finally {
      setLoading(false);
    }
  };

  const openAdmissionModal = async (acuity = 'STANDARD') => {
    try {
      const [pts, docs] = await Promise.all([
        patientService.getAll(),
        doctorService.getAll(),
      ]);
      setPatients(pts);
      setDoctors(docs);
      if (pts.length > 0) {
        setAdmissionForm((prev) => ({
          ...prev,
          patientId: pts[0].id,
          triageAcuity: acuity,
          attendingDoctorId: docs.length > 0 ? docs[0].id : '',
        }));
      }
      setIsAdmissionModalOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    try {
      await admissionService.create({
        ...admissionForm,
        patientId: Number(admissionForm.patientId),
        attendingDoctorId: admissionForm.attendingDoctorId ? Number(admissionForm.attendingDoctorId) : null,
      });
      setIsAdmissionModalOpen(false);
      loadDashboardData();
    } catch (err) {
      alert('Failed to register admission: ' + (err.response?.data?.message || err.message));
    }
  };

  const openTransferModal = async () => {
    try {
      const summary = await dashboardService.getSummary();
      if (summary.recentAdmissions && summary.recentAdmissions.length > 0) {
        setTransferForm((prev) => ({
          ...prev,
          admissionId: summary.recentAdmissions[0].id,
        }));
      }
      setIsTransferModalOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      await admissionService.transferBed(
        transferForm.admissionId,
        transferForm.newWard,
        transferForm.newBedNumber
      );
      setIsTransferModalOpen(false);
      loadDashboardData();
    } catch (err) {
      alert('Failed to transfer bed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Safe fallback metrics
  const totalPatients = data?.totalPatients ?? 1420;
  const doctorsOnDuty = data?.doctorsOnDuty ?? 84;
  const totalDoctors = data?.totalDoctors ?? 96;
  const appointmentsCount = data?.todayAppointments ?? 128;
  const completedAppts = data?.completedAppointments ?? 42;
  const upcomingAppts = data?.upcomingAppointments ?? 86;
  const inpatientCensus = data?.inpatientCensus ?? 342;
  const netAdmToday = data?.netAdmissionsToday ?? 18;
  const availableBeds = data?.availableBeds ?? 48;
  const totalBeds = data?.totalBedsCapacity ?? 420;
  const occupancyRate = data?.occupancyRate ?? 88.6;
  const activeErCases = data?.activeErCases ?? 14;
  const redTriage = data?.redTriageCount ?? 3;
  const todayRevenue = data?.todayRevenue ? `$${(data.todayRevenue / 1000).toFixed(1)}k` : '$84.3k';

  const wardOccupancies = data?.wardOccupancies || [
    { wardName: 'ICU & Critical Care', occupancyPercentage: 95, statusColor: 'error' },
    { wardName: 'General Medical Ward', occupancyPercentage: 92, statusColor: 'primary' },
    { wardName: 'Emergency Ward (ER)', occupancyPercentage: 85, statusColor: 'secondary' },
    { wardName: 'Private & Semi-Private', occupancyPercentage: 80, statusColor: 'tertiary' },
  ];

  const specialties = data?.specialtiesToday || [
    { specialty: 'Cardiology', leadDoctor: 'Dr. Sarah Adams + 2', count: 38, icon: 'cardiology', colorClass: 'error' },
    { specialty: 'Orthopedics', leadDoctor: 'Dr. Robert Reyes', count: 29, icon: 'orthopedics', colorClass: 'primary' },
    { specialty: 'Pediatrics', leadDoctor: 'Dr. Maya Patel', count: 24, icon: 'child_care', colorClass: 'secondary' },
    { specialty: 'Neurology', leadDoctor: 'Dr. Julian Vance', count: 21, icon: 'psychology', colorClass: 'tertiary' },
    { specialty: 'Oncology', leadDoctor: 'Dr. Kenneth Wu', count: 16, icon: 'health_and_safety', colorClass: 'primary-fixed' },
  ];

  const appointmentsList = data?.recentAppointments || [
    {
      id: 1,
      patientName: 'Eleanor Vance',
      patientMrn: 'MRN-90214',
      doctorName: 'Dr. Sarah Adams',
      appointmentDateTime: '2026-09-08T09:15:00',
      department: 'Cardiology',
      appointmentType: 'Echo Follow-up',
      status: 'In Consult',
      patientAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALsxywleVK_vpNQZodzRJrowVyMUJDcGc01-hdIT-CojnFRwYvfWtPAOzLRHgHcQMXEobbPBmoRiR5abni9TJ-evSTTo6ckomm2H-VDn-Us27zUOYLuiQEBaJ7bcT_4xqGZYMo3CBcJyxKp4JL9lXIxGmS0yHSyLdkUQOoFLNXz1U6pmg8CvouSSNnxNAcgGi-rOGDblZ5ZiHxMRj6hPkt3imOeTFZ40r27Q18H8VLJiU203upQmRxIg',
    },
    {
      id: 2,
      patientName: 'Marcus Brody',
      patientMrn: 'MRN-88412',
      doctorName: 'Dr. Robert Reyes',
      appointmentDateTime: '2026-09-08T09:30:00',
      department: 'Orthopedics',
      appointmentType: 'Post-Op Cast Check',
      status: 'Checked In',
      patientAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmsuYwcwfhKY5-RzfkGkimLkxs5WbGQgSE9j5qmlM0N-Y-Eprs-05KuYsx4ilUrvfyg75ZTO5JJk_uyf9p2djiK0jW_q8I86cQ58L0WyrgyiImTPh0Hm4aNFb019JTw4RNendTDeHpdWvzA5ZnBmXqSJH2sA9dQh6rXw8y5OGVBQLipaEHplk9qicBDu5EEzDclQqOoG2hpGF_DrsMF6j8NtrPupQU_i-8emsQw3B8Fcy1XeUYUXiM5w',
    },
    {
      id: 3,
      patientName: 'Grace Henderson',
      patientMrn: 'MRN-72301',
      doctorName: 'Dr. Julian Vance',
      appointmentDateTime: '2026-09-08T10:00:00',
      department: 'Neurology',
      appointmentType: 'EEG Review',
      status: 'Scheduled',
      patientAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt3vwNeUOZKqGctrlLeb60F5A5qMI1mo5ycW3qURZoWkZpP5iF7TnY16jIBEbfAcCwG8m0Q8coYr04oSh37MKGCIOl-KQB3np01gW3a81mZl7H5LvRkIsfa-QXcqpaupy102VzLtGNRvQm6RAY5dIAB3l8nJEa8tfu5HWzk8Bn535pgnheCebfG4VlhVW0C74RWwknTE6iDb7JrQxbefGhUHbxnZDFLBrhfKlAd4C-94odLFGsQLJR5Q',
    },
    {
      id: 4,
      patientName: 'Arthur Liu',
      patientMrn: 'MRN-43198',
      doctorName: 'Dr. Maya Patel',
      appointmentDateTime: '2026-09-08T10:15:00',
      department: 'Pediatrics',
      appointmentType: 'Annual Well Check',
      status: 'Scheduled',
    },
  ];

  const admissionsList = data?.recentAdmissions || [
    {
      id: 1,
      patientName: 'John Doe (Unidentified)',
      patientMrn: 'TRAUMA-991',
      triageAcuity: 'IMMEDIATE',
      bedNumber: 'ICU Bed 03',
      attendingDoctorName: 'Dr. Elizabeth Chen',
      admissionDateTime: '8 min ago',
    },
    {
      id: 2,
      patientName: "Samuel O'Connor",
      patientMrn: 'MRN-55182',
      triageAcuity: 'URGENT',
      bedNumber: 'ER Bay 06',
      attendingDoctorName: 'Dr. Kenneth Wu',
      admissionDateTime: '24 min ago',
    },
    {
      id: 3,
      patientName: 'Teresa Lin',
      patientMrn: 'MRN-31294',
      triageAcuity: 'STANDARD',
      bedNumber: 'Gen Ward 4B-12',
      attendingDoctorName: 'Dr. Sarah Adams',
      admissionDateTime: '42 min ago',
    },
    {
      id: 4,
      patientName: 'David Kim',
      patientMrn: 'MRN-99812',
      triageAcuity: 'STANDARD',
      bedNumber: 'Surg Post-Op 2A',
      attendingDoctorName: 'Dr. Robert Reyes',
      admissionDateTime: '1 hr ago',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Fast Hospital Operations Banner & Actions */}
      <div className="w-full bg-surface-container-lowest shadow-sm rounded-xl p-space-md flex flex-wrap items-center justify-between gap-space-md border border-outline-variant/30">
        <div className="flex items-center gap-space-md min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">local_hospital</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">Executive Clinical Command Center</span>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-caption uppercase font-bold tracking-wider">
                Shift A • Active
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Real-time bed telemetry, emergency acuity counters, and multi-department flow
            </span>
          </div>
        </div>

        {/* Quick Action Toolbelt */}
        <div className="flex items-center flex-wrap gap-space-xs">
          <button
            onClick={() => openAdmissionModal('STANDARD')}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container shadow-sm transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>New Admission</span>
          </button>
          <button
            onClick={() => openAdmissionModal('IMMEDIATE')}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-error text-on-error rounded-lg font-label-md text-label-md hover:opacity-95 shadow-sm transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>Quick Triage Register</span>
          </button>
          <button
            onClick={openTransferModal}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">swap_horiz</span>
            <span>Transfer Bed</span>
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">assessment</span>
            <span>Census Report</span>
          </button>
        </div>
      </div>

      {/* 1. Top KPI Summary Grid (7 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-space-sm w-full">
        {/* Metric 1: Total Patients */}
        <StatCard
          label="Total Patients"
          value={totalPatients.toLocaleString()}
          delta="+4.2%"
          deltaLabel="this week"
          icon="groups"
          color="primary"
        />

        {/* Metric 2: Doctors on Duty */}
        <StatCard
          label="Doctors on Duty"
          value={doctorsOnDuty}
          subValue={`/ ${totalDoctors} total`}
          delta="12 on call"
          deltaLabel="94% staffed"
          icon="stethoscope"
          color="secondary"
        />

        {/* Metric 3: Today's Appointments */}
        <StatCard
          label="Appointments"
          value={appointmentsCount}
          delta={`${completedAppts} done`}
          deltaLabel={`${upcomingAppts} upcoming`}
          icon="calendar_today"
          color="primary"
        />

        {/* Metric 4: Admitted Patients */}
        <StatCard
          label="Inpatient Census"
          value={inpatientCensus}
          delta={`+${netAdmToday}`}
          deltaLabel="net adm today"
          icon="bed"
          color="tertiary"
        />

        {/* Metric 5: Available Beds */}
        <StatCard
          label="Available Beds"
          value={availableBeds}
          subValue={`/ ${totalBeds} cap`}
          delta={`${occupancyRate}% occ`}
          deltaLabel="Critical cap"
          icon="hotel"
          color="primary"
        />

        {/* Metric 6: Emergency Cases */}
        <StatCard
          label="Active ER Cases"
          value={activeErCases}
          delta={`${redTriage} RED TRIAGE`}
          deltaLabel="11 amber"
          icon="e911_emergency"
          color="error"
        />

        {/* Metric 7: Today's Revenue */}
        <StatCard
          label="Today's Revenue"
          value={todayRevenue}
          delta="+12%"
          deltaLabel="vs daily avg"
          icon="payments"
          color="secondary"
        />
      </div>

      {/* 2. Interactive Hospital Analytics Row (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg w-full">
        {/* Trend Visualization (5 cols) */}
        <div className="lg:col-span-6 xl:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <span className="font-headline-md text-headline-md text-on-surface block">Patient Flow Trends</span>
              <span className="font-caption text-caption text-on-surface-variant">7-day rolling Inpatient Admissions vs. Outpatient Discharges</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <div className="flex items-center gap-space-2xs">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="font-caption text-caption text-on-surface-variant">Inpatients</span>
              </div>
              <div className="flex items-center gap-space-2xs ml-space-xs">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="font-caption text-caption text-on-surface-variant">Outpatients</span>
              </div>
            </div>
          </div>

          {/* Area / Bar Chart SVG with SVG Defs & Subtle Clinical Gridlines */}
          <div className="w-full h-56 relative flex items-end pt-space-md pb-space-xs">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 460 160">
              <defs>
                <linearGradient id="inpatientGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#003c90" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#003c90" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="outpatientGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006a61" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#006a61" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal Guides */}
              <line stroke="#dce9ff" strokeDasharray="3 3" x1="0" x2="460" y1="30" y2="30" />
              <line stroke="#dce9ff" strokeDasharray="3 3" x1="0" x2="460" y1="80" y2="80" />
              <line stroke="#dce9ff" strokeDasharray="3 3" x1="0" x2="460" y1="130" y2="130" />
              {/* Inpatient Area Path */}
              <path d="M 0 110 Q 75 40, 150 70 T 300 45 T 460 30 L 460 160 L 0 160 Z" fill="url(#inpatientGrad)" />
              <path d="M 0 110 Q 75 40, 150 70 T 300 45 T 460 30" fill="none" stroke="#003c90" strokeWidth="2.5" />
              {/* Outpatient Area Path */}
              <path d="M 0 135 Q 75 90, 150 115 T 300 80 T 460 65 L 460 160 L 0 160 Z" fill="url(#outpatientGrad)" />
              <path d="M 0 135 Q 75 90, 150 115 T 300 80 T 460 65" fill="none" stroke="#006a61" strokeWidth="2.5" />
              {/* Data Points */}
              <circle cx="150" cy="70" fill="#003c90" r="4" stroke="#ffffff" strokeWidth="2" />
              <circle cx="300" cy="45" fill="#003c90" r="4" stroke="#ffffff" strokeWidth="2" />
              <circle cx="460" cy="30" fill="#003c90" r="5" stroke="#ffffff" strokeWidth="2" />
              <circle cx="150" cy="115" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
              <circle cx="300" cy="80" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
              <circle cx="460" cy="65" fill="#006a61" r="5" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-outline font-caption text-caption pt-space-xs">
            <span>Mon 12</span>
            <span>Tue 13</span>
            <span>Wed 14</span>
            <span>Thu 15</span>
            <span>Fri 16</span>
            <span>Sat 17</span>
            <span className="text-primary font-semibold">Today (Live)</span>
          </div>
        </div>

        {/* Bed Occupancy by Ward (4 cols) */}
        <div className="lg:col-span-6 xl:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <div>
              <span className="font-headline-md text-headline-md text-on-surface block">Ward Bed Utilization</span>
              <span className="font-caption text-caption text-on-surface-variant">Live telemetry from {totalBeds} active facility beds</span>
            </div>
            <span className="material-symbols-outlined text-outline">tune</span>
          </div>

          {/* Visual Donut Meter */}
          <div className="flex items-center justify-center my-space-xs">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" fill="none" r="48" stroke="#e5eeff" strokeWidth="12" />
                <circle cx="60" cy="60" fill="none" r="48" stroke="#003c90" strokeDasharray="301.6" strokeDashoffset="34" strokeLinecap="round" strokeWidth="12" />
                <circle cx="60" cy="60" fill="none" r="48" stroke="#ba1a1a" strokeDasharray="301.6" strokeDashoffset="260" strokeLinecap="round" strokeWidth="12" />
                <circle cx="60" cy="60" fill="none" r="48" stroke="#006a61" strokeDasharray="301.6" strokeDashoffset="200" strokeLinecap="round" strokeWidth="12" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-sm text-display-sm text-on-surface tabular-nums font-bold">{occupancyRate}%</span>
                <span className="font-caption text-caption text-outline font-semibold uppercase">Total Load</span>
              </div>
            </div>
          </div>

          {/* Ward Progress Indicators */}
          <div className="space-y-space-xs pt-space-xs">
            {wardOccupancies.map((w) => (
              <div key={w.wardName} className="flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-space-xs">
                  <span className={`w-2.5 h-2.5 rounded-full ${w.statusColor === 'error' ? 'bg-error' : w.statusColor === 'secondary' ? 'bg-secondary' : w.statusColor === 'tertiary' ? 'bg-tertiary' : 'bg-primary'}`}></span>
                  <span className="font-label-sm text-label-sm text-on-surface">{w.wardName}</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="w-20 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className={`h-full rounded-full ${w.statusColor === 'error' ? 'bg-error' : w.statusColor === 'secondary' ? 'bg-secondary' : w.statusColor === 'tertiary' ? 'bg-tertiary' : 'bg-primary'}`}
                      style={{ width: `${w.occupancyPercentage}%` }}
                    ></div>
                  </div>
                  <span className={`font-label-sm text-label-sm font-semibold tabular-nums w-8 text-right ${w.statusColor === 'error' ? 'text-error' : 'text-on-surface'}`}>
                    {w.occupancyPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Appointment Breakdown (3 cols) */}
        <div className="lg:col-span-12 xl:col-span-3 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <div>
                <span className="font-headline-md text-headline-md text-on-surface block">Specialties Today</span>
                <span className="font-caption text-caption text-on-surface-variant">Scheduled clinical encounters</span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-caption text-caption font-bold">
                {appointmentsCount} Booked
              </span>
            </div>

            <div className="space-y-space-sm mt-space-md">
              {specialties.map((s) => (
                <div key={s.specialty} className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-7 h-7 rounded bg-surface-container-highest text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block font-medium">{s.specialty}</span>
                      <span className="font-caption text-caption text-outline">{s.leadDoctor}</span>
                    </div>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary tabular-nums font-bold">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-space-md pt-space-xs flex items-center justify-between text-caption font-caption text-outline">
            <span>Average duration: 32 min</span>
            <span className="text-secondary font-medium">96% On Schedule</span>
          </div>
        </div>
      </div>

      {/* 3. Operational Overview Tables (Split Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg w-full">
        {/* Today's Schedule & Appointments Quick Table */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-low">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface block font-bold">Today's Schedule & Appointments</span>
                  <span className="font-caption text-caption text-on-surface-variant">Next active consults & examinations</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/appointments')}
                className="flex items-center gap-space-2xs text-primary font-label-md text-label-md hover:underline font-semibold"
              >
                <span>View All Appointments</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                    <th className="py-space-xs px-space-sm rounded-l-lg">Patient</th>
                    <th className="py-space-xs px-space-sm">Physician</th>
                    <th className="py-space-xs px-space-sm">Time</th>
                    <th className="py-space-xs px-space-sm">Dept / Type</th>
                    <th className="py-space-xs px-space-sm text-right rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low/40 text-body-sm">
                  {appointmentsList.map((apt) => (
                    <tr key={apt.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-space-sm px-space-sm font-label-md text-label-md text-on-surface font-semibold">
                        <div className="flex items-center gap-space-xs">
                          {apt.patientAvatarUrl ? (
                            <img className="w-7 h-7 rounded-full object-cover" src={apt.patientAvatarUrl} alt={apt.patientName} />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-caption font-bold">
                              {apt.patientName.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <span>{apt.patientName}</span>
                            <span className="block font-caption text-caption text-outline font-normal">{apt.patientMrn}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-sm font-body-sm text-body-sm text-on-surface">{apt.doctorName}</td>
                      <td className="py-space-sm px-space-sm font-label-sm text-label-sm text-on-surface font-semibold tabular-nums">
                        {apt.appointmentDateTime.includes('T') ? apt.appointmentDateTime.split('T')[1].slice(0, 5) : apt.appointmentDateTime}
                      </td>
                      <td className="py-space-sm px-space-sm font-caption text-caption">
                        <span className="text-on-surface font-medium block">{apt.department}</span>
                        <span className="text-outline">{apt.appointmentType}</span>
                      </td>
                      <td className="py-space-sm px-space-sm text-right">
                        <StatusBadge status={apt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-space-sm mt-space-xs flex items-center justify-between text-caption font-caption text-outline bg-surface-container-low p-space-xs rounded-lg">
            <span>Average Wait Time: <strong>11 mins</strong></span>
            <span className="text-primary font-semibold">Next check-in call at 09:25 AM</span>
          </div>
        </div>

        {/* Recent Admissions & ER Arrivals Quick Table */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-low">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[20px]">medical_services</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface block font-bold">Recent Admissions & ER Arrivals</span>
                  <span className="font-caption text-caption text-on-surface-variant">Live clinical intake and triage stratification</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/admissions')}
                className="flex items-center gap-space-2xs text-primary font-label-md text-label-md hover:underline font-semibold"
              >
                <span>View Admissions</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                    <th className="py-space-xs px-space-sm rounded-l-lg">Patient</th>
                    <th className="py-space-xs px-space-sm">Triage Acuity</th>
                    <th className="py-space-xs px-space-sm">Ward / Bed</th>
                    <th className="py-space-xs px-space-sm">Physician</th>
                    <th className="py-space-xs px-space-sm text-right rounded-r-lg">Arrival</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low/40 text-body-sm">
                  {admissionsList.map((adm) => (
                    <tr key={adm.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-space-sm px-space-sm font-label-md text-label-md text-on-surface font-semibold">
                        <div className="flex items-center gap-space-xs">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-caption font-bold ${adm.triageAcuity === 'IMMEDIATE' ? 'bg-error-container text-error' : 'bg-surface-container-highest text-primary'}`}>
                            {adm.patientName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span>{adm.patientName}</span>
                            <span className="block font-caption text-caption text-outline font-normal">{adm.patientMrn}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-sm">
                        <StatusBadge status={adm.triageAcuity} />
                      </td>
                      <td className="py-space-sm px-space-sm font-caption text-caption font-semibold text-primary">
                        {adm.bedNumber}
                      </td>
                      <td className="py-space-sm px-space-sm font-body-sm text-body-sm text-on-surface">
                        {adm.attendingDoctorName || 'Dr. Elizabeth Chen'}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-label-sm text-label-sm tabular-nums text-on-surface font-medium">
                        {adm.admissionDateTime?.includes('T') ? adm.admissionDateTime.split('T')[1].slice(0, 5) : adm.admissionDateTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-space-sm mt-space-xs flex items-center justify-between text-caption font-caption text-outline bg-surface-container-low p-space-xs rounded-lg">
            <span className="flex items-center gap-space-2xs text-error font-medium">
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              Direct Trauma Alert is active for Trauma Bay 3
            </span>
            <span className="text-on-surface font-semibold">Paramedic Unit 4 incoming (ETA 4 min)</span>
          </div>
        </div>
      </div>

      {/* New Admission Modal */}
      <Modal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        title="Clinical Inpatient & Triage Admission"
        subtitle="Assign ward bed, register triage acuity, and route attending doctor"
        icon="hotel"
      >
        <form onSubmit={handleAdmissionSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Select Patient *</label>
              <select
                required
                value={admissionForm.patientId}
                onChange={(e) => setAdmissionForm({ ...admissionForm, patientId: e.target.value })}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.mrn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Triage Acuity *</label>
              <select
                value={admissionForm.triageAcuity}
                onChange={(e) => setAdmissionForm({ ...admissionForm, triageAcuity: e.target.value })}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="IMMEDIATE">Immediate (Code Red / Level 1)</option>
                <option value="URGENT">Urgent (Level 2)</option>
                <option value="STANDARD">Standard Admission</option>
                <option value="OBSERVATION">Observation Hold</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Target Ward *</label>
              <select
                value={admissionForm.ward}
                onChange={(e) => setAdmissionForm({ ...admissionForm, ward: e.target.value })}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="ICU & Critical Care">ICU & Critical Care</option>
                <option value="General Medical Ward">General Medical Ward</option>
                <option value="Emergency Ward (ER)">Emergency Ward (ER)</option>
                <option value="Private & Semi-Private">Private & Semi-Private</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Bed Identifier *</label>
              <input
                type="text"
                required
                value={admissionForm.bedNumber}
                onChange={(e) => setAdmissionForm({ ...admissionForm, bedNumber: e.target.value })}
                placeholder="e.g. ICU Bed 08 or Ward 4B-02"
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Attending Physician</label>
              <select
                value={admissionForm.attendingDoctorId}
                onChange={(e) => setAdmissionForm({ ...admissionForm, attendingDoctorId: e.target.value })}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName} ({d.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Primary Diagnosis & Symptoms</label>
              <textarea
                rows="2"
                value={admissionForm.diagnosis}
                onChange={(e) => setAdmissionForm({ ...admissionForm, diagnosis: e.target.value })}
                placeholder="Document admitting diagnosis, telemetry requirements, allergies..."
                className="w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setIsAdmissionModalOpen(false)}
              className="px-space-lg py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-xl py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold shadow-sm"
            >
              Confirm Admission
            </button>
          </div>
        </form>
      </Modal>

      {/* Transfer Bed Modal */}
      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="Transfer Patient Bed"
        subtitle="Reassign inpatient telemetry ward or bed allocation"
        icon="swap_horiz"
      >
        <form onSubmit={handleTransferSubmit} className="space-y-4">
          <div>
            <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Select Admission Record</label>
            <select
              value={transferForm.admissionId}
              onChange={(e) => setTransferForm({ ...transferForm, admissionId: e.target.value })}
              className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              {admissionsList.map((adm) => (
                <option key={adm.id} value={adm.id}>
                  {adm.patientName} (Current: {adm.bedNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">Target Ward</label>
              <select
                value={transferForm.newWard}
                onChange={(e) => setTransferForm({ ...transferForm, newWard: e.target.value })}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="General Medical Ward">General Medical Ward</option>
                <option value="ICU & Critical Care">ICU & Critical Care</option>
                <option value="Emergency Ward (ER)">Emergency Ward (ER)</option>
                <option value="Private & Semi-Private">Private & Semi-Private</option>
              </select>
            </div>
            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface block mb-1">New Bed Number</label>
              <input
                type="text"
                required
                value={transferForm.newBedNumber}
                onChange={(e) => setTransferForm({ ...transferForm, newBedNumber: e.target.value })}
                placeholder="e.g. Bed 402-B"
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setIsTransferModalOpen(false)}
              className="px-space-lg py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-xl py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold shadow-sm"
            >
              Execute Transfer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
