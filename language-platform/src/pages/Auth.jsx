import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'

export default function Auth() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // login | register
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  if (state.user) return <Navigate to="/" replace />

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'register') {
      if (!form.username || !form.email || !form.password) {
        setError('请填写所有字段')
        return
      }
      if (form.password !== form.confirm) {
        setError('两次输入的密码不一致')
        return
      }
      if (form.password.length < 6) {
        setError('密码至少需要 6 位')
        return
      }
    } else {
      if (!form.email || !form.password) {
        setError('请填写邮箱和密码')
        return
      }
    }
    const user = {
      username: mode === 'register' ? form.username : form.email.split('@')[0],
      email: form.email,
      avatar: '🧑‍🎓',
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: mode === 'register' ? 'REGISTER' : 'LOGIN', payload: user })
    navigate('/')
  }

  const quickLogin = () => {
    dispatch({
      type: 'LOGIN',
      payload: { username: '体验用户', email: 'demo@linguaverse.ai', avatar: '🧑‍🎓', createdAt: new Date().toISOString() },
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-accent-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-3xl shadow-lg shadow-brand-200 mb-4">
            🌍
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">LinguaVerse</h1>
          <p className="text-slate-500 mt-1">沉浸式多语种学习平台</p>
        </div>

        <div className="card p-6 md:p-8">
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'login' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'register' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">用户名</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="input"
                  placeholder="给自己起个名字"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">邮箱</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">密码</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input"
                placeholder="至少 6 位"
              />
            </div>
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">确认密码</label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="input"
                  placeholder="再次输入密码"
                />
              </div>
            )}

            {error && (
              <div className="bg-rose-50 text-rose-600 text-sm px-3 py-2 rounded-lg animate-shake">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-3 text-base">
              {mode === 'login' ? '登录' : '创建账号'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">或者</span>
            </div>
          </div>

          <button onClick={quickLogin} className="btn-secondary w-full">
            🚀 一键体验（无需注册）
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          登录即代表同意《用户协议》与《隐私政策》
        </p>
      </div>
    </div>
  )
}
