import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    notificationService.getUnreadCount()
      .then((res) => setUnreadCount(res.count))
      .catch(() => {});
  }, []);

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-sidebar-width right-0 h-header-height z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-gutter-desktop flex items-center justify-between">
      {/* Left Area: Hospital Ward Switcher, Breadcrumbs, Universal Search */}
      <div className="flex items-center gap-space-base">
        <button className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px] text-primary">domain</span>
          <span className="font-medium">Main Hospital - All Wings</span>
          <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
        </button>

        <div className="hidden xl:flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>Hospital</span>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/admissions')}>Inpatient Ward</span>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-medium">{getPageTitle()}</span>
        </div>

        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-space-sm text-outline text-[18px]">search</span>
          <input
            className="w-72 pl-9 pr-14 py-space-xs h-9 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            placeholder="Fast search patient, MRN, doctor..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
          <span className="absolute right-space-sm px-1.5 py-0.5 bg-surface-container text-on-surface-variant rounded font-caption text-caption font-medium">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls: Trauma Alert, Shift Rota, Notifications, User */}
      <div className="flex items-center gap-space-md">
        <div
          onClick={() => navigate('/notifications')}
          className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-error-container text-on-error-container font-caption text-caption font-semibold animate-pulse cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-error"></span>
          <span>TRAUMA ALERT (ICU-3)</span>
        </div>

        <div className="hidden lg:flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-caption text-caption">
          <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
          <span>Shift: Morning 08:00 - 16:00</span>
        </div>

        <button className="flex items-center gap-space-2xs text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[18px]">translate</span>
          <span>EN</span>
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="relative p-space-xs rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-caption text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-space-sm pl-space-xs cursor-pointer" onClick={() => navigate('/settings')}>
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src={user?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ"}
          />
          <div className="hidden md:flex flex-col text-left">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                {user?.fullName || "Dr. Elizabeth Chen, MD"}
              </span>
              <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-caption text-[10px] font-bold">
                {user?.role === 'ADMIN' ? 'ADMIN' : 'CHIEF'}
              </span>
            </div>
            <span className="font-caption text-caption text-outline">
              {user?.title || "Chief Medical Director"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
