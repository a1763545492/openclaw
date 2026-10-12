import { Link, useParams } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'
import { courses, languages } from '../data/courses.js'

const modules = [
  { id: 'vocab', name: '单词记忆', icon: '🔤', desc: '通过闪卡记忆核心词汇', color: 'from-blue-500 to-blue-600' },
  { id: 'grammar', name: '语法练习', icon: '✏️', desc: '选择题巩固语法要点', color: 'from-emerald-500 to-emerald-600' },
  { id: 'speaking', name: '口语跟读', icon: '🎤', desc: 'AI 实时发音评分', color: 'from-orange-500 to-orange-600' },
  { id: 'listening', name: '听力训练', icon: '🎧', desc: '情景对话听力理解', color: 'from-purple-500 to-purple-600' },
]

export default function CourseDetail() {
  const { courseId } = useParams()
  const { state } = useApp()
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-slate-500">课程不存在</p>
        <Link to="/courses" className="btn-primary mt-4 inline-flex">返回课程列表</Link>
      </div>
    )
  }

  const lang = languages.find((l) => l.id === course.lang)
  const prog = state.progress[course.id]
  const pct = prog ? Math.round((prog.completedLessons / course.lessons) * 100) : 0

  return (
    <div className="space-y-6">
      <Link to="/courses" className="text-sm text-slate-400 hover:text-brand-600 inline-flex items-center gap-1">
        ← 返回课程列表
      </Link>

      {/* 课程头部 */}
      <div className="card overflow-hidden">
        <div className={`bg-gradient-to-br ${modules[0].color} p-6 md:p-8 text-white`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl flex-shrink-0">
              {course.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge bg-white/20 text-white">{lang?.flag} {lang?.name}</span>
                <span className="badge bg-white/20 text-white">{course.level}</span>
                {course.tags.map((t) => (
                  <span key={t} className="badge bg-white/10 text-white">#{t}</span>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-2">{course.title}</h1>
              <p className="text-white/80 mt-2">{course.desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-extrabold">{course.lessons}</p>
              <p className="text-xs text-white/70">课时</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{course.duration}m</p>
              <p className="text-xs text-white/70">预计时长</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{course.xp}</p>
              <p className="text-xs text-white/70">可获 XP</p>
            </div>
          </div>
        </div>

        {pct > 0 && (
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">学习进度</span>
              <span className="font-bold text-brand-600">{prog?.completedLessons || 0} / {course.lessons} 课 ({pct}%)</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* 学习模块 */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">学习模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Link
              key={m.id}
              to={`/learn/${course.id}/${m.id}`}
              className="card p-5 hover:shadow-cardHover hover:-translate-y-0.5 transition-all group flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {m.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition">{m.name}</h3>
                <p className="text-sm text-slate-400">{m.desc}</p>
              </div>
              <span className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
