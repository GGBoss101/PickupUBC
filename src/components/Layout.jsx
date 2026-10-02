import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes. Without this, the menu
  // would stay open after tapping a link, because this single-page app no
  // longer does a full page reload between pages (which used to reset it).
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo-container">
            <div className="logo">
              <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="Pickup UBC Logo" />
            </div>
            <span className="club-name">Pickup UBC</span>
          </Link>
          <input
            type="checkbox"
            id="menu-toggle"
            className="menu-toggle-checkbox"
            checked={menuOpen}
            onChange={(e) => setMenuOpen(e.target.checked)}
          />
          <label htmlFor="menu-toggle" className="menu-toggle">☰</label>
          <ul className="nav-menu">
            <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
            <li><NavLink to="/gallery" className="nav-link">Gallery</NavLink></li>
            <li><NavLink to="/statistics" className="nav-link">Statistics</NavLink></li>
            <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <Outlet />
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2026 Pickup UBC. Making the world cleaner, one cleanup at a time.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/pickupubc/" target="_blank" title="Instagram" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:pickupubcvan@gmail.com" title="Email" rel="noopener noreferrer">Email</a>
            <a href="https://amsclubs.ca/pickupubc/" target="_blank" title="AMS Page" rel="noopener noreferrer">AMS Page</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfeic7vXnaq8yEGBkF9zFfaDYOiedfs0pHiyhYfD2tG6GfVzQ/viewform" target="_blank" title="Mailing List" rel="noopener noreferrer">Mailing List</a>
          </div>
        </div>
      </footer>
    </>
  )
}
