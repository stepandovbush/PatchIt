'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import PatchItLogo from './PatchItLogo'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    setMenuOpen(false)
  }

  const username = user?.email?.split('@')[0] ?? ''

  const navLink = (href: string, label: string) => {
    const active = pathname === href
    return (
      <a
        href={href}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
          active ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {label}
      </a>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b border-gray-100 z-50">
      <div className="flex items-center justify-between h-14 px-4 lg:px-8">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <PatchItLogo size={32} />
          <span className="font-bold text-gray-900 text-lg tracking-tight">PatchIt</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLink('/', 'Feed')}
          {navLink('/map', 'Map')}
          {navLink('/resources', 'Resources')}
          <a
            href="/report/new"
            className="ml-2 flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Report
          </a>
        </nav>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm uppercase">
                {username[0]}
              </div>
              <span className="hidden sm:block text-sm">{username}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-11 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-40 z-50">
                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-50">{user.email}</div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a href="/auth/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium">Sign in</a>
            <a href="/auth/signup" className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Sign up
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
