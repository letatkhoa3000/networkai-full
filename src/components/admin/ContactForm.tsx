'use client'
import { useState } from 'react'

const SERVICES = [
  'Thiết kế hệ thống CNTT',
  'Triển khai hệ thống ELV',
  'Smart Home / Smart Building',
  'Tư vấn & thẩm định hệ thống',
  'Thi công & cấu hình',
  'Bảo trì & hỗ trợ kỹ thuật',
  'Khác',
]

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', serviceType: '', message: '',
    honeypot: '', // ẩn, anti-spam
  })

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setState('success')
      } else {
        setErrorMsg(data.error ?? 'Có lỗi xảy ra')
        setState('error')
      }
    } catch {
      setErrorMsg('Không thể kết nối. Vui lòng thử lại.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-navy-800 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-96">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-600 text-xl text-white mb-3">Gửi thành công!</h3>
        <p className="text-white/50 leading-relaxed">
          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
        </p>
        <p className="text-white/30 text-sm mt-3">Vui lòng kiểm tra email để xem xác nhận.</p>
        <button
          onClick={() => { setState('idle'); setForm({ name: '', email: '', phone: '', company: '', serviceType: '', message: '', honeypot: '' }) }}
          className="mt-8 px-5 py-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-sm rounded-lg transition-colors"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <div className="bg-navy-800 border border-white/5 rounded-2xl p-8">
      <h2 className="font-display font-600 text-xl text-white mb-6">Gửi yêu cầu tư vấn</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — ẩn với người dùng thật */}
        <input
          type="text"
          value={form.honeypot}
          onChange={e => set('honeypot', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-sm mb-2 block">Họ và tên *</label>
            <input
              value={form.name} onChange={e => set('name', e.target.value)}
              required placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white placeholder-white/20 text-sm focus:border-brand-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-white/50 text-sm mb-2 block">Email *</label>
            <input
              type="email" value={form.email} onChange={e => set('email', e.target.value)}
              required placeholder="email@company.com"
              className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white placeholder-white/20 text-sm focus:border-brand-500/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-sm mb-2 block">Số điện thoại</label>
            <input
              value={form.phone} onChange={e => set('phone', e.target.value)}
              placeholder="0901 234 567"
              className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white placeholder-white/20 text-sm focus:border-brand-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-white/50 text-sm mb-2 block">Công ty</label>
            <input
              value={form.company} onChange={e => set('company', e.target.value)}
              placeholder="Tên công ty / dự án"
              className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white placeholder-white/20 text-sm focus:border-brand-500/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-white/50 text-sm mb-2 block">Dịch vụ quan tâm</label>
          <select
            value={form.serviceType} onChange={e => set('serviceType', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white text-sm focus:border-brand-500/50 focus:outline-none transition-colors"
          >
            <option value="">Chọn dịch vụ...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-white/50 text-sm mb-2 block">Nội dung *</label>
          <textarea
            value={form.message} onChange={e => set('message', e.target.value)}
            required rows={4} placeholder="Mô tả yêu cầu, dự án hoặc câu hỏi của bạn..."
            className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-white/10 text-white placeholder-white/20 text-sm focus:border-brand-500/50 focus:outline-none transition-colors resize-none"
          />
        </div>

        {state === 'error' && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-500 rounded-xl transition-all duration-200 hover:scale-[1.01]"
        >
          {state === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Đang gửi...
            </span>
          ) : 'Gửi yêu cầu tư vấn'}
        </button>

        <p className="text-white/20 text-xs text-center">
          Thông tin của bạn được bảo mật tuyệt đối
        </p>
      </form>
    </div>
  )
}