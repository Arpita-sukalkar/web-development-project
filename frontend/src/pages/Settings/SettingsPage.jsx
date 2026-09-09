import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tab-hospital');
  const [toastMsg, setToastMsg] = useState(null);

  // Form State
  const [settings, setSettings] = useState({
    hospitalName: 'St. Jude General Medical Center & Trauma Hub',
    campusAddress: '742 Evergreen Medical Parkway, Suite 100, Metropolis, NY 10021',
    phone: '+1 (555) 392-4100',
    dispatchLine: 'ext. 4400 (Priority 1 Direct)',
    accreditationId: '#NY-99401-TC',
    totalBeds: 420,
    twoFactorEnabled: true,
    autoLockMinutes: 15,
    hl7SyncInterval: 30,
    emergencyBroadcasts: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setToastMsg('Institutional configuration synchronized across all active hospital nodes and HL7 gateways.');
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-caption text-caption font-semibold uppercase tracking-wider">
              Administration Console
            </span>
            <span className="text-outline font-caption text-caption">•</span>
            <span className="font-caption text-caption text-on-surface-variant">CarePulse v4.18.2-enterprise</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Hospital Enterprise Settings & Configuration
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Manage institutional profile, clinical security, notifications, and system parameters across the medical network.
          </p>
        </div>

        <div className="flex items-center gap-space-sm self-start lg:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              setToastMsg('Settings reset to active server defaults.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="px-space-base py-space-xs rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all duration-200 font-label-md text-label-md font-medium flex items-center gap-space-xs shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">history</span>
            <span>Discard</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-space-lg py-space-xs rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all duration-200 font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-xs shadow-sm overflow-x-auto flex items-center gap-space-xs">
        {[
          { id: 'tab-hospital', label: 'Hospital Profile', icon: 'local_hospital' },
          { id: 'tab-user', label: 'User Profile', icon: 'person' },
          { id: 'tab-security', label: 'Security & Auth', icon: 'shield' },
          { id: 'tab-notifications', label: 'Notification Rules', icon: 'notifications_active' },
          { id: 'tab-system', label: 'System & HL7', icon: 'public' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-space-xs px-space-base py-space-xs rounded-lg font-label-md text-label-md transition-colors shrink-0 ${
              activeTab === tab.id
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'tab-hospital' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Brand Identity</span>
                <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-caption font-semibold">
                  Active Node
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container-low gap-space-md text-center">
                <div className="w-24 h-24 rounded-xl bg-surface-container-lowest p-space-sm flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[48px] text-primary">local_hospital</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">St. Jude Medical</span>
                  <span className="block font-caption text-caption text-on-surface-variant">Level 1 Trauma Facility</span>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-2xs text-xs">
                <div className="flex items-center gap-space-xs text-primary font-bold">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>JCAHO Accredited</span>
                </div>
                <p className="text-on-surface-variant">
                  National Hospital Registry identifier: <strong className="text-on-surface font-mono">{settings.accreditationId}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Institutional Master Records</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Primary legal directory information broadcasted on patient discharges and pharmacy prescriptions.
              </p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-semibold text-outline uppercase">Hospital Name</label>
                <input
                  type="text"
                  value={settings.hospitalName}
                  onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })}
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-semibold text-outline uppercase">Physical Campus Address</label>
                <input
                  type="text"
                  value={settings.campusAddress}
                  onChange={(e) => setSettings({ ...settings, campusAddress: e.target.value })}
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-outline uppercase">Official Contact Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-outline uppercase">Emergency Dispatch Line</label>
                <input
                  type="text"
                  value={settings.dispatchLine}
                  onChange={(e) => setSettings({ ...settings, dispatchLine: e.target.value })}
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'tab-user' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-md max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Active Authenticated Physician</h2>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
            <img
              src="https://images.unsplash.com/photo-1594824813565-d729a967520e?w=200"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover shadow"
            />
            <div>
              <h3 className="font-headline-md font-bold text-on-surface">{user?.fullName || 'Dr. Elizabeth Chen, MD'}</h3>
              <div className="text-sm text-primary font-medium">{user?.role || 'ROLE_DOCTOR'}</div>
              <div className="text-xs text-outline font-mono mt-0.5">{user?.email || 'dr.chen@carepulse-hms.org'}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tab-security' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-md max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">HIPAA & Security Parameters</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
              <div>
                <div className="font-semibold text-sm text-on-surface">Enforce 2-Factor Biometric Auth</div>
                <div className="text-xs text-outline">Mandatory for all level 1 trauma physicians</div>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorEnabled}
                onChange={(e) => setSettings({ ...settings, twoFactorEnabled: e.target.checked })}
                className="w-5 h-5 rounded text-primary"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
              <div>
                <div className="font-semibold text-sm text-on-surface">Auto-Lock Workstation Inactivity</div>
                <div className="text-xs text-outline">Locks unattended console terminals</div>
              </div>
              <select
                value={settings.autoLockMinutes}
                onChange={(e) => setSettings({ ...settings, autoLockMinutes: Number(e.target.value) })}
                className="px-3 py-1 bg-surface-container rounded-lg text-sm"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'tab-notifications' || activeTab === 'tab-system') && (
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-md max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Telemetry & Notification Rules</h2>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
            <div>
              <div className="font-semibold text-sm text-on-surface">Priority 1 Trauma Emergency Broadcasts</div>
              <div className="text-xs text-outline">Dispatch auditory klaxons and pager alerts</div>
            </div>
            <input
              type="checkbox"
              checked={settings.emergencyBroadcasts}
              onChange={(e) => setSettings({ ...settings, emergencyBroadcasts: e.target.checked })}
              className="w-5 h-5 rounded text-error"
            />
          </div>
        </div>
      )}
    </div>
  );
}
