import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'

const navItems = [
  { to: '/', label: '首页', icon: '🏠' },
  { to: '/courses', label: '课程', icon: '📚' },
  { to: '/progress', label: '进度', icon: '📊' },
  { to: '/community', label: '社区', icon: '💬' },
  { to: '/achievements', label: '成就', icon: '🏆' },
  { to: '/profile', label: '我的', icon: '👤' },
]

export default function Layout() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/auth')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 fixed h-screen z-20">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-lg">
              🌍
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-none">LinguaVerse</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">多语种学习平台</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-brand-500 flex items-center justify-center text-white text-sm font-bold">
              {state.user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{state.user?.username}</p>
              <p className="text-[11px] text-slate-400 truncate">{state.user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-rose-500 transition"
              title="退出登录"
            >
              ⎋
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3.5">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                🌍
              </div>
              <span className="font-bold text-slate-900">LinguaVerse</span>
            </div>
            <div className="hidden md:block">
              <h2 className="text-lg font-bold text-slate-900">欢迎回来，{state.user?.username} 👋</h2>
              <p className="text-xs text-slate-400">今天也要坚持学习哦！</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                🔥 <span>{state.stats.streak}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-50 text-brand-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                ⭐ <span>{state.stats.totalXp}</span> XP
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom nav - mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-20 flex justify-around py-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-brand-600' : 'text-slate-400'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
