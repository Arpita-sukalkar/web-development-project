import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import { formatDate } from '../../utils/formatters';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getAll(false);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setToastMsg('Notification acknowledged.');
      setTimeout(() => setToastMsg(null), 2500);
    } catch (err) {
      console.error('Failed to mark read', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setToastMsg('All notifications marked as read.');
      setTimeout(() => setToastMsg(null), 2500);
    } catch (err) {
      console.error('Failed to mark all read', err);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'CRITICAL') return n.priority === 'CRITICAL' || n.priority === 'EMERGENCY';
    return n.category?.toUpperCase() === filterCategory.toUpperCase();
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'CRITICAL':
      case 'EMERGENCY':
        return {
          badge: 'bg-error text-on-error font-bold animate-pulse',
          iconBg: 'bg-error-container text-on-error-container',
          icon: 'emergency',
          ping: true,
        };
      case 'URGENT':
        return {
          badge: 'bg-error-container text-on-error-container font-bold',
          iconBg: 'bg-error-container/60 text-error',
          icon: 'notification_important',
          ping: false,
        };
      case 'WARNING':
        return {
          badge: 'bg-secondary-container text-on-secondary-container font-semibold',
          iconBg: 'bg-secondary-container text-secondary',
          icon: 'warning',
          ping: false,
        };
      default:
        return {
          badge: 'bg-surface-container text-primary font-semibold',
          iconBg: 'bg-surface-container-highest text-primary',
          icon: 'notifications',
          ping: false,
        };
    }
  };

  const criticalCount = notifications.filter((n) => n.priority === 'CRITICAL' || n.priority === 'EMERGENCY').length;

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
          <div className="flex items-center gap-space-sm">
            <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-bold tracking-wide uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              Live Feed Active
            </span>
            <span className="font-caption text-caption text-outline">Telemetry Cluster: 12ms sync</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Clinical Alerts, Notifications & System Feed
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real-time telemetry, lab alerts, critical triage notifications, and clinical administration messages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">done_all</span>
            <span>Mark All as Read</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Resolved alarms cleared from immediate workspace.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">sweep</span>
            <span>Clear Resolved</span>
          </button>
        </div>
      </div>

      {/* Category Metric Rails */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-base">
        <button
          onClick={() => setFilterCategory('ALL')}
          className={`flex flex-col items-start p-space-base bg-surface-container-lowest rounded-xl shadow-sm text-left transition-all hover:bg-surface-container-low border-2 ${
            filterCategory === 'ALL' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Total Alerts</span>
          <div className="flex items-baseline justify-between w-full mt-space-xs">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">{notifications.length}</span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-semibold">
              Active
            </span>
          </div>
          <div className="w-full h-1 bg-primary rounded-full mt-space-sm"></div>
        </button>

        <button
          onClick={() => setFilterCategory('CRITICAL')}
          className={`flex flex-col items-start p-space-base bg-surface-container-lowest rounded-xl shadow-sm text-left transition-all hover:bg-surface-container-low border-2 ${
            filterCategory === 'CRITICAL' ? 'border-error' : 'border-transparent'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            <span className="font-caption text-caption uppercase tracking-wider text-error font-bold">Critical Trauma</span>
          </div>
          <div className="flex items-baseline justify-between w-full mt-space-xs">
            <span className="font-display-sm text-display-sm text-error font-bold">{criticalCount}</span>
            <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-semibold">
              Immediate
            </span>
          </div>
          <div className="w-full h-1 bg-error rounded-full mt-space-sm"></div>
        </button>

        <button
          onClick={() => setFilterCategory('LABORATORY')}
          className={`flex flex-col items-start p-space-base bg-surface-container-lowest rounded-xl shadow-sm text-left transition-all hover:bg-surface-container-low border-2 ${
            filterCategory === 'LABORATORY' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Clinical Lab</span>
          <div className="flex items-baseline justify-between w-full mt-space-xs">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">
              {notifications.filter((n) => n.category === 'LABORATORY').length}
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-semibold">
              Panic Values
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container-high rounded-full mt-space-sm"></div>
        </button>

        <button
          onClick={() => setFilterCategory('PHARMACY')}
          className={`flex flex-col items-start p-space-base bg-surface-container-lowest rounded-xl shadow-sm text-left transition-all hover:bg-surface-container-low border-2 ${
            filterCategory === 'PHARMACY' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Pharmacy</span>
          <div className="flex items-baseline justify-between w-full mt-space-xs">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">
              {notifications.filter((n) => n.category === 'PHARMACY').length}
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-semibold">
              Stock Warnings
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container-high rounded-full mt-space-sm"></div>
        </button>

        <button
          onClick={() => setFilterCategory('SYSTEM')}
          className={`flex flex-col items-start p-space-base bg-surface-container-lowest rounded-xl shadow-sm text-left transition-all hover:bg-surface-container-low border-2 ${
            filterCategory === 'SYSTEM' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">Security & System</span>
          <div className="flex items-baseline justify-between w-full mt-space-xs">
            <span className="font-display-sm text-display-sm text-on-surface font-bold">
              {notifications.filter((n) => n.category === 'SYSTEM').length}
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-outline font-caption text-caption font-semibold">
              Audit
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container-high rounded-full mt-space-sm"></div>
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Feed (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Prioritized Feed</span>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-caption text-caption font-semibold">
              Showing {filteredNotifications.length} alerts
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-outline">Listening to hospital event bus...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-outline bg-surface-container-lowest rounded-xl shadow-sm">
              No active alerts matching this filter.
            </div>
          ) : (
            <div className="flex flex-col gap-space-sm">
              {filteredNotifications.map((notif) => {
                const style = getPriorityStyle(notif.priority);
                return (
                  <div
                    key={notif.id}
                    className={`p-space-base rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-base transition-all hover:shadow-md border-l-4 ${
                      notif.isRead ? 'border-surface-container opacity-70' : notif.priority === 'CRITICAL' ? 'border-error' : 'border-primary'
                    }`}
                  >
                    <div className="flex items-start gap-space-md min-w-0">
                      <div className="flex items-center gap-space-xs shrink-0 mt-1">
                        {style.ping && <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>}
                        <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-[24px]">{style.icon}</span>
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-center gap-space-xs mb-1">
                          <span className={`px-space-xs py-0.5 rounded-full font-caption text-caption ${style.badge}`}>
                            {notif.priority || 'INFO'}
                          </span>
                          <span className="font-caption text-caption text-outline">{notif.category}</span>
                          <span className="font-caption text-caption text-outline">•</span>
                          <span className="font-caption text-caption text-outline">
                            {formatDate(notif.createdAt)}
                          </span>
                        </div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                          {notif.title}
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          {notif.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-xs shrink-0 self-end md:self-center">
                      {!notif.isRead && (
                        <button
                          onClick={() => handleMarkRead(notif.id)}
                          className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>Acknowledge</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Telemetry Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md sticky top-20">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Emergency Fast-Dial</h3>
            <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-caption font-bold">
              Level 1 Trauma
            </span>
          </div>

          <div className="space-y-2">
            {[
              { name: 'Code Blue Resuscitation Team', ext: 'Ext. 2222', icon: 'emergency' },
              { name: 'Trauma OR Suite Director', ext: 'Ext. 9110', icon: 'e911_emergency' },
              { name: 'Blood Bank Stat Delivery', ext: 'Ext. 4012', icon: 'bloodtype' },
              { name: 'Hospital Security Dispatch', ext: 'Ext. 8888', icon: 'shield' },
            ].map((contact) => (
              <div
                key={contact.name}
                className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer"
                onClick={() => {
                  setToastMsg(`Dialing ${contact.name} at ${contact.ext}...`);
                  setTimeout(() => setToastMsg(null), 3000);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">{contact.icon}</span>
                  <span className="text-xs font-semibold text-on-surface">{contact.name}</span>
                </div>
                <span className="font-mono text-xs font-bold text-primary">{contact.ext}</span>
              </div>
            ))}
          </div>

          <div className="pt-space-xs border-t border-surface-container">
            <span className="font-caption text-caption text-outline uppercase font-semibold block mb-2">
              System Telemetry Status
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
              <div className="flex items-center justify-between">
                <span>HL7 / FHIR Interface:</span>
                <span className="text-secondary font-semibold">Connected (100%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MSSQL Primary Cluster:</span>
                <span className="text-secondary font-semibold">Online (Active-Active)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Core Analyzer Middleware:</span>
                <span className="text-secondary font-semibold">Nominal (0 errors)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
