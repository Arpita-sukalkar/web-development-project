import React from 'react';

export default function StatusBadge({ status, type = 'default' }) {
  const getBadgeConfig = () => {
    const s = status?.toLowerCase() || '';

    if (s.includes('inpatient') || s.includes('duty') || s.includes('admitted') || s.includes('completed') || s.includes('active') || s.includes('paid')) {
      return {
        bg: 'bg-primary-fixed',
        text: 'text-on-primary-fixed-variant',
        dot: 'bg-primary',
      };
    }
    if (s.includes('outpatient') || s.includes('consult') || s.includes('progress')) {
      return {
        bg: 'bg-secondary-container',
        text: 'text-on-secondary-container',
        dot: 'bg-secondary',
      };
    }
    if (s.includes('critical') || s.includes('immediate') || s.includes('surgery') || s.includes('stat') || s.includes('urgent') || s.includes('overdue')) {
      return {
        bg: 'bg-error-container',
        text: 'text-on-error-container',
        dot: 'bg-error animate-pulse',
      };
    }
    if (s.includes('observation') || s.includes('pending') || s.includes('partial')) {
      return {
        bg: 'bg-surface-container-highest',
        text: 'text-tertiary',
        dot: 'bg-tertiary',
      };
    }
    // Discharged / Leave / Default
    return {
      bg: 'bg-surface-container',
      text: 'text-on-surface-variant',
      dot: 'bg-outline',
    };
  };

  const config = getBadgeConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-caption text-caption font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <span className="capitalize">{status}</span>
    </span>
  );
}
