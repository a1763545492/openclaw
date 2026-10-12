import { createContext, useContext, useEffect, useReducer } from 'react'
import { achievements as allAchievements } from '../data/courses.js'

const STORAGE_KEY = 'linguaverse_state_v1'

const initialState = {
  user: null, // { username, email, avatar, createdAt }
  // 学习语言偏好
  activeLang: 'en',
  // 学习进度 { courseId: { completedLessons, xp, lastStudied } }
  progress: {},
  // 学习统计
  stats: {
    totalXp: 0,
    streak: 0,
    lastStudyDate: null,
    wordsLearned: 0,
    grammarDone: 0,
    speakingDone: 0,
    listeningDone: 0,
    coursesCompleted: 0,
    languagesLearned: ['en'],
  },
  // 已解锁成就 id 列表
  unlockedAchievements: [],
  // 社区点赞
  likedPosts: [],
  // 每日目标
  dailyGoal: 20, // XP
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    return { ...initialState, ...JSON.parse(raw) }
  } catch {
    return initialState
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function checkAchievements(state) {
  const unlocked = new Set(state.unlockedAchievements)
  const s = state.stats
  const newly = []
  const checks = [
    ['first-lesson', s.coursesCompleted >= 1],
    ['streak-3', s.streak >= 3],
    ['streak-7', s.streak >= 7],
    ['vocab-50', s.wordsLearned >= 50],
    ['vocab-200', s.wordsLearned >= 200],
    ['grammar-10', s.grammarDone >= 10],
    ['speak-5', s.speakingDone >= 5],
    ['listen-5', s.listeningDone >= 5],
    ['multi-lang', s.languagesLearned.length >= 2],
  ]
  checks.forEach(([id, ok]) => {
    if (ok && !unlocked.has(id)) {
      unlocked.add(id)
      newly.push(allAchievements.find((a) => a.id === id))
    }
  })
  return { unlocked: [...unlocked], newly }
}

function reducer(state, action) {
  switch (action.type) {
    case 'REGISTER':
    case 'LOGIN': {
      const user = action.payload
      return { ...state, user }
    }
    case 'LOGOUT':
      return { ...initialState }
    case 'SET_LANG':
      return { ...state, activeLang: action.payload }
    case 'COMPLETE_LESSON': {
      const { courseId, xp = 20, type } = action.payload
      const prev = state.progress[courseId] || { completedLessons: 0, xp: 0, lastStudied: null }
      const progress = {
        ...state.progress,
        [courseId]: {
          completedLessons: prev.completedLessons + 1,
          xp: prev.xp + xp,
          lastStudied: new Date().toISOString(),
        },
      }
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const lastDate = state.stats.lastStudyDate
      let streak = state.stats.streak
      if (lastDate !== today) {
        streak = lastDate === yesterday ? streak + 1 : 1
      }
      const langSet = new Set(state.stats.languagesLearned)
      langSet.add(state.activeLang)
      const stats = {
        ...state.stats,
        totalXp: state.stats.totalXp + xp,
        streak,
        lastStudyDate: today,
        wordsLearned: state.stats.wordsLearned + (type === 'vocab' ? 1 : 0),
        grammarDone: state.stats.grammarDone + (type === 'grammar' ? 1 : 0),
        speakingDone: state.stats.speakingDone + (type === 'speaking' ? 1 : 0),
        listeningDone: state.stats.listeningDone + (type === 'listening' ? 1 : 0),
        languagesLearned: [...langSet],
      }
      return { ...state, progress, stats }
    }
    case 'CHECK_ACHIEVEMENTS': {
      const { unlocked } = checkAchievements(state)
      return { ...state, unlockedAchievements: unlocked }
    }
    case 'TOGGLE_LIKE_POST': {
      const id = action.payload
      const liked = state.likedPosts.includes(id)
        ? state.likedPosts.filter((p) => p !== id)
        : [...state.likedPosts, id]
      return { ...state, likedPosts: liked }
    }
    case 'SET_DAILY_GOAL':
      return { ...state, dailyGoal: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  // 自动检查成就
  useEffect(() => {
    const { newly } = checkAchievements(state)
    if (newly.length > 0) {
      dispatch({ type: 'CHECK_ACHIEVEMENTS' })
    }
  }, [state.stats])

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// 等级计算
export function getLevel(xp) {
  const levels = [
    { level: 1, min: 0, name: '初学者' },
    { level: 2, min: 100, name: '入门学徒' },
    { level: 3, min: 300, name: '语言探索者' },
    { level: 4, min: 700, name: '进阶学习者' },
    { level: 5, min: 1500, name: '语言达人' },
    { level: 6, min: 3000, name: '语言大师' },
    { level: 7, min: 6000, name: '多语通' },
    { level: 8, min: 10000, name: '语言宗师' },
  ]
  let cur = levels[0]
  for (const l of levels) {
    if (xp >= l.min) cur = l
  }
  const next = levels.find((l) => l.min > xp)
  const progress = next ? (xp - cur.min) / (next.min - cur.min) : 1
  return { ...cur, next, progress }
}

// 个性化推荐：基于学习历史和弱项推荐课程
export function getRecommendations(state, courses) {
  const recs = []
  const activeLang = state.activeLang
  // 1. 同语言同级别未完成的课程
  const langCourses = courses.filter((c) => c.lang === activeLang)
  langCourses.forEach((c) => {
    if (!state.progress[c.id] || state.progress[c.id].completedLessons < c.lessons) {
      recs.push({ ...c, reason: '继续学习', priority: 1 })
    }
  })
  // 2. 如果同语言没课了，推荐下一级别
  if (recs.length < 3) {
    const allLang = courses.filter((c) => c.lang === activeLang)
    allLang.forEach((c) => {
      if (!recs.find((r) => r.id === c.id)) recs.push({ ...c, reason: '推荐课程', priority: 2 })
    })
  }
  // 3. 如果只学了一种语言很久，推荐尝试其他语言
  if (state.stats.languagesLearned.length === 1 && state.stats.totalXp > 200) {
    const otherLang = courses.find((c) => c.lang !== activeLang)
    if (otherLang) recs.push({ ...otherLang, reason: '探索新语言', priority: 3 })
  }
  return recs.sort((a, b) => a.priority - b.priority).slice(0, 6)
}
