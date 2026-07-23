import { NavLink } from 'react-router-dom'
import { Compass, Heart, Home, Map, Users } from 'lucide-react'

const items = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/pathways', label: 'Pathways', icon: Map },
  { to: '/values', label: 'Values', icon: Heart },
  { to: '/stories', label: 'Stories', icon: Users },
  { to: '/journey', label: 'Journey', icon: Compass },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <Icon aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
