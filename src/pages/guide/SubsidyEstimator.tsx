import React, { useState } from 'react';
import { useT } from '../../i18n';
import { StateGuideEntry } from '../../data/guide/schema';
import { calculateEstimatedSubsidy } from '../../data/guideApi';
import { Card } from '../../components/Card';

interface SubsidyEstimatorProps {
  states?: StateGuideEntry[];
  selectedState?: StateGuideEntry | null;
  onSelectState?: (state: StateGuideEntry | null) => void;
  className?: string;
}

export const SubsidyEstimator: React.FC<SubsidyEstimatorProps> = ({
  states = [],
  selectedState = null,
  onSelectState,
  className = '',
}) => {
  const { lang, t } = useT();
  const [kw, setKw] = useState<number>(3);
  const [isIndividualHousehold, setIsIndividualHousehold] = useState<boolean>(true);

  const estimatedSubsidy = isIndividualHousehold ? calculateEstimatedSubsidy(kw) : 0;

  const handleKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setKw(Math.max(0.5, Math.min(10, val)));
    }
  };

  return (
    <Card variant="white" className={`border border-amber-300/80 shadow-sm p-5 sm:p-7 ${className}`}>
      <div className="mb-5 pb-4 border-b border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          {t.guide.estimator.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.guide.estimator.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Controls */}
        <div className="space-y-5">
          {/* System Size kW slider / number */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="estimator-kw" className="text-sm font-bold text-slate-900">
                {t.guide.estimator.kwLabel}
              </label>
              <span className="text-base font-extrabold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-md border border-green-200">
                {kw.toFixed(1)} kW
              </span>
            </div>

            <input
              id="estimator-kw"
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={kw}
              onChange={handleKwChange}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-700"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>0.5 kW</span>
              <span>2 kW</span>
              <span>3 kW</span>
              <span>5 kW</span>
              <span>10 kW</span>
            </div>
          </div>

          {/* Household Toggle */}
          <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
            <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
              <span className="text-xs sm:text-sm font-semibold text-slate-900">
                {t.guide.estimator.householdToggleLabel}
              </span>
              <input
                type="checkbox"
                checked={isIndividualHousehold}
                onChange={(e) => setIsIndividualHousehold(e.target.checked)}
                className="w-5 h-5 rounded text-green-700 focus:ring-green-600 border-slate-300 cursor-pointer"
              />
            </label>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
              {t.guide.estimator.householdNotice}
            </p>
          </div>

          {/* Optional State Selector for checking state top-up */}
          {states.length > 0 && onSelectState && (
            <div>
              <label htmlFor="state-filter-select" className="block text-xs font-bold text-slate-800 mb-1">
                {t.guide.estimator.selectStatePrompt}
              </label>
              <select
                id="state-filter-select"
                value={selectedState?.id || ''}
                onChange={(e) => {
                  const found = states.find((s) => s.id === e.target.value) || null;
                  onSelectState(found);
                }}
                className="w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              >
                <option value="">-- All India (National Overview) --</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === 'hi' ? s.name_hi : s.name_en} {s.is_union_territory ? '(UT)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Output Results Card */}
        <div className="bg-gradient-to-br from-green-50 to-[#FEFDF5] p-5 sm:p-6 rounded-xl border-2 border-green-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-900 bg-green-100 px-2.5 py-1 rounded-md">
              {t.guide.estimator.formulaLabel}
            </span>

            <div className="mt-4">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 block">
                {t.guide.estimator.estimateResultLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                ₹{estimatedSubsidy.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Formula Breakdown Notes */}
            <div className="mt-4 pt-3 border-t border-green-200/70 text-xs text-slate-700 space-y-1">
              <p>• ₹30,000 / kW for first 2 kW</p>
              <p>• ₹18,000 / kW for 2 kW to 3 kW</p>
              <p>• Fixed cap at ₹78,000 for systems ≥ 3 kW</p>
            </div>

            {/* State Top-up Note if a state is selected */}
            {selectedState && (
              <div className="mt-4 pt-3 border-t border-green-200/70">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  {t.guide.estimator.stateTopUpHeader} ({lang === 'hi' ? selectedState.name_hi : selectedState.name_en}):
                </span>
                {selectedState.state_top_up.status === 'available' && selectedState.state_top_up.amount_text ? (
                  <p className="text-xs font-semibold text-green-800 bg-white p-2 rounded border border-green-300">
                    {selectedState.state_top_up.amount_text}
                  </p>
                ) : selectedState.state_top_up.status === 'none' ? (
                  <p className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                    {t.guide.estimator.stateTopUpNone}
                  </p>
                ) : (
                  <p className="text-xs text-amber-900 bg-amber-100/70 p-2 rounded border border-amber-200 font-medium">
                    {t.guide.estimator.stateTopUpNotVerified}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Mandatory Disclaimer */}
          <p className="mt-5 text-[11px] text-slate-500 italic leading-snug border-t border-green-200/50 pt-2">
            {t.guide.estimator.estimateDisclaimer}
          </p>
        </div>
      </div>
    </Card>
  );
};
