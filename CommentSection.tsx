'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Comment } from '@/lib/types'
import { timeAgo } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CommentSection({ reportId }: { reportId: string }) {
  const { user } = useAuth()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from('comments')
      .select('*, profiles(username)')
      .eq('report_id', reportId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setComments(data as Comment[])
      })

    const channel = supabase
      .channel(`comments-${reportId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `report_id=eq.${reportId}` },
        async (payload) => {
          const { data } = await supabase
            .from('comments')
            .select('*, profiles(username)')
            .eq('id', payload.new.id)
            .single()
          if (data) setComments((prev) => [...prev, data as Comment])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [reportId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  const send = async () => {
    if (!text.trim()) return
    if (!user) { router.push('/auth/login'); return }
    setSending(true)
    await supabase.from('comments').insert({ report_id: reportId, user_id: user.id, content: text.trim() })
    setText('')
    setSending(false)
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3">
        Comments <span className="text-gray-400 font-normal text-sm">({comments.length})</span>
      </h3>

      <div className="space-y-3 mb-4">
        {comments.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No comments yet. Be the first!</p>
        )}
        {comments.map((c) => {
          const isMe = c.user_id === user?.id
          return (
            <div key={c.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-semibold uppercase shrink-0">
                {(c.profiles?.username ?? 'u')[0]}
              </div>
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm break-words ${
                    isMe
                      ? 'bg-orange-500 text-white rounded-tr-sm'
                      : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                  }`}
                >
                  {c.content}
                </div>
                <span className="text-xs text-gray-400 px-1">
                  {isMe ? 'you' : `@${c.profiles?.username}`} · {timeAgo(c.created_at)}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 items-end">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder={user ? 'Say something...' : 'Sign in to comment'}
          disabled={!user}
          className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={!text.trim() || sending}
          className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white disabled:opacity-40 shrink-0"
        >
          <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
