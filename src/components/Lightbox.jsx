import { useEffect, useRef } from 'react'

// Full-screen photo viewer built on <dialog>, which gives us focus trapping
// and Escape-to-close for free. Arrow keys step through every photo.
export default function Lightbox({ photos, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const open = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, photos.length, onChange])

  const photo = open ? photos[index] : null

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
      aria-label="Photo viewer"
    >
      {photo && (
        <div className="lightbox-inner px-box">
          <div className="lightbox-bar">
            <span>{photo.caption}</span>
            <span>{index + 1} / {photos.length}</span>
            <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <img className="lightbox-img" src={photo.src} alt={photo.alt} />
          <div className="lightbox-controls">
            <button type="button" className="btn btn-small" onClick={() => onChange((index - 1 + photos.length) % photos.length)}>◀ Prev</button>
            <button type="button" className="btn btn-small" onClick={() => onChange((index + 1) % photos.length)}>Next ▶</button>
          </div>
        </div>
      )}
    </dialog>
  )
}
