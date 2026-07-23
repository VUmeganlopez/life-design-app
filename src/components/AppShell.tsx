import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const { pathname } = useLocation()
  const hideNav =
    pathname === '/' ||
    pathname.startsWith('/share') ||
    pathname.startsWith('/resume-coach')

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <Outlet />
        {!hideNav && <BottomNav />}
      </div>
    </div>
  )
}
