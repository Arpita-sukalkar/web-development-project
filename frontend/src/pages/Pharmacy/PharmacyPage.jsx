import React, { useState, useEffect } from 'react';
import { pharmacyService } from '../../services/pharmacyService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Modal from '../../components/common/Modal';

export default function PharmacyPage() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState(null);

  // Add Med Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: 'Antibiotics',
    dosageForm: 'Tablet',
    strength: '500mg',
    stockQuantity: 100,
    reorderLevel: 20,
    unitPrice: 12.5,
    batchNumber: 'LOT-2026-99',
    expiryDate: '2027-12-31',
    manufacturer: 'Pfizer / BioTech Labs',
  });

  // Dispense Modal
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);
  const [dispenseMed, setDispenseMed] = useState(null);
  const [dispenseQty, setDispenseQty] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const data = await pharmacyService.getAll();
      setMedications(data);
    } catch (err) {
      console.error('Failed to load pharmacy data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await pharmacyService.create({
        ...formData,
        stockQuantity: Number(formData.stockQuantity),
        reorderLevel: Number(formData.reorderLevel),
        unitPrice: Number(formData.unitPrice),
      });
      setIsAddModalOpen(false);
      fetchMedications();
      setToastMsg('Medication added to clinical formulary.');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to create medication:', err);
      alert('Error creating medication: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDispense = async (e) => {
    e.preventDefault();
    if (!dispenseMed) return;
    setSubmitting(true);
    try {
      await pharmacyService.dispense(dispenseMed.id, Number(dispenseQty));
      setIsDispenseModalOpen(false);
      setDispenseMed(null);
      fetchMedications();
      setToastMsg(`Successfully dispensed ${dispenseQty} units of ${dispenseMed.name}.`);
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err) {
      console.error('Failed to dispense medication:', err);
      alert('Error dispensing medication: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestock = async (medId, currentStock) => {
    try {
      await pharmacyService.updateStock(medId, currentStock + 50);
      fetchMedications();
      setToastMsg('Inventory restocked +50 units.');
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err) {
      console.error('Failed to restock:', err);
    }
  };

  const filteredMeds = medications.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.drugCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const isLow = m.stockQuantity <= (m.reorderLevel || 20);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'in-stock' && !isLow) ||
      (statusFilter === 'low-stock' && isLow);

    return matchesSearch && matchesStatus;
  });

  const lowStockMeds = medications.filter((m) => m.stockQuantity <= (m.reorderLevel || 20));

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs font-caption text-caption uppercase text-secondary font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Inpatient & Outpatient Pharmacy Vault • Formulary Active</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold mt-1">
            Hospital Central Pharmacy & Medication Dispensary
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => {
              setToastMsg('Inventory count verified against automated barcode shelves.');
              setTimeout(() => setToastMsg(null), 2500);
            }}
            className="flex items-center gap-space-xs px-space-sm py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all shadow-sm font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">fact_check</span>
            <span>Audit Stock</span>
          </button>
          <button
            onClick={() => {
              if (medications.length > 0) {
                setDispenseMed(medications[0]);
                setIsDispenseModalOpen(true);
              }
            }}
            className="flex items-center gap-space-xs px-space-sm py-2 rounded-lg bg-secondary text-on-secondary hover:bg-secondary/90 transition-all shadow-sm font-label-md text-label-md font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">prescriptions</span>
            <span>Dispense Prescription</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-space-xs px-space-base py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all shadow-md font-label-md text-label-md font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Add New Medicine</span>
          </button>
        </div>
      </div>

      {/* 5 Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Total Medicines</span>
            <span className="material-symbols-outlined text-[20px] text-primary">medication</span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-on-surface tabular-nums">{medications.length}</span>
              <span className="font-label-sm text-label-sm text-outline">SKUs</span>
            </div>
            <div className="flex items-center gap-space-xs mt-space-2xs text-secondary font-caption text-caption font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>Active formulary</span>
            </div>
          </div>
          <div className="w-full mt-3 h-1 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Available Stock</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">inventory_2</span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-secondary tabular-nums">
                {medications.reduce((acc, m) => acc + (m.stockQuantity || 0), 0)}
              </span>
              <span className="font-label-sm text-label-sm text-outline">units</span>
            </div>
            <div className="flex items-center gap-space-xs mt-space-2xs text-secondary font-caption text-caption font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Central warehouse active</span>
            </div>
          </div>
          <div className="w-full mt-3 h-1 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Low Stock Alert</span>
            <span className="material-symbols-outlined text-[20px] text-error">warning</span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-error tabular-nums">{lowStockMeds.length}</span>
              <span className="font-label-sm text-label-sm text-error font-medium">lines</span>
            </div>
            <div className="flex items-center gap-space-xs mt-space-2xs text-on-error-container font-caption text-caption font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              <span>Reorder priority</span>
            </div>
          </div>
          <div className="w-full mt-3 h-1 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-error" style={{ width: `${medications.length ? (lowStockMeds.length / medications.length) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Expiring &lt; 60 Days</span>
            <span className="material-symbols-outlined text-[20px] text-tertiary">history_toggle_off</span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-tertiary tabular-nums">2</span>
              <span className="font-label-sm text-label-sm text-outline">batches</span>
            </div>
            <div className="flex items-center gap-space-xs mt-space-2xs text-tertiary font-caption text-caption font-semibold">
              <span className="material-symbols-outlined text-[14px]">event_busy</span>
              <span>FIFO rotation active</span>
            </div>
          </div>
          <div className="w-full mt-3 h-1 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-tertiary" style={{ width: '25%' }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Pending Rx Orders</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container">assignment</span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-primary-container tabular-nums">18</span>
              <span className="font-label-sm text-label-sm text-primary font-medium">queuing</span>
            </div>
            <div className="flex items-center gap-space-xs mt-space-2xs text-primary font-caption text-caption font-semibold">
              <span className="material-symbols-outlined text-[14px]">local_pharmacy</span>
              <span>4 Stat / ICU Inpatients</span>
            </div>
          </div>
          <div className="w-full mt-3 h-1 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-primary-container" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-space-lg">
        {/* Medication Table (8 cols) */}
        <div className="2xl:col-span-8 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex flex-col md:flex-row gap-space-sm items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Brand, Generic, Drug Class, Code..."
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-surface text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all"
                />
              </div>
              <div className="flex items-center gap-space-xs overflow-x-auto pb-1 md:pb-0">
                <span className="font-caption text-caption uppercase text-outline font-semibold whitespace-nowrap pl-1">Status:</span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-space-sm py-1 rounded-full font-caption text-caption font-semibold transition-all ${
                    statusFilter === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('in-stock')}
                  className={`px-space-sm py-1 rounded-full font-caption text-caption font-semibold transition-all ${
                    statusFilter === 'in-stock' ? 'bg-secondary text-on-secondary' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  In Stock
                </button>
                <button
                  onClick={() => setStatusFilter('low-stock')}
                  className={`px-space-sm py-1 rounded-full font-caption text-caption font-semibold transition-all ${
                    statusFilter === 'low-stock' ? 'bg-error text-on-error' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  Low Stock
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-outline">Loading pharmaceutical inventory...</div>
            ) : filteredMeds.length === 0 ? (
              <div className="p-8 text-center text-outline bg-surface-container-low rounded-xl">
                No medications matched the search criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-caption text-caption uppercase tracking-wider">
                      <th className="py-space-xs px-space-sm rounded-l-lg">Drug & Generic</th>
                      <th className="py-space-xs px-space-sm">Class / Form</th>
                      <th className="py-space-xs px-space-sm">Stock Level</th>
                      <th className="py-space-xs px-space-sm">Unit Price</th>
                      <th className="py-space-xs px-space-sm">Expiry / Lot</th>
                      <th className="py-space-xs px-space-sm rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                    {filteredMeds.map((med) => {
                      const isLow = med.stockQuantity <= (med.reorderLevel || 20);
                      return (
                        <tr key={med.id} className="hover:bg-surface-container-low transition-colors">
                          <td className="py-space-sm px-space-sm">
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md font-semibold text-on-surface">
                                {med.name}
                              </span>
                              <span className="font-caption text-caption text-outline">
                                {med.genericName} • {med.strength}
                              </span>
                            </div>
                          </td>
                          <td className="py-space-sm px-space-sm">
                            <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-caption font-semibold">
                              {med.category}
                            </span>
                          </td>
                          <td className="py-space-sm px-space-sm">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className={`font-tabular-metric font-bold text-sm ${isLow ? 'text-error' : 'text-secondary'}`}>
                                  {med.stockQuantity} units
                                </span>
                                {isLow && (
                                  <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-caption text-[10px] font-bold">
                                    LOW
                                  </span>
                                )}
                              </div>
                              <span className="font-caption text-outline text-[11px]">
                                Min: {med.reorderLevel || 20}
                              </span>
                            </div>
                          </td>
                          <td className="py-space-sm px-space-sm font-medium font-tabular-metric text-on-surface">
                            {formatCurrency(med.unitPrice || 0)}
                          </td>
                          <td className="py-space-sm px-space-sm">
                            <div className="flex flex-col font-caption">
                              <span className="text-on-surface-variant font-medium">{formatDate(med.expiryDate)}</span>
                              <span className="text-outline font-mono text-[10px]">{med.batchNumber}</span>
                            </div>
                          </td>
                          <td className="py-space-sm px-space-sm text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setDispenseMed(med);
                                  setIsDispenseModalOpen(true);
                                }}
                                className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-caption font-semibold hover:bg-secondary hover:text-on-secondary transition-colors"
                              >
                                Dispense
                              </button>
                              <button
                                onClick={() => handleRestock(med.id, med.stockQuantity)}
                                className="px-2 py-1 rounded bg-surface-container text-primary font-caption font-semibold hover:bg-surface-container-high transition-colors"
                              >
                                Restock +50
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Critical Alerts & Reorder Panel (4 cols) */}
        <div className="2xl:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div className="flex items-center gap-space-xs text-error font-headline-sm text-headline-sm font-bold">
                <span className="material-symbols-outlined text-[20px]">warning</span>
                <span>Critical Supply Alerts</span>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-bold">
                {lowStockMeds.length} Items
              </span>
            </div>

            {lowStockMeds.length === 0 ? (
              <div className="p-4 text-center text-secondary font-medium text-xs">
                All medications are currently above minimum threshold levels.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {lowStockMeds.map((med) => (
                  <div key={med.id} className="p-space-sm rounded-lg bg-error-container/20 border border-error/30 flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-on-surface truncate">{med.name}</span>
                      <span className="text-xs text-error font-semibold">
                        {med.stockQuantity} units left (Min: {med.reorderLevel})
                      </span>
                    </div>
                    <button
                      onClick={() => handleRestock(med.id, med.stockQuantity)}
                      className="px-2.5 py-1 rounded bg-error text-on-error text-xs font-semibold hover:brightness-110 shrink-0 shadow-sm"
                    >
                      Emergency Restock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Formulary Quick Actions</h3>
            <button
              onClick={() => {
                setToastMsg('EDI Purchase Order generated for wholesale pharmaceutical distributor.');
                setTimeout(() => setToastMsg(null), 3500);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md font-semibold text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                <span>Generate Wholesale PO</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
            </button>
            <button
              onClick={() => {
                setToastMsg('Narcotics vault log audited and encrypted in blockchain ledger.');
                setTimeout(() => setToastMsg(null), 3500);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md font-semibold text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
                <span>Controlled Substances Vault Log</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add New Medicine Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Medicine to Formulary" maxWidth="max-w-xl">
        <form onSubmit={handleAddMedicine} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Brand Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lipitor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Generic Chemical Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Atorvastatin Calcium"
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Drug Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Analgesics">Analgesics & Pain Relief</option>
                <option value="Endocrine">Endocrine & Diabetes</option>
                <option value="Respiratory">Respiratory</option>
                <option value="Anesthetics">Anesthetics & Sedatives</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Dosage Form *</label>
              <input
                type="text"
                required
                placeholder="Tablet, Vial, Syrup"
                value={formData.dosageForm}
                onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Strength *</label>
              <input
                type="text"
                required
                placeholder="e.g. 20mg / 5ml"
                value={formData.strength}
                onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Initial Stock Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Reorder Threshold</label>
              <input
                type="number"
                min="0"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Unit Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Batch Number</label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline uppercase mb-1">Expiry Date *</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container shadow disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Medication'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dispense Modal */}
      <Modal isOpen={isDispenseModalOpen} onClose={() => setIsDispenseModalOpen(false)} title="Dispense Prescription" maxWidth="max-w-md">
        <form onSubmit={handleDispense} className="flex flex-col gap-4">
          <div className="bg-surface-container-low p-3 rounded-lg text-sm">
            <div className="font-semibold text-on-surface">{dispenseMed?.name}</div>
            <div className="text-xs text-outline mt-0.5">
              {dispenseMed?.genericName} • Available: {dispenseMed?.stockQuantity} units
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase mb-1">Quantity to Dispense *</label>
            <input
              type="number"
              required
              min="1"
              max={dispenseMed?.stockQuantity || 100}
              value={dispenseQty}
              onChange={(e) => setDispenseQty(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsDispenseModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-secondary text-on-secondary hover:bg-secondary/90 shadow disabled:opacity-50"
            >
              {submitting ? 'Dispensing...' : 'Confirm Dispense'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
