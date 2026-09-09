export function formatCurrency(amount) {
  if (amount == null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(dateTimeString) {
  if (!dateTimeString) return '—';
  const d = new Date(dateTimeString);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '—';
  const d = new Date(dateTimeString);
  return `${formatDate(dateTimeString)} • ${formatTime(dateTimeString)}`;
}

export function formatAcuityBadge(acuity) {
  switch (acuity?.toUpperCase()) {
    case 'IMMEDIATE':
      return { label: 'Immediate', bg: 'bg-error', text: 'text-on-error', border: 'border-error', pulse: true };
    case 'URGENT':
      return { label: 'Urgent', bg: 'bg-surface-container-highest', text: 'text-primary', border: 'border-primary-fixed', pulse: false };
    case 'OBSERVATION':
      return { label: 'Observation', bg: 'bg-secondary-container', text: 'text-on-secondary-container', border: 'border-secondary-fixed', pulse: false };
    default:
      return { label: 'Standard', bg: 'bg-surface-container', text: 'text-on-surface-variant', border: 'border-outline-variant', pulse: false };
  }
}
