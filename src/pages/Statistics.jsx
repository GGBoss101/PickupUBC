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
import { allGalleryData } from '../data/galleryData.js'

Chart.register(ChartDataLabels)
Chart.defaults.font.family = "'VT323', monospace"
Chart.defaults.font.size = 18
Chart.defaults.color = '#f5efd9'

const statSprites = [sprites.flag, sprites.trashBag, sprites.mushroom, sprites.binGreen]

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

// Individual cleanups that have weigh-in data (waste[0] = non-recyclable, waste[1] = recyclable).
const runs = allGalleryData.filter((entry) => entry.waste[0] + entry.waste[1] > 0)

export default function Statistics() {
  useDocumentTitle('Statistics - Pickup UBC')
  const [selectedTerm, setSelectedTerm] = useState(termOptions[termOptions.length - 1].value)
  const [barsRef, barsInView] = useInView()
  const pieRef = useRef(null)
  const runsRef = useRef(null)

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
    const chart = new Chart(runsRef.current, {
      type: 'bar',
      data: {
        labels: runs.map((r) => shortDate.format(new Date(r.date))),
        datasets: [
          { label: 'Recyclable', data: runs.map((r) => r.waste[1]), backgroundColor: '#1fa774', borderColor: '#0b0d24', borderWidth: 2 },
          { label: 'Non-recyclable', data: runs.map((r) => r.waste[0]), backgroundColor: '#e0457b', borderColor: '#0b0d24', borderWidth: 2 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, title: { display: true, text: 'lb' }, grid: { color: 'rgba(245, 239, 217, 0.12)' } },
        },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 16, boxHeight: 16 } },
          datalabels: { display: false },
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
        <SectionTitle kicker="Run history">Cleanup by cleanup</SectionTitle>
        <div className="chart px-box">
          <div className="runs-chart">
            <canvas ref={runsRef} role="img" aria-label="Pounds collected at each recorded cleanup, split into recyclable and non-recyclable" />
          </div>
        </div>
      </section>
    </>
  )
}
