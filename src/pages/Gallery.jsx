import { useCallback, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { sprites } from '../assets/sprites.js'
import { allGalleryData } from '../data/galleryData.js'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// Newest cleanup first, skipping dates without photos.
const galleryData = allGalleryData
  .filter((entry) => entry.images && entry.images.length > 0)
  .reverse()

// Every photo in display order, so the lightbox can step across dates.
const photos = galleryData.flatMap((entry) =>
  entry.images.map((src) => ({
    src,
    caption: dateFormatter.format(new Date(entry.date)),
    alt: `Cleanup photo from ${dateFormatter.format(new Date(entry.date))}`,
  })),
)

const formatLb = (n) => `${n.toFixed(1)} lb`

export default function Gallery() {
  useDocumentTitle('Gallery - Pickup UBC')
  const [openIndex, setOpenIndex] = useState(null)
  const close = useCallback(() => setOpenIndex(null), [])

  let photoIndex = 0

  return (
    <>
      <PageHeader
        kicker="Save files"
        title="Gallery"
        subtitle="Check out our cleanup events and community impact."
        sprite={sprites.flag}
      />

      <div className="container section">
        <ol className="save-grid">
          {galleryData.map((entry, n) => {
            const [trash, recycled] = entry.waste
            const total = trash + recycled
            return (
              <li key={entry.date} className={`save-card px-box ${entry.images.length > 1 ? 'is-wide' : ''}`}>
                <div className="save-head">
                  <span className="save-slot">Save {String(galleryData.length - n).padStart(2, '0')}</span>
                  <h2 className="date">{dateFormatter.format(new Date(entry.date))}</h2>
                </div>
                <div className="save-photos">
                  {entry.images.map((src) => {
                    const index = photoIndex++
                    return (
                      <button
                        type="button"
                        key={src}
                        className="photo-frame"
                        onClick={() => setOpenIndex(index)}
                        aria-label={`Open ${photos[index].alt}`}
                      >
                        <img loading="lazy" src={src} alt={photos[index].alt} />
                      </button>
                    )
                  })}
                </div>
                {total > 0 && (
                  <ul className="loot" aria-label="Collected at this cleanup">
                    <li className="loot-chip loot-total">{formatLb(total)} total</li>
                    <li className="loot-chip loot-recycled">{formatLb(recycled)} recycled</li>
                  </ul>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <Lightbox photos={photos} index={openIndex} onChange={setOpenIndex} onClose={close} />
    </>
  )
}
