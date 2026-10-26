import useDocumentTitle from '../hooks/useDocumentTitle.js'
import AboutSection from '../components/AboutSection.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { sprites } from '../assets/sprites.js'
import { links, schedule } from '../data/siteData.js'

export default function About() {
  useDocumentTitle('About Us - Pickup UBC')

  return (
    <>
      <PageHeader kicker="Character select" title="About us" subtitle="The story so far." sprite={sprites.levelUp} />

      <div className="container section about-list">
        <AboutSection title="Who we are" sprite={sprites.logoTv}>
          <p>
            Pickup UBC is a passionate community of environmental advocates dedicated to cleaning up our world.
            Founded in 2024, we've grown to host over 200 past attendees working together to combat litter and
            promote environmental sustainability.
          </p>
        </AboutSection>

        <AboutSection title="Our mission" sprite={sprites.tree}>
          <p>
            To create a cleaner, healthier environment by organizing regular trash collection drives and raising
            awareness about waste management and environmental responsibility in our community.
          </p>
        </AboutSection>

        <AboutSection title="What we do" sprite={sprites.trashBag}>
          <p>
            We organize weekly cleanup events at UBC. We work to remove litter and recyclables, sorting waste
            responsibly. We also carry out clean ups for other community organizations.
          </p>
        </AboutSection>

        <AboutSection title="When & where" sprite={sprites.flag}>
          <p>
            Check our <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> for the
            latest updates on our weekly cleanups. We meet at various locations around UBC, so be sure to check
            our social media for the most current information.
          </p>
          <div className="schedule schedule-inline">
            {schedule.map((slot) => (
              <div key={slot.day} className="schedule-slot px-box">
                <span className="schedule-day">{slot.day}</span>
                <span className="schedule-time">{slot.time}</span>
              </div>
            ))}
          </div>
        </AboutSection>

        <AboutSection title="Join us" sprite={sprites.xp}>
          <p>
            Whether you're an environmental enthusiast or just want to give back to your community, there's a place
            for you in Pickup UBC. All skill levels and ages are welcome. Contact us to learn about upcoming events
            and how to get involved, or join our mailing list!
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={links.mailingList} target="_blank" rel="noopener noreferrer">Join mailing list</a>
            <a className="btn btn-ghost" href={links.email}>Email us</a>
          </div>
        </AboutSection>
      </div>
    </>
  )
}
