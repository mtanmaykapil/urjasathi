import React, { useState } from 'react';
import { useT } from '../i18n';
import { getWhatsAppUrl } from '../config';
import { track } from '../analytics';
import { submitInterest } from '../data/interestApi';
import { JobsPerMonth } from '../types';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const ContactSection: React.FC = () => {
  const { lang, t } = useT();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [jobsPerMonth, setJobsPerMonth] = useState<JobsPerMonth>('under_10');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDirectWhatsAppClick = () => {
    track('whatsapp_click', { source: 'contact_section_direct' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = t.contact.nameValidationError;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = t.contact.phoneValidationError;
    }

    if (!city.trim()) {
      errors.city = t.contact.cityValidationError;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setLoading(true);
    const cleanPhone = phone.trim().replace(/\D/g, '');

    try {
      await submitInterest({
        name: name.trim(),
        phone: cleanPhone,
        city: city.trim(),
        jobsPerMonth,
        language: lang,
      });

      // ONLY on real success
      setIsSuccess(true);
      track('interest_form_submitted');
    } catch {
      // Backend not connected yet: Show clear error, DO NOT pretend to save, and KEEP entered data
      setErrorMessage(t.contact.fallbackError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" background="white" className="border-b border-amber-200/50">
      <SectionHeading
        title={t.contact.sectionTitle}
        subheading={t.contact.sectionSubhead}
      />

      <div className="max-w-xl mx-auto space-y-8">
        {/* Direct WhatsApp Callout */}
        <div className="bg-[#FFFDF2] p-6 rounded-2xl border border-amber-300/80 shadow-xs text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs mb-3">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {t.contact.whatsappDirectCta}
          </h3>
          <p className="text-sm text-slate-600 mb-5">
            {t.contact.whatsappSubtext}
          </p>
          <Button
            size="lg"
            variant="whatsapp"
            onClick={handleDirectWhatsAppClick}
            className="w-full sm:w-auto"
          >
            {t.hero.whatsappCta}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-4 text-xs uppercase tracking-wider text-slate-400 font-bold absolute">
            {t.contact.orDivider}
          </span>
        </div>

        {/* Interest Form */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            {t.contact.formTitle}
          </h3>

          {isSuccess ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-green-900">Thank you!</h4>
              <p className="text-sm text-green-800 mt-1">We have received your details and will get in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Level Error Message */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={handleDirectWhatsAppClick}
                      className="text-xs text-green-800 font-bold underline mt-1 cursor-pointer"
                    >
                      Click here to contact us directly on WhatsApp &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {t.contact.nameLabel} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    fieldErrors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="contact-phone" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {t.contact.phoneLabel} *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-mono">
                    +91
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.contact.phonePlaceholder}
                    className={`w-full min-h-[44px] pl-12 pr-3.5 py-2 rounded-lg border text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      fieldErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                    }`}
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="contact-city" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {t.contact.cityLabel} *
                </label>
                <input
                  id="contact-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.contact.cityPlaceholder}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                    fieldErrors.city ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                  }`}
                />
                {fieldErrors.city && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.city}</p>
                )}
              </div>

              {/* Jobs Per Month Dropdown */}
              <div>
                <label htmlFor="contact-volume" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {t.contact.jobsPerMonthLabel}
                </label>
                <select
                  id="contact-volume"
                  value={jobsPerMonth}
                  onChange={(e) => setJobsPerMonth(e.target.value as JobsPerMonth)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                >
                  <option value="under_10">{t.contact.jobsUnder10}</option>
                  <option value="10_to_30">{t.contact.jobs10to30}</option>
                  <option value="over_30">{t.contact.jobsOver30}</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? t.contact.submittingBtn : t.contact.submitBtn}
                </Button>
              </div>

              {/* Privacy Line Under Form */}
              <p className="text-xs text-slate-500 text-center pt-2">
                {t.contact.privacyNotice}
              </p>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};
