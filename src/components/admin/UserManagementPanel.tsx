'use client'

import { useMemo, useState } from 'react'
import { AdminLocale, adminCopy } from '@/lib/admin-locale'

type UserRow = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'EDITOR'
}

export default function UserManagementPanel({
  locale,
  users,
  currentUserId,
  canManage,
}: {
  locale: AdminLocale
  users: UserRow[]
  currentUserId?: string
  canManage: boolean
}) {
  const copy = adminCopy[locale].users
  const [items, setItems] = useState(users)
  const [msg, setMsg] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR' as 'ADMIN' | 'EDITOR',
  })

  const tone = useMemo(() => {
    return msg === copy.created || msg === copy.updated || msg === copy.deleted ? 'success' : 'error'
  }, [copy.created, copy.deleted, copy.updated, msg])

  async function createUser(e: React.FormEvent) {
    e.preventDefault()
    if (!canManage) return
    setCreating(true)
    setMsg('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (!res.ok) throw new Error('create-failed')
      const created = await res.json()
      setItems((prev) => [...prev, created])
      setNewUser({ name: '', email: '', password: '', role: 'EDITOR' })
      setMsg(copy.created)
    } catch {
      setMsg(copy.failed)
    } finally {
      setCreating(false)
    }
  }

  async function updateUser(id: string, payload: Partial<UserRow> & { password?: string }) {
    if (!canManage) return
    setSavingId(id)
    setMsg('')
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('update-failed')
      const updated = await res.json()
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)))
      setMsg(copy.updated)
    } catch {
      setMsg(copy.failed)
    } finally {
      setSavingId(null)
    }
  }

  async function deleteUser(id: string) {
    if (!canManage || id === currentUserId) return
    setSavingId(id)
    setMsg('')
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete-failed')
      setItems((prev) => prev.filter((item) => item.id !== id))
      setMsg(copy.deleted)
    } catch {
      setMsg(copy.failed)
    } finally {
      setSavingId(null)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f5bff]'

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <h2 className="font-display text-2xl font-700 text-slate-950">{copy.addTitle}</h2>
        <p className="mt-2 text-sm text-slate-500">{copy.passwordHint}</p>

        <form onSubmit={createUser} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            value={newUser.name}
            onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
            placeholder={locale === 'en' ? 'Full name' : 'Họ và tên'}
            className={inputClass}
            disabled={!canManage || creating}
            required
          />
          <input
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            type="email"
            className={inputClass}
            disabled={!canManage || creating}
            required
          />
          <input
            value={newUser.password}
            onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
            placeholder={locale === 'en' ? 'Password' : 'Mật khẩu'}
            type="password"
            className={inputClass}
            disabled={!canManage || creating}
            required
          />
          <div className="flex gap-3">
            <select
              value={newUser.role}
              onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value as 'ADMIN' | 'EDITOR' }))}
              className={inputClass}
              disabled={!canManage || creating}
            >
              <option value="EDITOR">{copy.roleEditor}</option>
              <option value="ADMIN">{copy.roleAdmin}</option>
            </select>
            <button
              type="submit"
              disabled={!canManage || creating}
              className="rounded-2xl bg-[#0f5bff] px-5 py-3 text-sm font-600 text-white transition-colors hover:bg-[#0848d6] disabled:opacity-50"
            >
              {creating ? copy.creating : copy.create}
            </button>
          </div>
        </form>

        {!canManage ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {copy.adminOnly}
          </div>
        ) : null}

        {msg ? (
          <div className={`mt-4 rounded-2xl px-4 py-3 text-sm ${tone === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-red-200 bg-red-50 text-red-700'}`}>
            {msg}
          </div>
        ) : null}
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-display text-2xl font-700 text-slate-950">{copy.listTitle}</h2>
        </div>

        {items.length ? (
          <div className="divide-y divide-slate-200">
            {items.map((user) => (
              <div key={user.id} className="grid gap-4 px-6 py-5 lg:grid-cols-[1fr_1fr_180px_100px] lg:items-center">
                <input
                  defaultValue={user.name}
                  className={inputClass}
                  disabled={!canManage || savingId === user.id}
                  onBlur={(e) => {
                    if (e.target.value !== user.name) {
                      void updateUser(user.id, { name: e.target.value })
                    }
                  }}
                />
                <input
                  defaultValue={user.email}
                  className={inputClass}
                  disabled={!canManage || savingId === user.id}
                  onBlur={(e) => {
                    if (e.target.value !== user.email) {
                      void updateUser(user.id, { email: e.target.value })
                    }
                  }}
                />
                <select
                  value={user.role}
                  className={inputClass}
                  disabled={!canManage || savingId === user.id}
                  onChange={(e) => {
                    const role = e.target.value as 'ADMIN' | 'EDITOR'
                    setItems((prev) => prev.map((item) => (item.id === user.id ? { ...item, role } : item)))
                    void updateUser(user.id, { role })
                  }}
                >
                  <option value="EDITOR">{copy.roleEditor}</option>
                  <option value="ADMIN">{copy.roleAdmin}</option>
                </select>
                <button
                  type="button"
                  disabled={!canManage || savingId === user.id || user.id === currentUserId}
                  onClick={() => void deleteUser(user.id)}
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-600 text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  {copy.delete}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-sm text-slate-500">{copy.empty}</div>
        )}
      </div>
    </div>
  )
}
