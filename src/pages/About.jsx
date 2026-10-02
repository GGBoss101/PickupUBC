import { useEffect } from 'react'
import AboutSection from '../components/AboutSection.jsx'

export default function About() {
  useEffect(() => {
    document.title = 'About Us - Pickup UBC'
  }, [])

  return (
    <>
      <h1>About Us</h1>

      <AboutSection title="Who We Are">
        Pickup UBC is a passionate community of environmental advocates dedicated to cleaning up our world. Founded in 2024, we've grown to host over 200 past attendees working together to combat litter and promote environmental sustainability.
      </AboutSection>

      <AboutSection title="Our Mission">
        To create a cleaner, healthier environment by organizing regular trash collection drives and raising awareness about waste management and environmental responsibility in our community.
      </AboutSection>

      <AboutSection title="What We Do">
        We organize weekly cleanup events at UBC. We work to remove litter and recyclables, sorting waste responsibly. We also carry out clean ups for other community organizations.
      </AboutSection>

      <AboutSection title="When & Where">
        Check our <a href="https://www.instagram.com/pickupubc/" target="_blank" title="Instagram" rel="noopener noreferrer">Instagram</a> for the latest updates on our weekly cleanups. We typically meet every Wednesday 4-5 PM and Sunday 12-1 PM. We meet at various locations around UBC, so be sure to check our social media for the most current information.
      </AboutSection>

      <AboutSection title="Join Us">
        Whether you're an environmental enthusiast or just want to give back to your community, there's a place for you in Pickup UBC. All skill levels and ages are welcome. Contact us to learn about upcoming events and how to get involved! Join our mailing list linked below!
      </AboutSection>
    </>
  )
}
