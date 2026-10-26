import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import useInView from '../hooks/useInView.js'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatCard from '../components/StatCard.jsx'
import ChartBar from '../components/ChartBar.jsx'
import { sprites } from '../assets/sprites.js'
import { stats, sessionalCollections, chartData, chartColors, termOptions } from '../data/statisticsData.js'

Chart.register(ChartDataLabels)
Chart.defaults.font.family = "'VT323', monospace"
Chart.defaults.font.size = 18
Chart.defaults.color = '#f5efd9'

const statSprites = [sprites.flag, sprites.trashBag, sprites.mushroom, sprites.binGreen]

// Running totals after each term (chartData values are [recyclable, non-recyclable]),
// so the chart reads like a score climbing over time.
let runningTotal = 0
let runningRecycled = 0
const progress = termOptions.map(({ value, label }) => {
  const [recyclable, nonRecyclable] = chartData[value]
  runningTotal += recyclable + nonRecyclable
  runningRecycled += recyclable
  return { label, total: Math.round(runningTotal), recycled: Math.round(runningRecycled) }
})

export default function Statistics() {
  useDocumentTitle('Statistics - Pickup UBC')
  const [selectedTerm, setSelectedTerm] = useState(termOptions[termOptions.length - 1].value)
  const [barsRef, barsInView] = useInView()
  const pieRef = useRef(null)
  const progressRef = useRef(null)

  const [recyclable, nonRecyclable] = chartData[selectedTerm]
  const termTotal = recyclable + nonRecyclable
  const pct = (n) => `${((n / termTotal) * 100).toFixed(1)}%`

  // Rebuild the doughnut whenever the selected term changes; the cleanup
  // destroys the previous chart instance first.
  useEffect(() => {
    const chart = new Chart(pieRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Recyclable', 'Non-recyclable'],
        datasets: [{
          data: chartData[selectedTerm],
          backgroundColor: chartColors[selectedTerm],
          borderColor: '#0b0d24',
          borderWidth: 4,
          hoverOffset: 0,
        }],
      },
      options: {
        events: [],
        responsive: true,
        maintainAspectRatio: true,
        cutout: '45%',
        animation: { duration: 900 },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: {
            formatter: (value, context) => {
              const total = context.chart._metasets[context.datasetIndex].total
              return `${(value / total * 100).toFixed(1)}%`
            },
            color: '#fff',
            textStrokeColor: '#0b0d24',
            textStrokeWidth: 4,
            font: { size: 24 },
          },
        },
      },
    })

    return () => chart.destroy()
  }, [selectedTerm])

  useEffect(() => {
    const chart = new Chart(progressRef.current, {
      type: 'line',
      data: {
        labels: progress.map((p) => p.label),
        datasets: [
          {
            label: 'All waste collected',
            data: progress.map((p) => p.total),
            borderColor: '#f7d154',
            backgroundColor: 'rgba(247, 209, 84, 0.15)',
            fill: 'origin',
          },
          {
            label: 'Recycled',
            data: progress.map((p) => p.recycled),
            borderColor: '#1fa774',
            backgroundColor: 'rgba(31, 167, 116, 0.25)',
            fill: 'origin',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 28 } },
        elements: {
          line: { borderWidth: 4, tension: 0 },
          point: { pointStyle: 'rect', radius: 7, hoverRadius: 9, borderColor: '#0b0d24', borderWidth: 3 },
        },
        scales: {
          x: { offset: true, grid: { display: false } },
          y: { beginAtZero: true, grace: '10%', title: { display: true, text: 'lb (running total)' }, grid: { color: 'rgba(245, 239, 217, 0.12)' } },
        },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 16, boxHeight: 16 } },
          datalabels: {
            // Totals above the yellow line, recycled below the green one; hidden on
            // narrow screens where they would collide.
            display: (ctx) => ctx.chart.width > 520,
            align: (ctx) => (ctx.datasetIndex === 0 ? 'top' : 'bottom'),
            offset: 8,
            color: (ctx) => ctx.dataset.borderColor,
            font: { size: 20 },
            formatter: (value) => `${value} lb`,
          },
          tooltip: {
            backgroundColor: '#0b0d24',
            borderColor: '#f7d154',
            borderWidth: 2,
            cornerRadius: 0,
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} lb` },
          },
        },
      },
    })

    return () => chart.destroy()
  }, [])

  return (
    <>
      <PageHeader kicker="Leaderboard" title="Our impact" subtitle="Every pound counts toward the team high score." sprite={sprites.levelUp} />

      <div className="container section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} number={stat.number} label={stat.label} sprite={statSprites[i]} />
          ))}
        </div>
      </div>

      <section className="container section">
        <SectionTitle kicker="XP per term">Sessional collections</SectionTitle>
        <div className="chart px-box" ref={barsRef}>
          {sessionalCollections.map((entry) => (
            <ChartBar
              key={entry.term}
              label={entry.label}
              widthPercent={barsInView ? entry.widthPercent : 0}
              display={entry.display}
            />
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle kicker="Sorting minigame">Waste breakdown by term</SectionTitle>
        <div className="chart px-box">
          <div className="term-tabs" role="group" aria-label="Select term">
            {termOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-small ${opt.value === selectedTerm ? 'btn-primary' : 'btn-ghost'}`}
                aria-pressed={opt.value === selectedTerm}
                onClick={() => setSelectedTerm(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="breakdown">
            <div className="bin-score">
              <img src={sprites.binGreen} alt="" aria-hidden="true" />
              <p className="bin-value recyclable">{recyclable.toFixed(1)} lb</p>
              <p className="bin-label">Recyclable · {pct(recyclable)}</p>
            </div>
            <div className="pie-chart-container">
              <canvas ref={pieRef} role="img" aria-label={`Recyclable ${recyclable} lb, non-recyclable ${nonRecyclable} lb`} />
            </div>
            <div className="bin-score">
              <img src={sprites.binPink} alt="" aria-hidden="true" />
              <p className="bin-value non-recyclable">{nonRecyclable.toFixed(1)} lb</p>
              <p className="bin-label">Non-recyclable · {pct(nonRecyclable)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionTitle kicker="Progress">Total collected over time</SectionTitle>
        <div className="chart px-box">
          <div className="progress-chart">
            <canvas
              ref={progressRef}
              role="img"
              aria-label={`Running total of waste collected by term, reaching ${progress[progress.length - 1].total} lb, of which ${progress[progress.length - 1].recycled} lb recycled`}
            />
          </div>
        </div>
      </section>
    </>
  )
}
