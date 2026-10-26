// One term's total, drawn as a segmented XP bar.
export default function ChartBar({ label, widthPercent, display }) {
  return (
    <div className="chart-bar">
      <div className="chart-label">{label}</div>
      <div
        className="chart-bar-container"
        role="meter"
        aria-label={`${label} collection`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(widthPercent)}
        aria-valuetext={display}
      >
        <div className="chart-bar-fill" style={{ width: `${widthPercent}%` }} />
      </div>
      <div className="chart-value">{display}</div>
    </div>
  )
}
