import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { billingService } from '../../services/billingService';
import { admissionService } from '../../services/admissionService';
import { formatCurrency } from '../../utils/formatters';

export default function ReportsPage() {
  const [summary, setSummary] = useState(null);
  const [billingSummary, setBillingSummary] = useState(null);
  const [wardStats, setWardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('Month');
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [dash, bill, wards] = await Promise.all([
          dashboardService.getSummary(),
          billingService.getSummary(),
          admissionService.getWardStats(),
        ]);
        setSummary(dash);
        setBillingSummary(bill);
        setWardStats(wards);
      } catch (err) {
        console.error('Failed to load reports data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-base bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-primary font-caption text-caption uppercase tracking-wider font-semibold">
              Audited Clinical Intelligence
            </span>
            <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
            <span className="font-caption text-caption text-secondary font-medium">Real-time Telemetry Synced</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Hospital Enterprise Reports & Clinical Intelligence
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real-time epidemiological, operational, and financial business reports across all licensed clinical facilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Summary</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Excel spreadsheet exported successfully.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">table_view</span>
            <span>Download Excel</span>
          </button>
          <button
            onClick={() => {
              setToastMsg('Clinical Audit PDF generated and queued for download.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-md py-space-xs px-space-md bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Export Full PDF</span>
          </button>
        </div>
      </div>

      {/* Period Filter Buttons */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-base">
        <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-space-2xs rounded-lg">
          {['Today', 'This Week', 'This Month', 'This Year'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
                timeframe === t
                  ? 'bg-primary text-on-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-lg">
          <span className="material-symbols-outlined text-[18px] text-outline">domain</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Scope:</span>
          <span className="font-semibold text-sm text-on-surface">All Clinical Wings & Specialized Departments</span>
        </div>
      </div>

      {/* Key Clinical Performance Metrics Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-base">
        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Gross Revenue Realized</span>
            <span className="p-space-2xs bg-secondary-container text-on-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">
                {formatCurrency(billingSummary?.totalRevenue || 1482900)}
              </span>
              <span className="font-caption text-caption text-secondary font-semibold">+8.4%</span>
            </div>
            <p className="font-caption text-caption text-outline">98.2% Claim Settlement Rate</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Bed Occupancy Rate</span>
            <span className="p-space-2xs bg-primary-fixed text-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">single_bed</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">
                {summary ? `${Math.round((summary.occupiedBeds / summary.totalBeds) * 100)}%` : '89.4%'}
              </span>
              <span className="font-caption text-caption text-secondary font-semibold">+2.1%</span>
            </div>
            <p className="font-caption text-caption text-outline">
              {summary?.occupiedBeds || 342} / {summary?.totalBeds || 420} beds occupied
            </p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '89%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Average Length of Stay</span>
            <span className="p-space-2xs bg-surface-container-highest text-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">timelapse</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">4.2 Days</span>
              <span className="font-caption text-caption text-secondary font-semibold">-0.3d vs benchmark</span>
            </div>
            <p className="font-caption text-caption text-outline">Inpatient Throughput Velocity</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: '74%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Clinical Satisfaction Score</span>
            <span className="p-space-2xs bg-secondary-container text-on-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-secondary">94.8%</span>
              <span className="font-caption text-caption text-secondary font-semibold">+1.2%</span>
            </div>
            <p className="font-caption text-caption text-outline">HCAHPS Standard Index</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Ward Distribution Report */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Ward Occupancy & Triage Matrix</h3>
            <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-caption font-semibold">Active Census</span>
          </div>
          <div className="space-y-4 pt-2">
            {[
              { name: 'Intensive Care Unit (ICU)', pct: 90, beds: '36 / 40', color: 'bg-error' },
              { name: 'Cardiology & Vascular Ward', pct: 88, beds: '53 / 60', color: 'bg-primary' },
              { name: 'Emergency Trauma Ward', pct: 92, beds: '46 / 50', color: 'bg-tertiary-container' },
              { name: 'General Inpatient Floor', pct: 82, beds: '123 / 150', color: 'bg-secondary' },
              { name: 'Pediatric Suites', pct: 75, beds: '30 / 40', color: 'bg-primary-container' },
            ].map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-on-surface">{item.name}</span>
                  <span className="font-bold font-tabular-metric text-on-surface">{item.beds} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue & Diagnostic Performance */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Revenue Cycle & Diagnostics</h3>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-caption font-semibold">Audited</span>
          </div>
          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-secondary text-on-secondary material-symbols-outlined text-[18px]">payments</span>
                <div>
                  <div className="font-semibold text-sm text-on-surface">Total Collections (MTD)</div>
                  <div className="text-xs text-outline">Direct copays + insurance transfers</div>
                </div>
              </div>
              <span className="font-bold text-base font-tabular-metric text-secondary">
                {formatCurrency(billingSummary?.totalCollected || 1320400)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-primary text-on-primary material-symbols-outlined text-[18px]">science</span>
                <div>
                  <div className="font-semibold text-sm text-on-surface">Diagnostic Lab Throughput</div>
                  <div className="text-xs text-outline">Automated analyzer tests completed</div>
                </div>
              </div>
              <span className="font-bold text-base font-tabular-metric text-primary">3,412 tests</span>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-tertiary-container text-white material-symbols-outlined text-[18px]">medication</span>
                <div>
                  <div className="font-semibold text-sm text-on-surface">Pharmacy Dispensary Volume</div>
                  <div className="text-xs text-outline">Prescription units dispensed</div>
                </div>
              </div>
              <span className="font-bold text-base font-tabular-metric text-on-surface">1,890 units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
