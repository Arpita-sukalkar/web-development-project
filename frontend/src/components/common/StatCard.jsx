import React from 'react';

export default function StatCard({ label, value, subValue, delta, deltaLabel, icon, color = 'primary' }) {
  const getColorClasses = () => {
    switch (color) {
      case 'secondary':
        return 'text-secondary group-hover:bg-secondary-fixed';
      case 'tertiary':
        return 'text-tertiary group-hover:bg-tertiary-fixed';
      case 'error':
        return 'text-error group-hover:bg-error-container';
      default:
        return 'text-primary group-hover:bg-primary-fixed';
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{label}</span>
        <div className={`w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center transition-colors ${getColorClasses()}`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-space-2xs">
          <span className={`font-display-sm text-display-sm tabular-nums font-bold ${color === 'error' ? 'text-error' : 'text-on-surface'}`}>
            {value}
          </span>
          {subValue && (
            <span className="font-caption text-caption text-on-surface-variant">{subValue}</span>
          )}
        </div>
        {(delta || deltaLabel) && (
          <div className="flex items-center gap-space-2xs mt-space-2xs">
            {delta && (
              <span className={`font-caption text-caption font-semibold ${delta.startsWith('+') ? 'text-secondary' : 'text-error'}`}>
                {delta}
              </span>
            )}
            {deltaLabel && (
              <span className="font-caption text-caption text-outline">{deltaLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
