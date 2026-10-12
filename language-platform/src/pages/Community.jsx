import { useState } from 'react'
import { useApp } from '../store/AppContext.jsx'
import { communityPosts, languages } from '../data/courses.js'

export default function Community() {
  const { state, dispatch } = useApp()
  const [filter, setFilter] = useState('all')
  const [showCompose, setShowCompose] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', tag: '学习方法' })
  const [posts, setPosts] = useState(communityPosts)

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.lang === filter)

  const handleLike = (id) => {
    dispatch({ type: 'TOGGLE_LIKE_POST', payload: id })
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: state.likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 }
          : p,
      ),
    )
  }

  const submitPost = () => {
    if (!newPost.title.trim()) return
    const post = {
      id: Date.now(),
      author: state.user?.username || '匿名',
      avatar: '🧑‍🎓',
      lang: state.activeLang,
      level: 'A1',
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      time: '刚刚',
      tag: newPost.tag,
    }
    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', tag: '学习方法' })
    setShowCompose(false)
  }

  const langName = (id) => languages.find((l) => l.id === id)?.name || id

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">学习社区</h1>
          <p className="text-slate-500 mt-1">与全球学习者交流心得</p>
        </div>
        <button onClick={() => setShowCompose(!showCompose)} className="btn-primary">
          ✏️ 发帖
        </button>
      </div>

      {/* 发帖框 */}
      {showCompose && (
        <div className="card p-5 animate-fade-in">
          <input
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="input mb-3"
            placeholder="标题：分享你的学习心得..."
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="input mb-3 min-h-[100px] resize-none"
            placeholder="写下你的内容..."
          />
          <div className="flex items-center justify-between">
            <select
              value={newPost.tag}
              onChange={(e) => setNewPost({ ...newPost, tag: e.target.value })}
              className="input w-auto py-2"
            >
              {['学习方法', '语法', '词汇', '趣味学习', '打卡激励', '问题求助'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setShowCompose(false)} className="btn-secondary">取消</button>
              <button onClick={submitPost} className="btn-primary">发布</button>
            </div>
          </div>
        </div>
      )}

      {/* 语言筛选 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>全部</FilterBtn>
        {languages.map((l) => (
          <FilterBtn key={l.id} active={filter === l.id} onClick={() => setFilter(l.id)}>
            {l.flag} {l.name}
          </FilterBtn>
        ))}
      </div>

      {/* 帖子列表 */}
      <div className="space-y-4">
        {filtered.map((p) => {
          const liked = state.likedPosts.includes(p.id)
          return (
            <div key={p.id} className="card p-5 hover:shadow-cardHover transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900">{p.author}</span>
                    <span className="badge bg-slate-100 text-slate-500">{langName(p.lang)} {p.level}</span>
                    <span className="badge bg-brand-50 text-brand-600">{p.tag}</span>
                    <span className="text-xs text-slate-400 ml-auto">{p.time}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mt-2 hover:text-brand-600 cursor-pointer">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-3">{p.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleLike(p.id)}
                      className={`flex items-center gap-1.5 text-sm transition ${liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                    >
                      {liked ? '❤️' : '🤍'} {p.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-500">
                      💬 {p.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-500">
                      🔗 分享
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition flex-shrink-0 ${
        active ? 'bg-brand-600 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}
