import { Link } from 'react-router-dom'
import { useApp, getLevel, getRecommendations } from '../store/AppContext.jsx'
import { courses, languages } from '../data/courses.js'

export default function Dashboard() {
  const { state, dispatch } = useApp()
  const level = getLevel(state.stats.totalXp)
  const recs = getRecommendations(state, courses)
  const activeLang = languages.find((l) => l.id === state.activeLang)

  // 今日 XP 进度（模拟今日已得 XP）
  const todayXp = Math.min(state.dailyGoal, state.stats.totalXp % state.dailyGoal || state.dailyGoal)
  const dayProgress = Math.min(100, Math.round((todayXp / state.dailyGoal) * 100))

  return (
    <div className="space-y-6">
      {/* Hero 卡片 */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-brand-100 text-sm">当前学习</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl">{activeLang?.flag}</span>
                <div>
                  <h2 className="text-2xl font-extrabold">{activeLang?.name}</h2>
                  <p className="text-brand-200 text-sm">{activeLang?.nativeName}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => dispatch({ type: 'SET_LANG', payload: l.id })}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    state.activeLang === l.id
                      ? 'bg-white text-brand-700'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* 每日目标 */}
          <div className="mt-6">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-brand-100">今日目标</span>
              <span className="font-semibold">{todayXp} / {state.dailyGoal} XP</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${dayProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🔥" label="连续学习" value={`${state.stats.streak} 天`} color="text-orange-500" bg="bg-orange-50" />
        <StatCard icon="⭐" label="等级" value={`Lv.${level.level}`} color="text-brand-500" bg="bg-brand-50" />
        <StatCard icon="📚" label="掌握单词" value={state.stats.wordsLearned} color="text-emerald-500" bg="bg-emerald-50" />
        <StatCard icon="🏆" label="成就" value={`${state.unlockedAchievements.length} 个`} color="text-amber-500" bg="bg-amber-50" />
      </div>

      {/* 个性化推荐 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">🎯 为你推荐</h3>
          <Link to="/courses" className="text-sm text-brand-600 font-semibold hover:text-brand-700">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map((c) => (
            <Link
              key={c.id}
              to={`/courses/${c.id}`}
              className="card p-5 hover:shadow-cardHover hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 truncate group-hover:text-brand-600 transition">{c.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{c.level} · {c.lessons} 课</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3 line-clamp-2">{c.desc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="badge bg-accent-50 text-accent-600">{c.reason}</span>
                <span className="text-xs text-slate-400">+{c.xp} XP</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 快捷学习入口 */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">⚡ 快速练习</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLink icon="🔤" title="单词记忆" desc="背单词卡片" to={`/learn/${recs[0]?.id || 'en-a1-greetings'}/vocab`} />
          <QuickLink icon="✏️" title="语法练习" desc="选择题练习" to={`/learn/${recs[0]?.id || 'en-a1-greetings'}/grammar`} />
          <QuickLink icon="🎤" title="口语跟读" desc="AI 发音评分" to={`/learn/${recs[0]?.id || 'en-a1-greetings'}/speaking`} />
          <QuickLink icon="🎧" title="听力训练" desc="情景对话" to={`/learn/${recs[0]?.id || 'en-a1-greetings'}/listening`} />
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div className="card p-4">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}

function QuickLink({ icon, title, desc, to }) {
  return (
    <Link to={to} className="card p-5 hover:shadow-cardHover hover:-translate-y-0.5 transition-all text-center group">
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
    </Link>
  )
}
