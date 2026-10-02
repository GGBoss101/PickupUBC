import { useEffect } from 'react'
import { allGalleryData } from '../data/galleryData.js'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const galleryData = allGalleryData.filter((entry) => entry.images && entry.images.length > 0)

export default function Gallery() {
  useEffect(() => {
    document.title = 'Gallery - Pickup UBC'
  }, [])

  return (
    <>
      <h1>Gallery</h1>
      <p>Check out our cleanup events and community impact.</p>

      {galleryData.map((entry) => (
        <div key={entry.date}>
          <h3 className="date">{dateFormatter.format(new Date(entry.date))}</h3>
          <div className="gallery-grid">
            {entry.images.map((src, i) => (
              <div className="gallery-item" key={src}>
                <div className="gallery-placeholder">
                  <img
                    className={`images ${entry.orientations[i] === 'portrait' ? 'images-portrait' : 'images-landscape'}`}
                    loading="lazy"
                    src={src}
                    alt={`Gallery Image - ${entry.date}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
