import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '⌂' },
  { to: '/projects', label: 'Projects', icon: '▦' },
  { to: '/messages', label: 'Messages', icon: '✉' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

function Header({ menuOpen, onToggleMenu }) {
  return (
    <header className="header">
      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <NavLink className="brand" to="/">
        <span className="brand-mark">R</span>
        React App
      </NavLink>

      <nav className="header-menu" aria-label="Header navigation">
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/messages">Messages</NavLink>
      </nav>

      <button className="profile" type="button" aria-label="Open profile">
        <span className="avatar">AD</span>
        <span>Admin</span>
      </button>
    </header>
  )
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Close sidebar" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <nav aria-label="Sidebar navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon" aria-hidden="true">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

function Page({ title, text }) {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Page title="Dashboard" text="Welcome to your React dashboard." />} />
          <Route path="/projects" element={<Page title="Projects" text="Your project list will appear here." />} />
          <Route path="/messages" element={<Page title="Messages" text="You have no unread messages." />} />
          <Route path="/settings" element={<Page title="Settings" text="Manage your account and preferences." />} />
          <Route path="*" element={<Page title="404" text="The page you requested could not be found." />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>© 2026 React App</span>
        <span>Built with React Router</span>
      </footer>
    </div>
  )
}

export default App
