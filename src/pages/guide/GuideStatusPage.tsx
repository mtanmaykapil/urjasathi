import React, { useState, useEffect } from 'react';
import { useT } from '../../i18n';
import { StateGuideEntry } from '../../data/guide/schema';
import { getGuideStatusSummary } from '../../data/guideApi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

interface GuideStatusPageProps {
  onNavigate: (route: string) => void;
}

export const GuideStatusPage: React.FC<GuideStatusPageProps> = ({ onNavigate }) => {
  const { lang, t } = useT();
  const [summary, setSummary] = useState<{
    total: number;
    verifiedCount: number;
    notVerifiedCount: number;
    states: StateGuideEntry[];
  } | null>(null);

  // Set noindex dynamically
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    }
    meta.content = 'noindex, nofollow';

    return () => {
      if (created && meta && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      } else if (meta) {
        meta.content = 'index, follow';
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getGuideStatusSummary().then((res) => {
      if (mounted) setSummary(res);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFDF5] text-slate-600">
        Loading status tracker...
      </div>
    );
  }

  const completionPct = Math.round((summary.verifiedCount / summary.total) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
          <button
            onClick={() => onNavigate('/guide')}
            className="text-xs sm:text-sm font-semibold text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-1.5 py-1"
          >
            {t.guide.common.backToGuideHub}
          </button>

          <span className="text-[11px] font-mono bg-red-100 text-red-900 px-2 py-0.5 rounded font-bold uppercase">
            noindex • internal tracker
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.guide.status.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.guide.status.subtitle}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-slate-200 p-5">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {t.guide.status.totalLabel}
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {summary.total}
            </div>
            <p className="text-xs text-slate-500 mt-1">28 States + 8 Union Territories</p>
          </Card>

          <Card className="border border-green-200 bg-green-50/50 p-5">
            <span className="text-xs font-bold text-green-900 uppercase">
              {t.guide.status.verifiedLabel}
            </span>
            <div className="text-3xl font-black text-green-800 mt-1">
              {summary.verifiedCount}
            </div>
            <p className="text-xs text-green-800 mt-1 font-semibold">{completionPct}% completed</p>
          </Card>

          <Card className="border border-amber-200 bg-amber-50/50 p-5">
            <span className="text-xs font-bold text-amber-900 uppercase">
              {t.guide.status.pendingLabel}
            </span>
            <div className="text-3xl font-black text-amber-800 mt-1">
              {summary.notVerifiedCount}
            </div>
            <p className="text-xs text-amber-800 mt-1">Awaiting official circular citations</p>
          </Card>
        </div>

        {/* States Verification Table */}
        <Card className="border border-amber-200/90 shadow-sm overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-amber-50/50 text-slate-800">
                  <th className="py-3 px-4 font-bold">{t.guide.status.stateCol}</th>
                  <th className="py-3 px-4 font-bold">{t.guide.status.typeCol}</th>
                  <th className="py-3 px-4 font-bold">{t.guide.status.statusCol}</th>
                  <th className="py-3 px-4 font-bold">{t.guide.status.topUpCol}</th>
                  <th className="py-3 px-4 font-bold">{t.guide.status.lastVerifiedCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {summary.states.map((st) => {
                  const isVer = st.status === 'verified';
                  return (
                    <tr
                      key={st.id}
                      onClick={() => onNavigate(`/guide/state/${st.id}`)}
                      className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {lang === 'hi' ? st.name_hi : st.name_en}
                        <span className="text-slate-400 font-normal font-mono ml-1.5 text-[11px]">
                          ({st.id})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {st.is_union_territory ? t.guide.status.stateUT : t.guide.status.stateState}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={isVer ? 'success' : 'default'} size="sm">
                          {isVer ? t.guide.status.verifiedTag : t.guide.status.notVerifiedTag}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {st.state_top_up.status === 'available' ? (
                          <span className="text-green-800 font-bold">Available</span>
                        ) : st.state_top_up.status === 'none' ? (
                          <span className="text-slate-500">None</span>
                        ) : (
                          <span className="text-amber-800">Not verified</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-xs">
                        {st.last_verified || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
