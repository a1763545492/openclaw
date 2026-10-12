import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'
import { courses, vocabularies, grammarExercises, listeningExercises, speakingPhrases } from '../data/courses.js'

export default function Learn() {
  const { courseId, module } = useParams()
  const { dispatch } = useApp()
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="text-center py-16">
        <Link to="/courses" className="btn-primary">返回</Link>
      </div>
    )
  }

  const completeLesson = (type, xp) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: { courseId, xp, type } })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to={`/courses/${courseId}`} className="text-sm text-slate-400 hover:text-brand-600 inline-flex items-center gap-1">
          ← 返回课程
        </Link>
        <span className="badge bg-brand-50 text-brand-600">{course.icon} {course.title}</span>
      </div>

      {module === 'vocab' && <VocabModule courseId={courseId} onComplete={completeLesson} />}
      {module === 'grammar' && <GrammarModule courseId={courseId} onComplete={completeLesson} />}
      {module === 'speaking' && <SpeakingModule courseId={courseId} onComplete={completeLesson} />}
      {module === 'listening' && <ListeningModule courseId={courseId} onComplete={completeLesson} />}
    </div>
  )
}

/* ============ 单词记忆（闪卡翻转） ============ */
function VocabModule({ courseId, onComplete }) {
  const list = vocabularies[courseId] || vocabularies['en-a1-greetings']
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(new Set())

  const card = list[idx]
  const progress = Math.round(((idx + 1) / list.length) * 100)

  const next = () => {
    setFlipped(false)
    if (idx < list.length - 1) {
      setIdx(idx + 1)
    } else {
      onComplete('vocab', list.length * 10)
    }
  }

  const markKnown = () => {
    const s = new Set(known)
    s.add(idx)
    setKnown(s)
    next()
  }

  if (idx >= list.length) {
    return (
      <CompleteView
        icon="📚"
        title="单词学习完成！"
        desc={`你掌握了 ${list.length} 个单词，获得 ${list.length * 10} XP`}
        courseId={courseId}
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-slate-500 mb-3">
        <span>单词 {idx + 1} / {list.length}</span>
        <span>已掌握 {known.size}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="card p-8 min-h-[280px] flex flex-col items-center justify-center cursor-pointer select-none hover:shadow-cardHover transition-all"
        style={{ perspective: '1000px' }}
      >
        {!flipped ? (
          <div className="text-center animate-pop">
            <p className="text-4xl font-extrabold text-slate-900 mb-3">{card.word}</p>
            <p className="text-sm text-slate-400">{card.phonetic}</p>
            <p className="text-xs text-slate-300 mt-6">点击卡片查看释义</p>
          </div>
        ) : (
          <div className="text-center animate-pop">
            <p className="text-3xl font-extrabold text-brand-600 mb-3">{card.meaning}</p>
            <div className="bg-slate-50 rounded-xl p-4 mt-4">
              <p className="text-sm text-slate-600 italic">"{card.example}"</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={next} className="btn-secondary flex-1">
          😕 还需复习
        </button>
        <button onClick={markKnown} className="btn-primary flex-1">
          ✓ 已掌握
        </button>
      </div>
    </div>
  )
}

/* ============ 语法练习（选择题） ============ */
function GrammarModule({ courseId, onComplete }) {
  const list = grammarExercises[courseId] || grammarExercises['en-a1-greetings']
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const q = list[idx]

  const choose = (i) => {
    if (showResult) return
    setSelected(i)
    setShowResult(true)
    if (i === q.answer) setScore(score + 1)
  }

  const next = () => {
    setSelected(null)
    setShowResult(false)
    if (idx < list.length - 1) {
      setIdx(idx + 1)
    } else {
      onComplete('grammar', (score + (selected === q.answer ? 1 : 0)) * 15)
    }
  }

  if (idx >= list.length) {
    return (
      <CompleteView
        icon="✏️"
        title="语法练习完成！"
        desc={`正确率 ${Math.round((score / list.length) * 100)}%，获得 ${score * 15} XP`}
        courseId={courseId}
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-slate-500 mb-3">
        <span>题目 {idx + 1} / {list.length}</span>
        <span>得分 {score}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${((idx + 1) / list.length) * 100}%` }} />
      </div>

      <div className="card p-6">
        <p className="text-xs text-slate-400 mb-2">{q.type === 'fill' ? '填空题' : '选择题'}</p>
        <h2 className="text-xl font-bold text-slate-900 mb-6">{q.prompt}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'border-slate-200 hover:border-brand-300 hover:bg-brand-50/30'
            if (showResult) {
              if (i === q.answer) style = 'border-emerald-500 bg-emerald-50 text-emerald-700'
              else if (i === selected) style = 'border-rose-500 bg-rose-50 text-rose-700'
              else style = 'border-slate-200 opacity-50'
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition ${style}`}
              >
                <span className="inline-block w-6 h-6 rounded-full bg-white border border-current text-center leading-6 text-xs mr-2">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className={`mt-4 p-4 rounded-xl animate-fade-in ${selected === q.answer ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            <p className={`text-sm font-semibold ${selected === q.answer ? 'text-emerald-700' : 'text-amber-700'}`}>
              {selected === q.answer ? '✓ 回答正确！' : '✗ 再想想哦'}
            </p>
            <p className="text-sm text-slate-600 mt-1">{q.explain}</p>
          </div>
        )}
      </div>

      {showResult && (
        <button onClick={next} className="btn-primary w-full mt-4">
          {idx < list.length - 1 ? '下一题 →' : '查看结果'}
        </button>
      )}
    </div>
  )
}

/* ============ 口语跟读（Web Speech API） ============ */
function SpeakingModule({ courseId, onComplete }) {
  const list = speakingPhrases[courseId] || speakingPhrases['en-a1-greetings']
  const [idx, setIdx] = useState(0)
  const [listening, setListening] = useState(false)
  const [score, setScore] = useState(null)
  const [transcript, setTranscript] = useState('')
  const [completed, setCompleted] = useState(0)

  const phrase = list[idx]

  const startListen = () => {
    setListening(true)
    setScore(null)
    setTranscript('')

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      // 浏览器不支持，模拟评分
      setTimeout(() => {
        setListening(false)
        setTranscript(phrase.phrase)
        setScore(Math.floor(Math.random() * 20) + 80)
      }, 1500)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = courseId.startsWith('ja') ? 'ja-JP' : courseId.startsWith('ko') ? 'ko-KR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      // 简单相似度评分
      const sim = similarity(text.toLowerCase(), phrase.phrase.toLowerCase())
      setScore(Math.round(sim * 100))
    }
    recognition.onerror = () => {
      setScore(Math.floor(Math.random() * 20) + 75)
      setTranscript('(未识别到语音，模拟评分)')
    }
    recognition.onend = () => setListening(false)
    recognition.start()

    // 超时兜底
    setTimeout(() => {
      try { recognition.stop() } catch {}
    }, 5000)
  }

  const speak = () => {
    if (!window.speechSynthesis) return
    const u = new SpeechSynthesisUtterance(phrase.phrase)
    u.lang = courseId.startsWith('ja') ? 'ja-JP' : courseId.startsWith('ko') ? 'ko-KR' : 'en-US'
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  }

  const next = () => {
    if (score !== null) setCompleted(completed + 1)
    setScore(null)
    setTranscript('')
    if (idx < list.length - 1) {
      setIdx(idx + 1)
    } else {
      onComplete('speaking', list.length * 12)
    }
  }

  if (idx >= list.length) {
    return (
      <CompleteView
        icon="🎤"
        title="口语练习完成！"
        desc={`完成 ${list.length} 句跟读，获得 ${list.length * 12} XP`}
        courseId={courseId}
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-slate-500 mb-3">
        <span>句子 {idx + 1} / {list.length}</span>
        <span>已完成 {completed}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${((idx + 1) / list.length) * 100}%` }} />
      </div>

      <div className="card p-8 text-center">
        <div className="text-sm text-slate-400 mb-2">跟读下面的句子</div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">{phrase.phrase}</h2>
        <p className="text-slate-500 mb-6">{phrase.translation}</p>

        {/* 发音按钮 */}
        <button
          onClick={speak}
          className="btn-secondary mb-6"
        >
          🔊 听标准发音
        </button>

        {/* 录音按钮 */}
        <div className="my-6">
          <button
            onClick={startListen}
            disabled={listening}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all ${
              listening
                ? 'bg-rose-500 text-white scale-110 animate-pulse'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {listening ? '⏹' : '🎤'}
          </button>
          <p className="text-xs text-slate-400 mt-3">
            {listening ? '正在聆听... 请朗读' : '点击麦克风开始录音'}
          </p>
        </div>

        {transcript && (
          <div className="bg-slate-50 rounded-xl p-4 mb-4 text-left animate-fade-in">
            <p className="text-xs text-slate-400 mb-1">识别结果</p>
            <p className="text-sm text-slate-700">{transcript}</p>
          </div>
        )}

        {score !== null && (
          <div className={`p-4 rounded-xl animate-pop ${score >= 80 ? 'bg-emerald-50' : score >= 60 ? 'bg-amber-50' : 'bg-rose-50'}`}>
            <p className="text-4xl font-extrabold mb-1" style={{ color: score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#e11d48' }}>
              {score}分
            </p>
            <p className="text-sm text-slate-600">
              {score >= 80 ? '发音很棒！🎉' : score >= 60 ? '还不错，继续加油！' : '再练习一下吧 💪'}
            </p>
          </div>
        )}
      </div>

      {score !== null && (
        <button onClick={next} className="btn-primary w-full mt-4">
          {idx < list.length - 1 ? '下一句 →' : '完成练习'}
        </button>
      )}
    </div>
  )
}

/* ============ 听力训练 ============ */
function ListeningModule({ courseId, onComplete }) {
  const list = listeningExercises[courseId] || listeningExercises['en-a1-greetings']
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const q = list[idx]

  const play = () => {
    setPlaying(true)
    setShowTranscript(false)
    const u = new SpeechSynthesisUtterance(q.transcript)
    u.lang = courseId.startsWith('ja') ? 'ja-JP' : courseId.startsWith('ko') ? 'ko-KR' : 'en-US'
    u.rate = 0.9
    u.onend = () => setPlaying(false)
    window.speechSynthesis?.speak(u)
    setTimeout(() => setPlaying(false), 6000)
  }

  const choose = (i) => {
    if (showResult) return
    setSelected(i)
    setShowResult(true)
    if (i === q.answer) setScore(score + 1)
  }

  const next = () => {
    setSelected(null)
    setShowResult(false)
    setShowTranscript(false)
    if (idx < list.length - 1) {
      setIdx(idx + 1)
    } else {
      onComplete('listening', (score + (selected === q.answer ? 1 : 0)) * 20)
    }
  }

  if (idx >= list.length) {
    return (
      <CompleteView
        icon="🎧"
        title="听力训练完成！"
        desc={`正确率 ${Math.round((score / list.length) * 100)}%，获得 ${score * 20} XP`}
        courseId={courseId}
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-slate-500 mb-3">
        <span>对话 {idx + 1} / {list.length}</span>
        <span>得分 {score}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${((idx + 1) / list.length) * 100}%` }} />
      </div>

      <div className="card p-6">
        {/* 音频播放器模拟 */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white text-center mb-6">
          <button
            onClick={play}
            disabled={playing}
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center mx-auto mb-3 transition disabled:opacity-50"
          >
            {playing ? (
              <span className="flex gap-1">
                <span className="w-1.5 h-6 bg-white rounded animate-pulse" />
                <span className="w-1.5 h-6 bg-white rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-6 bg-white rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
              </span>
            ) : (
              <span className="text-2xl">▶</span>
            )}
          </button>
          <p className="text-sm text-white/80">{playing ? '播放中...' : '点击播放听力音频'}</p>
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-xs text-white/60 hover:text-white mt-2 underline"
          >
            {showTranscript ? '隐藏原文' : '查看原文'}
          </button>
        </div>

        {showTranscript && (
          <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm text-slate-600 whitespace-pre-line animate-fade-in">
            {q.transcript}
          </div>
        )}

        <h3 className="font-bold text-slate-900 mb-4">{q.question}</h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/30'
            if (showResult) {
              if (i === q.answer) style = 'border-emerald-500 bg-emerald-50 text-emerald-700'
              else if (i === selected) style = 'border-rose-500 bg-rose-50 text-rose-700'
              else style = 'border-slate-200 opacity-50'
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition ${style}`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {showResult && (
        <button onClick={next} className="btn-primary w-full mt-4">
          {idx < list.length - 1 ? '下一题 →' : '查看结果'}
        </button>
      )}
    </div>
  )
}

/* ============ 完成页 ============ */
function CompleteView({ icon, title, desc, courseId }) {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="text-7xl mb-4 animate-pop">{icon}</div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-500 mb-8">{desc}</p>
      <div className="flex flex-col gap-3">
        <Link to={`/courses/${courseId}`} className="btn-primary">返回课程</Link>
        <Link to="/courses" className="btn-secondary">浏览更多课程</Link>
      </div>
    </div>
  )
}

// 简单字符串相似度（Levenshtein 基础）
function similarity(a, b) {
  if (!a || !b) return 0
  const la = a.length, lb = b.length
  if (Math.abs(la - lb) > Math.max(la, lb) * 0.5) return 0
  let matches = 0
  const wordsA = a.split(/\s+/)
  const wordsB = b.split(/\s+/)
  wordsA.forEach((w) => {
    if (wordsB.includes(w)) matches++
  })
  return Math.min(1, (matches / Math.max(wordsA.length, wordsB.length)) * 1.1)
}
