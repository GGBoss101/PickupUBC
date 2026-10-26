import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { sprites } from '../assets/sprites.js'
import { links } from '../data/siteData.js'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/statistics', label: 'Stats' },
  { to: '/about', label: 'About' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu and jump back to the top whenever the route changes,
  // since this single-page app doesn't do a full page reload between pages.
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <Link to="/" className="logo-container">
            <img className="logo" src={sprites.logoTv} alt="" />
            <span className="club-name">Pickup<span>UBC</span></span>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>

          <ul id="nav-menu" className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav-link">{item.label}</NavLink>
              </li>
            ))}
            <li>
              <a className="btn btn-small nav-cta" href={links.mailingList} target="_blank" rel="noopener noreferrer">Join</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="ground" aria-hidden="true" />
        <div className="footer-content container">
          <div className="footer-brand">
            <img src={sprites.logoTv} alt="" />
            <div>
              <p className="footer-title">Continue?</p>
              <p>Making the world cleaner, one cleanup at a time.</p>
            </div>
          </div>
          <ul className="social-links">
            <li><a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={links.email}>Email</a></li>
            <li><a href={links.ams} target="_blank" rel="noopener noreferrer">AMS Page</a></li>
            <li><a href={links.mailingList} target="_blank" rel="noopener noreferrer">Mailing List</a></li>
          </ul>
          <p className="copyright">&copy; {new Date().getFullYear()} Pickup UBC · An AMS club at the University of British Columbia</p>
        </div>
      </footer>
    </>
  )
}
