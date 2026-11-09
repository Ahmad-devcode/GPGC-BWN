'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // honeypot — must stay empty
  });

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#0D2B5A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]/40 transition-all';

  if (status === 'sent') {
    return (
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-10 text-center">
        <div className="inline-flex p-4 rounded-full bg-green-50 text-green-600 mb-4">
          <CheckCircle size={36} />
        </div>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-2">Message sent successfully</h3>
        <p className="text-[#4A5568] text-sm leading-relaxed max-w-md mx-auto">
          Thank you for contacting Punjab Tianjin University of Technology. Our team will
          get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-[#C62828] hover:underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 md:p-8 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
            Full Name <span className="text-[#C62828]">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={200}
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
            Email Address <span className="text-[#C62828]">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={320}
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={50}
            value={form.phone}
            onChange={update('phone')}
            placeholder="03xx-xxxxxxx"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            maxLength={300}
            value={form.subject}
            onChange={update('subject')}
            placeholder="What is this about?"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
          Message <span className="text-[#C62828]">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          maxLength={5000}
          value={form.message}
          onChange={update('message')}
          placeholder="Write your message..."
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update('website')}
          />
        </label>
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-[#C62828]/5 border border-[#C62828]/15 rounded-xl">
          <AlertCircle size={18} className="text-[#C62828] shrink-0 mt-0.5" />
          <p className="text-sm text-[#C62828] font-medium">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 bg-[#C62828] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#D32F2F] transition-colors shadow-lg shadow-[#C62828]/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
