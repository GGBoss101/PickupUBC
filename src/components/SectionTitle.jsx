export default function SectionTitle({ kicker, children, id }) {
  return (
    <div className="section-title">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 id={id}>{children}</h2>
    </div>
  )
}
