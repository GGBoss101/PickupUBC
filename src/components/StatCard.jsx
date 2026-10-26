import CountUp from './CountUp.jsx'

export default function StatCard({ number, label, sprite }) {
  return (
    <div className="stat-card px-box">
      {sprite && <img className="stat-sprite" src={sprite} alt="" aria-hidden="true" />}
      <div className="stat-number"><CountUp value={number} /></div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
