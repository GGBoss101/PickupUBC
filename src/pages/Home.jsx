import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  useEffect(() => {
    document.title = 'Pickup UBC - Trash Collection Club'
  }, [])

  return (
    <>
      <h1 className="hero-title">Welcome to Pickup UBC</h1>
      <p className="hero-subtitle">Making our community cleaner, one collection at a time.</p>
      <p>We are a dedicated group committed to environmental sustainability through organized trash collection initiatives. Join us in making a difference for our planet and our community.</p>
      <Link to="/about" className="cta-button">Learn More About Us</Link>
    </>
  )
}
