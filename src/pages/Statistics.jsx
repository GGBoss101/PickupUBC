import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import StatCard from '../components/StatCard.jsx'
import ChartBar from '../components/ChartBar.jsx'
import { stats, sessionalCollections, chartData, chartColors, termOptions } from '../data/statisticsData.js'

Chart.register(ChartDataLabels)

export default function Statistics() {
  const [selectedTerm, setSelectedTerm] = useState('2025W2')
  const [barsAnimated, setBarsAnimated] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    document.title = 'Statistics - Pickup UBC'
  }, [])

  // Bars start at 0% and animate to their real width once, on first render,
  // the same way the old page waited for `window.onload` before filling them in.
  useEffect(() => {
    setBarsAnimated(true)
  }, [])

  // Rebuild the pie chart whenever the selected term changes. The cleanup
  // function below destroys the previous chart instance before this effect
  // runs again, mirroring the old `if (mainChart) mainChart.destroy()` check.
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels: ['Recyclable', 'Non-recyclable'],
        datasets: [{
          data: chartData[selectedTerm],
          backgroundColor: chartColors[selectedTerm],
          hoverOffset: 0,
        }],
      },
      options: {
        events: [],
        responsive: true,
        interaction: 'none',
        animation: {
          duration: 1000, // ensures graph "pops" in every time
        },
        plugins: {
          legend: { position: 'bottom', onClick: null },
          tooltip: { enabled: false },
          datalabels: {
            formatter: (value, context) => {
              const percentage = (value / context.chart._metasets[context.datasetIndex].total * 100).toFixed(1) + '%'
              return percentage + '\n' + value + ' lb'
            },
            color: '#fff',
            font: { size: 14 },
          },
        },
      },
    })

    return () => chart.destroy()
  }, [selectedTerm])

  return (
    <>
      <h1>Our Impact</h1>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} number={stat.number} label={stat.label} />
        ))}
      </div>

      <h2>Sessional Collections</h2>
      <div className="chart">
        {sessionalCollections.map((entry) => (
          <ChartBar
            key={entry.term}
            label={entry.label}
            widthPercent={barsAnimated ? entry.widthPercent : 0}
            display={entry.display}
          />
        ))}
      </div>

      <h2>Waste Breakdown by Term</h2>
      <div className="chart">
        <div className="year-selector">
          <label htmlFor="year-dropdown">Select Term:</label>
          <select
            id="year-dropdown"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {termOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="pie-chart-container">
          <canvas id="wasteChart" ref={canvasRef} style={{ display: 'block' }} />
        </div>
      </div>
    </>
  )
}
