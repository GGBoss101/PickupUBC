export default function ChartBar({ label, widthPercent, display }) {
  return (
    <div className="chart-bar">
      <div className="chart-label">{label}</div>
      <div className="chart-bar-container">
        <div className="chart-bar-fill" style={{ width: `${widthPercent}%` }} />
      </div>
      <div className="chart-value">{display}</div>
    </div>
  )
}
