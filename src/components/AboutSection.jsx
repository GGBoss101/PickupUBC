export default function AboutSection({ title, children }) {
  return (
    <div className="about-section">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
