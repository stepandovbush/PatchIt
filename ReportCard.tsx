'use client'
import { Report } from '@/lib/types'
import { timeAgo, statusLabel, statusColor, computeSeverity } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function ReportCard({ report }: { report: Report }) {
  const router = useRouter()
  const username = report.profiles?.username ?? 'unknown'
  const severity = computeSeverity(report)

  return (
    <div
      onClick={() => router.push(`/report/${report.id}`)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
    >
      {/* ── Photo with overlaid text ── */}
      <div className="relative h-52 bg-gray-100">
        {report.media_url && report.media_type === 'image' ? (
          <img
            src={report.media_url}
            alt={report.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : report.media_url && report.media_type === 'pdf' ? (
          <div className="w-full h-full flex items-center justify-center bg-red-50 gap-3">
            <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span className="text-sm font-medium text-red-400">PDF Report</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        )}

        {/* Gradient — strong dark band at the very bottom so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"/>

        {/* Status badge — top-right, always white so it reads over any photo */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white shadow-sm ${
            report.status === 'open'        ? 'text-red-600'   :
            report.status === 'in_progress' ? 'text-amber-600' :
                                              'text-green-600'
          }`}>
            {statusLabel(report.status)}
          </span>
        </div>

        {/* Severity badge — top-left, always shown */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow ${
            severity === 'critical' ? 'bg-red-500/90 text-white' :
            severity === 'severe'   ? 'bg-orange-500/90 text-white' :
            severity === 'moderate' ? 'bg-amber-400/90 text-white' :
            'bg-emerald-500/90 text-white'
          }`}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </span>
        </div>

        {/* Text block sits on the darkened bottom band */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <h2 className="font-bold text-white text-[14px] leading-snug line-clamp-2 break-words drop-shadow">
            {report.title}
          </h2>
          {report.address && (
            <p className="text-orange-300 text-xs mt-1 flex items-center gap-1 drop-shadow">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              <span className="truncate">{report.address}</span>
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px] font-bold uppercase shrink-0">
            {username[0]}
          </div>
          <span className="text-xs text-gray-400 truncate">@{username} · {timeAgo(report.created_at)}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-400 shrink-0 ml-2">
          <span className="flex items-center gap-0.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
            </svg>
            {report.upvote_count ?? 0}
          </span>
          <span className="flex items-center gap-0.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            {report.comment_count ?? 0}
          </span>
        </div>
      </div>
    </div>
  )
}
