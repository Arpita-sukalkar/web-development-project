import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAVIGATION_GROUPS } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { admissionService } from '../../services/admissionService';
import { notificationService } from '../../services/notificationService';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [badgeCounts, setBadgeCounts] = useState({
    patients: '1,420',
    doctors: '84',
    appointments: '38 today',
    admissions: '92% occ',
    laboratory: '14 urgent',
    pharmacy: '3 low',
    billing: '5 pending',
    notifications: '7',
  });

  useEffect(() => {
    // Fetch live badge statistics if available
    const loadBadges = async () => {
      try {
        const [patientStats, doctorStats, unreadNotifs] = await Promise.allSettled([
          patientService.getStats(),
          doctorService.getStats(),
          notificationService.getUnreadCount(),
        ]);

        setBadgeCounts((prev) => ({
          ...prev,
          patients: patientStats.status === 'fulfilled' && patientStats.value.total ? `${patientStats.value.total}` : prev.patients,
          doctors: doctorStats.status === 'fulfilled' && doctorStats.value.total ? `${doctorStats.value.total}` : prev.doctors,
          notifications: unreadNotifs.status === 'fulfilled' && unreadNotifs.value.count != null ? `${unreadNotifs.value.count}` : prev.notifications,
        }));
      } catch {
        // Fallback to static mock numbers from Stitch
      }
    };

    loadBadges();
  }, []);

  const getBadgeStyle = (key) => {
    switch (key) {
      case 'appointments':
        return 'bg-secondary-container text-on-secondary-container';
      case 'admissions':
        return 'bg-surface-container-high text-tertiary';
      case 'laboratory':
      case 'pharmacy':
        return 'bg-error-container text-on-error-container';
      case 'notifications':
        return 'bg-error text-on-error';
      default:
        return 'bg-surface-container-highest text-primary';
    }
  };

  const handleNavClick = (e, item) => {
    // NavLink routes to page
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar-width bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Brand & Facility Banner */}
      <div className="p-space-base flex flex-col gap-space-sm bg-surface-container-low">
        <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => navigate('/dashboard')}>
          <img
            alt="CarePulse HMS Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WBS8bPcyU0DEO3GvuabCCGWKib9P2c8wJZWZ7yowQTZgPtws9Xyqo57hIrUa6oX-eA5elfmKchTjFbM9z0dTeMn34dQ5YAwmTrQo0l42kaXzpnMiXUOk_EDrG8by4BgheWqo-gWQBzyvFN41jq0WskTot9y5pM3kGSV-5WrUivqSFCMfuoISzf36pviIS3rnLgQP-r-fZmnh6srj86GWXBJ6kEaHGVcgGH_K7Ld37XwzSnkwTugwFsdoc"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">CarePulse</span>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">Enterprise HMS</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container text-primary font-caption text-caption">
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
          <span className="truncate font-medium">St. Jude Medical • L1 Trauma</span>
        </div>
      </div>

      {/* Navigation Grouping */}
      <nav className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.title} className="space-y-space-2xs">
            <span className="px-space-sm font-caption text-caption uppercase text-outline font-semibold tracking-wider block mb-space-2xs">
              {group.title}
            </span>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-colors ${
                    isActive && item.path !== '/logout'
                      ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                      : item.isDestructive
                      ? 'text-on-surface-variant hover:bg-error-container hover:text-on-error-container'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`
                }
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-body-sm text-body-sm font-medium">{item.label}</span>
                </div>
                {item.badgeKey && badgeCounts[item.badgeKey] && (
                  <span className={`px-space-xs py-0.5 rounded-full font-caption text-caption font-semibold ${getBadgeStyle(item.badgeKey)}`}>
                    {badgeCounts[item.badgeKey]}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Doctor Identity Footer */}
      <div className="p-space-sm bg-surface-container-lowest">
        <div className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg bg-surface-container-low">
          <div className="relative shrink-0">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={user?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ"}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
              {user?.fullName || "Dr. Elizabeth Chen"}
            </span>
            <span className="font-caption text-caption text-on-surface-variant truncate">
              {user?.title || "Chief Medical Dir."}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
