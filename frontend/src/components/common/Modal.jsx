import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, subtitle, icon = 'info', children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full ${maxWidth} bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150`}>
        {/* Header */}
        <div className="p-space-lg border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50 shrink-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </span>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{title}</h2>
            </div>
            {subtitle && (
              <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-space-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
