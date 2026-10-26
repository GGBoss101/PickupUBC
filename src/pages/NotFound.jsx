import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { sprites } from '../assets/sprites.js'

export default function NotFound() {
  useDocumentTitle('Level not found - Pickup UBC')

  return (
    <section className="container section not-found">
      <img src={sprites.lockedRoom} alt="" aria-hidden="true" />
      <p className="kicker">Error 404</p>
      <h1 className="page-title">This level is locked</h1>
      <p className="lead">The page you're looking for doesn't exist (yet).</p>
      <Link to="/" className="btn btn-primary">Return to title screen</Link>
    </section>
  )
}
