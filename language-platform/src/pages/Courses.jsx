import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'
import { courses, languages } from '../data/courses.js'

export default function Courses() {
  const { state } = useApp()
  const [selectedLang, setSelectedLang] = useState(state.activeLang)
  const [selectedLevel, setSelectedLevel] = useState('all')

  const lang = languages.find((l) => l.id === selectedLang)
  const filtered = courses.filter(
    (c) => c.lang === selectedLang && (selectedLevel === 'all' || c.level === selectedLevel),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">课程中心</h1>
        <p className="text-slate-500 mt-1">分级课程体系，从入门到精通</p>
      </div>

      {/* 语言切换 */}
      <div className="flex flex-wrap gap-2">
        {languages.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setSelectedLang(l.id)
              setSelectedLevel('all')
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
              selectedLang === l.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{l.flag}</span> {l.name}
          </button>
        ))}
      </div>

      {/* 级别筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedLevel('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            selectedLevel === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          全部级别
        </button>
        {lang?.levels.map((lv) => (
          <button
            key={lv.id}
            onClick={() => setSelectedLevel(lv.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedLevel === lv.id
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {lv.id} · {lv.name}
          </button>
        ))}
      </div>

      {/* 级别说明 */}
      {selectedLevel !== 'all' && (
        <div className="card p-4 bg-brand-50/50 border-brand-100">
          <p className="text-sm text-slate-700">
            <span className="font-bold">{selectedLevel}</span> ·{' '}
            {lang?.levels.find((l) => l.id === selectedLevel)?.desc}
          </p>
        </div>
      )}

      {/* 课程列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            <div className="text-5xl mb-3">📭</div>
            <p>该级别暂无课程</p>
          </div>
        ) : (
          filtered.map((c) => {
            const prog = state.progress[c.id]
            const pct = prog ? Math.round((prog.completedLessons / c.lessons) * 100) : 0
            return (
              <Link
                key={c.id}
                to={`/courses/${c.id}`}
                className="card p-5 hover:shadow-cardHover hover:-translate-y-0.5 transition-all group flex flex-col"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-3xl flex-shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition">{c.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge bg-slate-100 text-slate-600">{c.level}</span>
                      <span className="text-xs text-slate-400">{c.lessons} 课 · {c.duration} 分钟</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-3 line-clamp-2 flex-1">{c.desc}</p>

                {pct > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">进度</span>
                      <span className="font-semibold text-brand-600">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex gap-1">
                    {c.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[11px] text-slate-400">#{t}</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-accent-600">+{c.xp} XP</span>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
