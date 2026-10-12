import { useApp, getLevel } from '../store/AppContext.jsx'
import { achievements } from '../data/courses.js'

export default function Achievements() {
  const { state } = useApp()
  const level = getLevel(state.stats.totalXp)
  const unlocked = new Set(state.unlockedAchievements)
  const unlockedCount = state.unlockedAchievements.length
  const totalXpFromAch = state.unlockedAchievements
    .map((id) => achievements.find((a) => a.id === id)?.xp || 0)
    .reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">成就中心</h1>
        <p className="text-slate-500 mt-1">解锁成就，激励自己持续进步</p>
      </div>

      {/* 成就总览 */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">成就进度</p>
              <h2 className="text-3xl font-extrabold mt-1">
                {unlockedCount} / {achievements.length}
              </h2>
              <p className="text-amber-100 text-sm mt-1">已解锁 {Math.round((unlockedCount / achievements.length) * 100)}%</p>
            </div>
            <div className="text-right">
              <p className="text-4xl">🏆</p>
              <p className="text-sm text-amber-100">+{totalXpFromAch} XP</p>
            </div>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 等级进度 */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-extrabold">
            {level.level}
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">Lv.{level.level} · {level.name}</p>
            <p className="text-sm text-slate-400">{state.stats.totalXp} XP 总经验</p>
            {level.next && (
              <>
                <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${level.progress * 100}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  再获得 {level.next.min - state.stats.totalXp} XP 升级到 Lv.{level.next.level}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 成就列表 */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">🎖️ 全部成就</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((a) => {
            const isUnlocked = unlocked.has(a.id)
            return (
              <div
                key={a.id}
                className={`card p-5 flex items-center gap-4 transition-all ${
                  isUnlocked ? 'border-amber-200 bg-amber-50/30' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                    isUnlocked ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-slate-100 grayscale'
                  }`}
                >
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{a.name}</h4>
                    {isUnlocked && <span className="badge bg-amber-100 text-amber-700">已解锁</span>}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{a.desc}</p>
                  <p className="text-xs text-slate-400 mt-1">{a.condition}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-extrabold text-amber-500">+{a.xp}</p>
                  <p className="text-xs text-slate-400">XP</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
