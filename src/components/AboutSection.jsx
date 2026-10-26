// An RPG-style dialog box: a sprite "portrait" next to a titled text panel.
export default function AboutSection({ title, sprite, children }) {
  return (
    <article className="about-section">
      {sprite && (
        <div className="about-portrait px-box">
          <img src={sprite} alt="" aria-hidden="true" />
        </div>
      )}
      <div className="dialog-box px-box">
        <h2 className="dialog-title">{title}</h2>
        <div className="dialog-body">{children}</div>
      </div>
    </article>
  )
}
