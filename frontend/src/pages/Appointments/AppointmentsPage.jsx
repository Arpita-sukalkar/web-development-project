import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import { formatDate, formatTime } from '../../utils/formatters';
import Modal from '../../components/common/Modal';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(24);
  const [toastMsg, setToastMsg] = useState(null);

  // Book Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    department: 'Cardiology',
    appointmentDateTime: '2026-09-08T14:30',
    appointmentType: 'Consultation',
    durationMinutes: 30,
    reasonNotes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [aptData, ptsData, docsData] = await Promise.all([
        appointmentService.getAll(),
        patientService.getAll(),
        doctorService.getAll(),
      ]);
      setAppointments(aptData);
      setPatients(ptsData);
      setDoctors(docsData);
      if (ptsData.length > 0 && !formData.patientId) {
        setFormData((prev) => ({
          ...prev,
          patientId: ptsData[0].id,
          doctorId: docsData[0]?.id || '',
        }));
      }
    } catch (err) {
      console.error('Failed to load appointments data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await appointmentService.updateStatus(id, newStatus);
      setToastMsg(`Appointment status updated to ${newStatus}`);
      setTimeout(() => setToastMsg(null), 3000);
      fetchData();
    } catch (err) {
      console.error('Failed to update appointment status', err);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await appointmentService.create({
        ...formData,
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
      });
      setIsModalOpen(false);
      fetchData();
      setToastMsg('Appointment booked successfully!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to book appointment:', err);
      alert('Error creating appointment: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus =
      statusFilter === 'all' ||
      apt.status?.toLowerCase().replace('_', '-') === statusFilter.toLowerCase();

    const matchesDept =
      departmentFilter === 'all' ||
      apt.department?.toLowerCase() === departmentFilter.toLowerCase();

    return matchesStatus && matchesDept;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-caption text-caption font-bold">Scheduled</span>;
      case 'IN_CONSULTATION':
        return <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-caption text-caption font-bold animate-pulse">In Consultation</span>;
      case 'COMPLETED':
        return <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-caption font-bold">Completed</span>;
      case 'CANCELLED':
        return <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-bold">Cancelled</span>;
      case 'NO_SHOW':
        return <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-bold">No Show</span>;
      default:
        return <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-bold">{status}</span>;
    }
  };

  const totalToday = appointments.length;
  const scheduledCount = appointments.filter((a) => a.status === 'SCHEDULED').length;
  const inConsultCount = appointments.filter((a) => a.status === 'IN_CONSULTATION').length;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length;
  const cancelledCount = appointments.filter((a) => a.status === 'CANCELLED').length;
  const noShowCount = appointments.filter((a) => a.status === 'NO_SHOW').length;

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption uppercase tracking-wider">
            <span>Outpatient Pavilion</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span>Wing C & Tele-Health Center</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <h1 className="font-display-sm text-display-sm text-on-surface tracking-tight font-bold">
              Clinical Appointments & Outpatient Schedule
            </h1>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-caption font-semibold">
              Live Feed
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Real-time scheduling matrix, triage tracking, and clinical consultation queue.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={() => {
              setToastMsg('Calendar synchronizing with hospital exchange...');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors shadow-sm font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">sync</span>
            <span>Sync Calendar</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-space-xs px-space-base py-space-xs rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all shadow-md font-headline-sm text-headline-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Book New Appointment</span>
          </button>
        </div>
      </div>

      {/* 6 Metric KPI Rail */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-space-md">
        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Today</span>
            <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{totalToday}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary">100%</span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Scheduled</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container">event_available</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{scheduledCount}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
              {totalToday ? Math.round((scheduledCount / totalToday) * 100) : 0}%
            </span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: `${totalToday ? (scheduledCount / totalToday) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">In Consultation</span>
            <span className="material-symbols-outlined text-[20px] text-tertiary-container">stethoscope</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{inConsultCount}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant animate-pulse">Active</span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full" style={{ width: `${totalToday ? (inConsultCount / totalToday) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Completed</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">task_alt</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{completedCount}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              {totalToday ? Math.round((completedCount / totalToday) * 100) : 0}%
            </span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: `${totalToday ? (completedCount / totalToday) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cancelled</span>
            <span className="material-symbols-outlined text-[20px] text-error">event_busy</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{cancelledCount}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container">
              {totalToday ? Math.round((cancelledCount / totalToday) * 100) : 0}%
            </span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-error h-full rounded-full" style={{ width: `${totalToday ? (cancelledCount / totalToday) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">No Show</span>
            <span className="material-symbols-outlined text-[20px] text-outline">person_off</span>
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg text-on-surface font-bold">{noShowCount}</span>
            <span className="font-caption text-caption font-semibold px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant">
              {totalToday ? Math.round((noShowCount / totalToday) * 100) : 0}%
            </span>
          </div>
          <div className="mt-space-xs w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-outline h-full rounded-full" style={{ width: `${totalToday ? (noShowCount / totalToday) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Mini Calendar & Slot Allocation */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Mini Calendar */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">edit_calendar</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Schedule Calendar</h2>
              </div>
              <div className="flex items-center p-0.5 bg-surface-container-low rounded-lg">
                <button className="px-space-xs py-0.5 rounded font-caption text-caption bg-surface-container-lowest text-primary font-semibold shadow-sm">
                  Day
                </button>
                <button className="px-space-xs py-0.5 rounded font-caption text-caption text-on-surface-variant">Week</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-caption text-caption">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <span key={day} className="text-outline py-1">{day}</span>
              ))}
              {[...Array(31)].map((_, i) => {
                const dayNum = i + 1;
                const isCurrent = selectedDate === dayNum;
                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDate(dayNum)}
                    className={`py-1.5 rounded-lg transition-colors text-xs ${
                      isCurrent
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            <div className="pt-space-xs flex flex-col gap-space-xs border-t border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
                  Slot Allocation Today
                </span>
                <span className="font-caption text-caption text-primary font-medium">84% Booked</span>
              </div>
              <div className="space-y-space-xs mt-space-2xs">
                <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">Cardiology Wing</span>
                  </div>
                  <span className="font-caption text-caption font-semibold text-primary-container">28 / 30 slots</span>
                </div>
                <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">Neurology Clinic</span>
                  </div>
                  <span className="font-caption text-caption font-semibold text-secondary">19 / 24 slots</span>
                </div>
                <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">Orthopedic Trauma</span>
                  </div>
                  <span className="font-caption text-caption font-semibold text-tertiary-container">34 / 35 slots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Clinicians On Duty */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Clinicians On Duty</h3>
              <span className="font-caption text-caption text-secondary font-semibold">{doctors.length} Registered</span>
            </div>
            <div className="flex flex-col gap-2">
              {doctors.slice(0, 4).map((doc) => (
                <div key={doc.id} className="flex items-center gap-space-sm p-space-xs rounded-lg bg-surface-container-low">
                  <img
                    src={doc.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100'}
                    alt={doc.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-label-md text-label-md font-semibold text-on-surface truncate">{doc.fullName}</span>
                    <span className="font-caption text-caption text-on-surface-variant truncate">{doc.specialty}</span>
                  </div>
                  <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-caption text-caption font-semibold">
                    {doc.status || 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Master Appointment Roster */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">Master Appointment Roster</span>
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-bold">
                  {filteredAppointments.length} Bookings
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm appearance-none pr-8 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-consultation">In Consultation</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                </div>
                <div className="relative">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm appearance-none pr-8 focus:outline-none"
                  >
                    <option value="all">All Departments</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-outline">Loading outpatient appointments...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
                No appointments matched the specified filter criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                      <th className="py-space-xs px-space-sm rounded-l-lg">ID & Patient</th>
                      <th className="py-space-xs px-space-sm">Physician & Room</th>
                      <th className="py-space-xs px-space-sm">Department</th>
                      <th className="py-space-xs px-space-sm">Date & Time</th>
                      <th className="py-space-xs px-space-sm">Type</th>
                      <th className="py-space-xs px-space-sm">Status</th>
                      <th className="py-space-xs px-space-sm rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="py-space-sm px-space-sm">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-space-xs">
                              <span className="font-tabular-metric text-tabular-metric font-bold text-primary">
                                {apt.appointmentNumber || `#APT-${apt.id}`}
                              </span>
                              <span className="px-1 rounded bg-surface-container text-on-surface-variant font-caption text-[10px]">
                                {apt.patientMrn || `PT-${apt.patientId}`}
                              </span>
                            </div>
                            <span className="font-label-md text-label-md font-semibold text-on-surface mt-0.5">
                              {apt.patientName}
                            </span>
                          </div>
                        </td>
                        <td className="py-space-sm px-space-sm">
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">
                              {apt.doctorName}
                            </span>
                            <span className="font-caption text-caption text-outline">
                              {apt.department} Wing
                            </span>
                          </div>
                        </td>
                        <td className="py-space-sm px-space-sm">
                          <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-caption text-caption font-semibold">
                            {apt.department}
                          </span>
                        </td>
                        <td className="py-space-sm px-space-sm">
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              {formatDate(apt.appointmentDateTime)}
                            </span>
                            <span className="font-caption text-caption text-secondary font-bold">
                              {formatTime(apt.appointmentDateTime)}
                            </span>
                          </div>
                        </td>
                        <td className="py-space-sm px-space-sm">
                          <span className="font-caption text-caption text-on-surface-variant font-medium">
                            {apt.appointmentType}
                          </span>
                        </td>
                        <td className="py-space-sm px-space-sm">
                          {getStatusBadge(apt.status)}
                        </td>
                        <td className="py-space-sm px-space-sm text-right">
                          <div className="flex items-center justify-end gap-1">
                            {apt.status === 'SCHEDULED' && (
                              <button
                                onClick={() => handleStatusUpdate(apt.id, 'IN_CONSULTATION')}
                                className="p-1 rounded bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors"
                                title="Start Consultation Visit"
                              >
                                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                              </button>
                            )}
                            {apt.status === 'IN_CONSULTATION' && (
                              <button
                                onClick={() => handleStatusUpdate(apt.id, 'COMPLETED')}
                                className="p-1 rounded bg-primary text-on-primary hover:bg-primary/90 transition-colors"
                                title="Mark Completed"
                              >
                                <span className="material-symbols-outlined text-[16px]">check</span>
                              </button>
                            )}
                            {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                              <button
                                onClick={() => handleStatusUpdate(apt.id, 'CANCELLED')}
                                className="p-1 rounded bg-surface-container-high text-error hover:bg-error-container transition-colors"
                                title="Cancel Appointment"
                              >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book New Appointment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book New Outpatient Consultation" maxWidth="max-w-xl">
        <form onSubmit={handleBookAppointment} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Select Patient *</label>
              <select
                required
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName} ({p.mrn})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Consulting Physician *</label>
              <select
                required
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.fullName} - {d.specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Clinical Department *</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Appointment Type *</label>
              <select
                value={formData.appointmentType}
                onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Procedure">Procedure</option>
                <option value="Telehealth">Telehealth</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.appointmentDateTime}
                onChange={(e) => setFormData({ ...formData, appointmentDateTime: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Duration (Minutes)</label>
              <input
                type="number"
                min="10"
                max="120"
                step="5"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Reason for Visit / Triage Notes</label>
            <textarea
              rows="3"
              placeholder="e.g., Routine cardiac follow-up, ECG review, shortness of breath on exertion..."
              value={formData.reasonNotes}
              onChange={(e) => setFormData({ ...formData, reasonNotes: e.target.value })}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
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
              {submitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
