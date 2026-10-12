import { useApp, getLevel } from '../store/AppContext.jsx'
import { courses, languages } from '../data/courses.js'

export default function Progress() {
  const { state } = useApp()
  const level = getLevel(state.stats.totalXp)

  // 各语言学习时长
  const langStats = languages.map((l) => {
    const langCourses = courses.filter((c) => c.lang === l.id)
    const studied = langCourses.filter((c) => state.progress[c.id])
    const xp = studied.reduce((sum, c) => sum + (state.progress[c.id]?.xp || 0), 0)
    return { ...l, xp, courseCount: studied.length }
  })

  // 近 7 天 XP（模拟数据 + 真实数据混合）
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000)
    const today = new Date().toDateString()
    const isToday = date.toDateString() === today
    return {
      day: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
      xp: isToday ? state.stats.totalXp % 100 : Math.floor(Math.random() * 60) + 20,
    }
  })
  const maxXp = Math.max(...weekData.map((d) => d.xp), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">学习进度</h1>
        <p className="text-slate-500 mt-1">追踪你的学习旅程</p>
      </div>

      {/* 等级与总览 */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-brand-100 text-sm">当前等级</p>
              <h2 className="text-3xl font-extrabold">Lv.{level.level} · {level.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold">{state.stats.totalXp}</p>
              <p className="text-brand-200 text-sm">总 XP</p>
            </div>
          </div>
          {level.next && (
            <>
              <div className="flex justify-between text-xs mb-2">
                <span>距离 Lv.{level.next.level}</span>
                <span>{level.next.min - state.stats.totalXp} XP</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full"
                  style={{ width: `${level.progress * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox icon="🔥" label="连续学习" value={`${state.stats.streak} 天`} color="text-orange-500" />
        <StatBox icon="📚" label="掌握单词" value={state.stats.wordsLearned} color="text-blue-500" />
        <StatBox icon="✏️" label="语法练习" value={state.stats.grammarDone} color="text-emerald-500" />
        <StatBox icon="🎤" label="口语练习" value={state.stats.speakingDone} color="text-orange-500" />
        <StatBox icon="🎧" label="听力训练" value={state.stats.listeningDone} color="text-purple-500" />
        <StatBox icon="📖" label="完成课时" value={Object.values(state.progress).reduce((s, p) => s + p.completedLessons, 0)} color="text-brand-500" />
        <StatBox icon="🌍" label="学习语言" value={state.stats.languagesLearned.length} color="text-cyan-500" />
        <StatBox icon="🏆" label="成就解锁" value={state.unlockedAchievements.length} color="text-amber-500" />
      </div>

      {/* 近 7 天 XP */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">📈 近 7 天学习</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{d.xp}</span>
              <div
                className="w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg transition-all hover:from-brand-600 hover:to-brand-500"
                style={{ height: `${(d.xp / maxXp) * 100}%`, minHeight: '8px' }}
              />
              <span className="text-xs text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 各语言进度 */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">🌐 各语言学习进度</h3>
        <div className="space-y-4">
          {langStats.map((l) => (
            <div key={l.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{l.flag}</span>
                  <span className="font-semibold text-slate-700">{l.name}</span>
                  <span className="text-xs text-slate-400">{l.courseCount} 门课</span>
                </div>
                <span className="text-sm font-bold text-brand-600">{l.xp} XP</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
                  style={{ width: `${Math.min(100, (l.xp / 500) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 课程进度详情 */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">📖 课程学习记录</h3>
        {Object.keys(state.progress).length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">还没有学习记录，去课程中心开始学习吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(state.progress).map(([cid, p]) => {
              const c = courses.find((x) => x.id === cid)
              if (!c) return null
              const pct = Math.round((p.completedLessons / c.lessons) * 100)
              return (
                <div key={cid} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{c.title}</p>
                    <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-brand-600">{pct}%</p>
                    <p className="text-xs text-slate-400">{p.xp} XP</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function StatBox({ icon, label, value, color }) {
  return (
    <div className="card p-4">
      <div className={`text-2xl mb-1`}>{icon}</div>
      <p className={`text-xl font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}
