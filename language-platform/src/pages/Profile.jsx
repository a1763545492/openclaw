import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, getLevel } from '../store/AppContext.jsx'
import { languages, achievements } from '../data/courses.js'

export default function Profile() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const level = getLevel(state.stats.totalXp)
  const [goal, setGoal] = useState(state.dailyGoal)
  const [saved, setSaved] = useState(false)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/auth')
  }

  const saveGoal = () => {
    dispatch({ type: 'SET_DAILY_GOAL', payload: goal })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const joinDate = state.user?.createdAt ? new Date(state.user.createdAt).toLocaleDateString('zh-CN') : '-'
  const recentAch = state.unlockedAchievements
    .map((id) => achievements.find((a) => a.id === id))
    .filter(Boolean)
    .slice(-4)
    .reverse()

  return (
    <div className="space-y-6">
      {/* 个人卡片 */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 h-24" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-400 to-brand-500 border-4 border-white flex items-center justify-center text-5xl shadow-lg">
              {state.user?.avatar || '🧑‍🎓'}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{state.user?.username}</h1>
              <p className="text-sm text-slate-400">{state.user?.email}</p>
            </div>
            <div className="text-right pb-2">
              <p className="text-sm font-bold text-brand-600">Lv.{level.level}</p>
              <p className="text-xs text-slate-400">{level.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="⭐" value={state.stats.totalXp} label="总 XP" />
        <StatCard icon="🔥" value={state.stats.streak} label="连续天数" />
        <StatCard icon="📚" value={state.stats.wordsLearned} label="掌握单词" />
        <StatCard icon="🏆" value={state.unlockedAchievements.length} label="成就数" />
      </div>

      {/* 学习设置 */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">⚙️ 学习设置</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">每日 XP 目标</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="flex-1 accent-brand-600"
              />
              <span className="w-16 text-center font-bold text-brand-600">{goal} XP</span>
            </div>
            <button onClick={saveGoal} className="btn-primary mt-3 py-2 text-sm">
              {saved ? '✓ 已保存' : '保存设置'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">当前学习语言</label>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => dispatch({ type: 'SET_LANG', payload: l.id })}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                    state.activeLang === l.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 最近成就 */}
      {recentAch.length > 0 && (
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 mb-4">🎖️ 最近成就</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recentAch.map((a) => (
              <div key={a.id} className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-3xl mb-1">{a.icon}</div>
                <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                <p className="text-xs text-amber-600 font-bold">+{a.xp} XP</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 账号信息 */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">👤 账号信息</h3>
        <div className="space-y-3 text-sm">
          <Row label="用户名" value={state.user?.username || '-'} />
          <Row label="邮箱" value={state.user?.email || '-'} />
          <Row label="注册时间" value={joinDate} />
          <Row label="学习语言" value={state.stats.languagesLearned.map((id) => languages.find((l) => l.id === id)?.name).join('、')} />
        </div>
      </div>

      <button onClick={handleLogout} className="btn-secondary w-full text-rose-500 border-rose-200 hover:bg-rose-50">
        退出登录
      </button>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-700 font-medium">{value}</span>
    </div>
  )
}
