import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LogoutPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleConfirmLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full p-space-md">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-surface-container">
        {/* Visual Gradient Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-primary-container to-error"></div>

        <div className="p-space-xl flex flex-col items-center text-center">
          {/* Security Badge & Ambient Glow */}
          <div className="relative mb-space-lg">
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md"></div>
            <div className="relative w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[32px]">shield_lock</span>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
              <span className="material-symbols-outlined text-[14px]">sync</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-caption text-caption uppercase tracking-wider mb-space-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
            HIPAA Security Guard • Auth Protocol
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-space-xs">
            Confirm Clinical Session Termination
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-base">
            Are you sure you want to logout of{' '}
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              CarePulse Hospital Management System
            </span>
            ?
          </p>

          {/* Physician Notice Box */}
          <div className="w-full text-left bg-surface-container-low rounded-lg p-space-md mb-space-base flex gap-space-md items-start">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified_user</span>
            <div className="flex flex-col gap-space-2xs min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  {user?.fullName || 'Dr. Elizabeth Chen, MD'}
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption">
                  {user?.role || 'Chief Medical Director'}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                All pending patient vitals, active prescriptions, and unsaved clinical chart notes will be automatically synchronized with the central EHR database.
              </p>
            </div>
          </div>

          {/* Active Clinical Station Info */}
          <div className="w-full bg-surface-container-low rounded-lg p-space-md mb-space-lg text-left shadow-sm">
            <div className="flex items-center justify-between pb-space-xs mb-space-xs border-b border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Active Clinical Station Info
              </span>
              <span className="font-caption text-caption text-secondary flex items-center gap-space-2xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Telemetry Online
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-sm text-xs">
              <div>
                <span className="text-outline block">Workstation ID</span>
                <span className="font-mono font-bold text-on-surface">WS-ICU-CONSOLE-04</span>
                <span className="text-outline text-[10px] block">IP: 10.24.112.85</span>
              </div>
              <div>
                <span className="text-outline block">Active Shift</span>
                <span className="font-semibold text-on-surface">Morning Rotation</span>
                <span className="text-outline text-[10px] block">08:00 – 16:00</span>
              </div>
              <div>
                <span className="text-outline block">Pending Charts</span>
                <div className="flex items-center gap-1 text-secondary font-semibold">
                  <span>0 Unverified</span>
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                </div>
              </div>
              <div>
                <span className="text-outline block">EHR Ledger Sync</span>
                <span className="text-primary font-semibold">100% Synced</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-space-sm">
            <button
              onClick={handleConfirmLogout}
              disabled={loggingOut}
              className="w-full py-2.5 px-space-base bg-error text-on-error rounded-lg font-headline-sm text-headline-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-space-xs shadow-md font-semibold disabled:opacity-50"
            >
              {loggingOut ? (
                <span>Securing Workstation & Logging Out...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Logout & Terminate Session</span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              disabled={loggingOut}
              className="w-full py-2.5 px-space-base bg-surface-container text-on-surface rounded-lg font-headline-sm text-headline-sm hover:bg-surface-container-high active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-space-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Cancel & Return to Dashboard</span>
            </button>
          </div>

          <div className="mt-space-lg pt-space-base flex items-center justify-center gap-space-xs text-on-surface-variant font-caption text-caption">
            <span className="material-symbols-outlined text-secondary text-[16px]">notifications_active</span>
            <span>Clicking Logout will securely end your session and return to the Staff Login Portal.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
