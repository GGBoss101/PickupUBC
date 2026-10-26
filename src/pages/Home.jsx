import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import SkyScene from '../components/SkyScene.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatCard from '../components/StatCard.jsx'
import { sprites } from '../assets/sprites.js'
import { links, schedule } from '../data/siteData.js'
import { stats } from '../data/statisticsData.js'
import { allGalleryData } from '../data/galleryData.js'

const statSprites = [sprites.flag, sprites.trashBag, sprites.mushroom, sprites.binGreen]

const steps = [
  { title: 'Join the party', text: 'Sign up for the mailing list and follow our Instagram so you know where the next cleanup spawns.' },
  { title: 'Find the checkpoint', text: 'We meet every Wednesday and Sunday at a different spot around UBC campus.' },
  { title: 'Gear up', text: 'Grab gloves, a grabber and a bag. Everything is provided, no experience needed.' },
  { title: 'Collect & sort', text: 'Clear the area, sort recyclables from trash, and have your score climb.' },
]

// The four most recent photos, newest first.
const latestPhotos = allGalleryData
  .filter((entry) => entry.images?.length)
  .flatMap((entry) => entry.images.map((src) => ({ src, date: entry.date })))
  .slice(-4)
  .reverse()

export default function Home() {
  useDocumentTitle('Pickup UBC - Trash Collection Club')

  return (
    <>
      <section className="hero">
        <SkyScene />
        <div className="hero-inner container">
          <img className="hero-logo bob" src={sprites.logoTv} alt="Pickup UBC logo: a retro TV showing a trash can and grabber" />
          <div className="hero-copy">
            <p className="kicker">UBC's trash collection club</p>
            <h1 className="hero-title">Pickup<br /><span>UBC</span></h1>
            <p className="hero-subtitle">Making our community cleaner, one collection at a time.</p>
            <div className="hero-actions">
              <a className="btn btn-primary blink-arrow" href={links.mailingList} target="_blank" rel="noopener noreferrer">Press start</a>
              <a className="btn btn-ghost" href="#how-to-play">How to play</a>
            </div>
          </div>
        </div>
        <div className="hero-ground" aria-hidden="true">
          <img className="ground-tree" src={sprites.tree} alt="" />
          <img className="ground-mushroom" src={sprites.mushroom} alt="" />
          <img className="ground-flower" src={sprites.flower} alt="" />
          <img className="ground-bush" src={sprites.bush} alt="" />
          <img className="ground-bin" src={sprites.binFull} alt="" />
          <div className="ground" />
        </div>
      </section>

      <section className="section container">
        <SectionTitle kicker="Player 1 ready">Welcome to Pickup UBC</SectionTitle>
        <p className="lead">
          We are a dedicated group committed to environmental sustainability through organized trash
          collection initiatives. Join us in making a difference for our planet and our community.
        </p>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} number={stat.number} label={stat.label} sprite={statSprites[i]} />
          ))}
        </div>
        <div className="section-link">
          <Link to="/statistics" className="text-link">View all high scores ▶</Link>
        </div>
      </section>

      <section className="section section-band" aria-labelledby="how-to-play">
        <div className="container">
          <SectionTitle kicker="Tutorial" id="how-to-play">How to play</SectionTitle>
          <div className="quest">
            <img className="quest-map" src={sprites.questMap} alt="" aria-hidden="true" />
            <ol className="quest-steps">
              {steps.map((step, i) => (
                <li key={step.title} className="quest-step px-box">
                  <span className="quest-num">{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="schedule">
            {schedule.map((slot) => (
              <div key={slot.day} className="schedule-slot px-box">
                <span className="schedule-day">{slot.day}</span>
                <span className="schedule-time">{slot.time}</span>
              </div>
            ))}
            <p className="schedule-note">
              Locations change each week, so check <a href={links.instagram} target="_blank" rel="noopener noreferrer">our Instagram</a> before you head out.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle kicker="Replays">Latest screenshots</SectionTitle>
        <div className="photo-strip">
          {latestPhotos.map((photo) => (
            <Link key={photo.src} to="/gallery" className="photo-frame">
              <img src={photo.src} alt={`Cleanup on ${photo.date}`} loading="lazy" />
            </Link>
          ))}
        </div>
        <div className="section-link">
          <Link to="/gallery" className="text-link">Open the gallery ▶</Link>
        </div>
      </section>

      <section className="section container">
        <div className="cta-panel px-box">
          <img className="cta-sprite bob" src={sprites.xp} alt="" aria-hidden="true" />
          <div>
            <h2>New quest unlocked</h2>
            <p>All skill levels and ages are welcome. Join the mailing list to hear about upcoming cleanups and events.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={links.mailingList} target="_blank" rel="noopener noreferrer">Join mailing list</a>
              <Link className="btn btn-ghost" to="/about">Learn more about us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
