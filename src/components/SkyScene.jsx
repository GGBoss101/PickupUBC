import { sprites } from '../assets/sprites.js'

// Decorative night sky: stars, twinkling sparkles and drifting clouds.
// Purely visual, so it is hidden from screen readers.
export default function SkyScene({ compact = false }) {
  return (
    <div className={`sky ${compact ? 'sky-compact' : ''}`} aria-hidden="true">
      <div className="stars" />
      <img className="cloud cloud-a" src={sprites.cloudLong} alt="" />
      <img className="cloud cloud-b" src={sprites.cloud} alt="" />
      {!compact && <img className="cloud cloud-c" src={sprites.cloud} alt="" />}
      <img className="sparkle sparkle-a" src={sprites.sparkles} alt="" />
      <img className="sparkle sparkle-b" src={sprites.sparkles} alt="" />
      {!compact && <img className="sparkle sparkle-c" src={sprites.sparkles} alt="" />}
    </div>
  )
}
