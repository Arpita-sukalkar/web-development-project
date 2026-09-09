import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/staffService';
import Modal from '../../components/common/Modal';

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Add Staff Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    roleTitle: 'Registered Nurse (RN)',
    department: 'Intensive Care Unit (ICU)',
    shiftSchedule: 'Morning (07:00 - 15:30)',
    contactNumber: '+1 (555) 302-8819',
    email: '',
    status: 'ACTIVE',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await staffService.getAll();
      setStaffList(data);
    } catch (err) {
      console.error('Failed to load staff directory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await staffService.create({
        ...formData,
        avatarUrl: 'https://images.unsplash.com/photo-1594824813565-d729a967520e?w=200',
      });
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        roleTitle: 'Registered Nurse (RN)',
        department: 'Intensive Care Unit (ICU)',
        shiftSchedule: 'Morning (07:00 - 15:30)',
        contactNumber: '+1 (555) 302-8819',
        email: '',
        status: 'ACTIVE',
      });
      fetchStaff();
      setToastMsg('Staff member credentialed and added to active rota.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to add staff member:', err);
      alert('Error creating staff: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.roleTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'ALL' ||
      staff.roleTitle?.toLowerCase().includes(roleFilter.toLowerCase());

    const matchesDept =
      deptFilter === 'ALL' ||
      staff.department?.toLowerCase() === deptFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-caption text-caption font-bold tracking-wider uppercase">
              Human Capital Operations
            </span>
            <span className="text-outline font-caption text-caption">•</span>
            <span className="font-caption text-caption text-secondary font-semibold">Active Shift: Rota AM-02</span>
          </div>
          <h1 className="font-display-sm text-display-sm text-on-surface font-bold tracking-tight">
            Hospital Staff Directory & Clinical Operations Personnel
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Managing clinical and non-clinical personnel across all wings, critical care suites, and auxiliary facilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs w-full xl:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add New Staff Member</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Shift roster synced across hospital telemetry pagers.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
            <span>Shift Rota Roster</span>
          </button>
        </div>
      </div>

      {/* 6 Metric KPI Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">Active Today</span>
            <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">{staffList.length}</span>
            <span className="font-caption text-caption text-secondary font-medium">Full quota</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">RNs On-Duty</span>
            <span className="material-symbols-outlined text-[18px] text-primary">local_hospital</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">58</span>
            <span className="font-caption text-caption text-primary font-medium">1:4 Ratio</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">ICU Staffing</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">monitor_heart</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">22</span>
            <span className="font-caption text-caption text-secondary font-medium">Optimal</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">Overtime Hours</span>
            <span className="material-symbols-outlined text-[18px] text-outline">timelapse</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">18.5h</span>
            <span className="font-caption text-caption text-outline font-medium">-4.2% wk</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-outline h-full rounded-full" style={{ width: '32%' }}></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">Renewals</span>
            <span className="material-symbols-outlined text-[18px] text-error">notification_important</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-error font-bold">4</span>
            <span className="font-caption text-caption text-error font-medium">&lt; 30 days</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-error h-full rounded-full" style={{ width: '14%' }}></div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline">
            <span className="font-caption text-caption uppercase font-semibold">Staff Pagers</span>
            <span className="material-symbols-outlined text-[18px] text-primary">cell_tower</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">198</span>
            <span className="font-caption text-caption text-secondary font-medium">99.1% sync</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '99%' }}></div>
          </div>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
        {[
          { label: 'All Staff', val: 'ALL' },
          { label: 'Nurses & Charge Nurses', val: 'Nurse' },
          { label: 'Ward Clerks & Receptionists', val: 'Clerk' },
          { label: 'Pharmacists & Dispensers', val: 'Pharmacist' },
          { label: 'Laboratory Technicians', val: 'Technician' },
          { label: 'Administrative & Billing', val: 'Admin' },
        ].map((tab) => (
          <button
            key={tab.val}
            onClick={() => setRoleFilter(tab.val)}
            className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-space-xs transition-colors whitespace-nowrap ${
              roleFilter === tab.val
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Dept Controls */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
        <div className="flex-1 flex flex-wrap items-center gap-space-sm">
          <div className="relative flex-1 min-w-[240px]">
            <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Employee ID, Name, Department, Role..."
              className="w-full pl-9 pr-space-md py-space-xs rounded-lg bg-surface text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-surface-container"
            />
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="font-caption text-caption text-outline uppercase font-semibold">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-surface text-on-surface font-body-sm text-body-sm rounded-lg px-space-sm py-space-xs focus:outline-none border border-surface-container"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Intensive Care Unit (ICU)">ICU / CCU</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Pathology">Pathology & Lab</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm flex flex-col gap-space-md">
        {loading ? (
          <div className="p-8 text-center text-outline">Loading personnel roster...</div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
            No staff records matched the search filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                  <th className="py-space-xs px-space-sm rounded-l-lg">Staff Member & ID</th>
                  <th className="py-space-xs px-space-sm">Role Title</th>
                  <th className="py-space-xs px-space-sm">Department</th>
                  <th className="py-space-xs px-space-sm">Shift Schedule</th>
                  <th className="py-space-xs px-space-sm">Contact Details</th>
                  <th className="py-space-xs px-space-sm rounded-r-lg text-right">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-space-sm px-space-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={staff.avatarUrl || 'https://images.unsplash.com/photo-1594824813565-d729a967520e?w=100'}
                          alt={staff.fullName}
                          className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            {staff.fullName}
                          </span>
                          <span className="font-mono text-xs text-primary font-bold">
                            {staff.employeeId || `#EMP-${staff.id}`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm font-medium text-on-surface">
                      {staff.roleTitle}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-caption font-semibold">
                        {staff.department}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-sm text-on-surface-variant font-caption">
                      {staff.shiftSchedule}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="flex flex-col font-caption">
                        <span className="text-on-surface font-medium">{staff.contactNumber}</span>
                        <span className="text-outline">{staff.email}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm text-right">
                      <span className="px-2 py-0.5 rounded-full font-caption text-caption font-bold bg-secondary-container text-on-secondary-container">
                        {staff.status || 'Active On-Duty'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Hospital Staff Member" maxWidth="max-w-xl">
        <form onSubmit={handleAddStaff} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="Nurse Jessica Hayes, BSN"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Role Title *</label>
              <input
                type="text"
                required
                placeholder="Senior Charge Nurse"
                value={formData.roleTitle}
                onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Assigned Department *</label>
              <input
                type="text"
                required
                placeholder="Intensive Care Unit (ICU)"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Shift Schedule *</label>
              <select
                value={formData.shiftSchedule}
                onChange={(e) => setFormData({ ...formData, shiftSchedule: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Morning (07:00 - 15:30)">Morning (07:00 - 15:30)</option>
                <option value="Evening (15:00 - 23:30)">Evening (15:00 - 23:30)</option>
                <option value="Night (23:00 - 07:30)">Night (23:00 - 07:30)</option>
                <option value="Rotation 12h (07:00 - 19:00)">Rotation 12h (07:00 - 19:00)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Contact Phone *</label>
              <input
                type="text"
                required
                placeholder="+1 (555) 302-8819"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Institutional Email *</label>
              <input
                type="email"
                required
                placeholder="j.hayes@carepulse-hms.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              {submitting ? 'Adding...' : 'Register Staff Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
