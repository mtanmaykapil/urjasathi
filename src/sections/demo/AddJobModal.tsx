import React, { useState } from 'react';
import { useT } from '../../i18n';
import { Button } from '../../components/Button';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: {
    customerName: string;
    phone: string;
    city: string;
    systemKw: number;
    notes?: string;
  }) => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useT();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [systemKw, setSystemKw] = useState('3');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = t.demo.addModal.errorName;
    }

    // 10-digit Indian mobile format (typically begins with 6, 7, 8, 9)
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = t.demo.addModal.errorPhone;
    }

    if (!city.trim()) {
      newErrors.city = t.demo.addModal.errorCity;
    }

    const kwVal = parseFloat(systemKw);
    if (isNaN(kwVal) || kwVal <= 0 || kwVal > 1000) {
      newErrors.systemKw = t.demo.addModal.errorKw;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanPhone = phone.trim().replace(/\D/g, '');
    onSubmit({
      customerName: customerName.trim(),
      phone: cleanPhone,
      city: city.trim(),
      systemKw: parseFloat(systemKw),
      notes: notes.trim(),
    });

    // Reset fields on successful submit
    setCustomerName('');
    setPhone('');
    setCity('');
    setSystemKw('3');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-job-title"
    >
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#FFFDF7]">
          <div>
            <h3 id="add-job-title" className="text-lg sm:text-xl font-bold text-slate-900">
              {t.demo.addModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.demo.addModal.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Customer Name */}
          <div>
            <label htmlFor="modal-name" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
              {t.demo.addModal.nameLabel} *
            </label>
            <input
              id="modal-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.demo.addModal.namePlaceholder}
              className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.customerName ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.customerName && (
              <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* 10-Digit Phone */}
          <div>
            <label htmlFor="modal-phone" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
              {t.demo.addModal.phoneLabel} *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-mono">
                +91
              </span>
              <input
                id="modal-phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.demo.addModal.phonePlaceholder}
                className={`w-full min-h-[44px] pl-12 pr-3.5 py-2 rounded-lg border text-sm sm:text-base text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {/* City / District */}
          <div>
            <label htmlFor="modal-city" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
              {t.demo.addModal.cityLabel} *
            </label>
            <input
              id="modal-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.demo.addModal.cityPlaceholder}
              className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.city ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>

          {/* System Size kW */}
          <div>
            <label htmlFor="modal-kw" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
              {t.demo.addModal.kwLabel} *
            </label>
            <input
              id="modal-kw"
              type="number"
              step="0.5"
              min="1"
              max="1000"
              value={systemKw}
              onChange={(e) => setSystemKw(e.target.value)}
              placeholder={t.demo.addModal.kwPlaceholder}
              className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.systemKw ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.systemKw && <p className="text-xs text-red-600 mt-1">{errors.systemKw}</p>}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="modal-notes" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
              {t.demo.addModal.notesLabel}
            </label>
            <textarea
              id="modal-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.demo.addModal.notesPlaceholder}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              {t.demo.addModal.cancelBtn}
            </Button>
            <Button type="submit" variant="primary">
              {t.demo.addModal.submitBtn}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
