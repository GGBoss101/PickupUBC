export const stats = [
  { number: 34, label: 'Cleanups Completed' },
  { number: 918, label: 'lb of Trash Collected' },
  { number: 313, label: 'Past Attendees' },
  { number: 250, label: 'lb of Recycled Material' },
]

// value[0] = total recyclable waste, value[1] = total non-recyclable waste
export const chartData = {
  '2024W1': [70.22, 158.93],
  '2024W2': [66.25, 162.37],
  '2025W1': [70.22, 147.17],
  '2025W2': [42.88, 200.35],
}

export const chartColors = {
  '2024W1': ['green', '#bfd918'],
  '2024W2': ['green', '#bfd918'],
  '2025W1': ['green', '#bfd918'],
  '2025W2': ['green', '#bfd918'],
}

export const termOptions = [
  { value: '2024W1', label: '2024 W1' },
  { value: '2024W2', label: '2024 W2' },
  { value: '2025W1', label: '2025 W1' },
  { value: '2025W2', label: '2025 W2' },
]

// Scale for the sessional collections bar widths; raise if a term exceeds this
const maxValue = 250

export const sessionalCollections = termOptions.map(({ value: term, label }) => ({
  term,
  label,
  display: { '2024W1': '229 lb', '2024W2': '229 lb', '2025W1': '217 lb', '2025W2': '243 lb' }[term],
  widthPercent: Math.min(Math.ceil(chartData[term][0] + chartData[term][1]), maxValue) / maxValue * 100,
}))
