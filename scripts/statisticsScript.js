var bars = document.getElementsByClassName("chart-bar-fill");
        /*exact values: var values = [229.15, 228.62, 217.39];*/
        //rounded values for better visual scaling
        var values = [229, 229, 218];
        var maxValue = 250; // Set a max value for scaling

        const chartData = {
            '2024W1': [70.22, 158.93],
            '2024W2': [66.25, 162.37],
            '2025W1': [70.22, 147.17]
        };

        const chartColors = {
            '2024W1': ['#D55E00', '#0072B2'],
            '2024W2': ['#224C7C', '#94C1CA'],
            '2025W1': ['#F4B41A', '#4BC0C0']
        };

        let mainChart; // Global variable to hold the single instance

        function switchChart() {
            let year = document.getElementById('year-dropdown').value;

            if (mainChart) {
                mainChart.destroy();
            }
            Chart.register(ChartDataLabels);
            mainChart = new Chart(document.getElementById('wasteChart'), {
                type: 'pie',
                data: {
                    labels: ['Recyclable', 'Non-recyclable'],
                    datasets: [{
                        data: chartData[year],
                        backgroundColor: chartColors[year],
                        hoverOffset: 0
                    }]
                },
                options: {
                    events: [],
                    responsive: true,
                    interaction: 'none',
                    animation: {
                        duration: 1000 //ensures graph "pops" in every time
                    },
                    plugins: {
                        legend: { position: 'bottom',
                            onClick: null
                         },
                        tooltip: {
                            enabled: false
                        },
                        datalabels: {
                        formatter: (value, context) => {
                            let percentage = (value / context.chart._metasets
                            [context.datasetIndex].total * 100)
                                .toFixed(1) + '%';
                            return percentage + '\n' + value + " lb";
                        },
                        color: '#fff',
                        font: {
                            size: 14,
                        }
                    }
                    }
                }
            });
        }
        window.addEventListener('load', switchChart);
        window.addEventListener('load', function() {
            bars[0].style.width = 0 + "%";
            bars[1].style.width = 0 + "%";
            bars[2].style.width = 0 + "%";
            bars[0].style.width = (values[0] / maxValue * 100) + "%";
            bars[1].style.width = (values[1] / maxValue * 100) + "%";
            bars[2].style.width = (values[2] / maxValue * 100) + "%";
        });