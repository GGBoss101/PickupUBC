var bars = document.getElementsByClassName("chart-bar-fill");
        /*exact values: var values = [229.15, 228.62, 217.39];*/
        //rounded values of bars for better visual scaling goes in values, initially empty
        var values = [];
        var maxValue = 250; // Set a max value for scaling

        // value[0] = total recyclable waste, value[1] = total non-recyclable waste
        const chartData = {
            '2024W1': [70.22, 158.93],
            '2024W2': [66.25, 162.37],
            '2025W1': [70.22, 147.17],
            '2025W2': [42.88, 200.35]
        };

        // Calculate the rounded total waste for each term and store it in the values array
        for (let i = 0; i < bars.length; i++) {
            values.push(
                Math.min(
                Math.ceil(
                chartData[Object.keys(chartData)[i]][0] + chartData[Object.keys(chartData)[i]][1]), 
                250)); // Ensure the value does not exceed maxValue (250)
        }

        const chartColors = {
            '2024W1': ['green', '#bfd918'],
            '2024W2': ['green', '#bfd918'],
            '2025W1': ['green', '#bfd918'],
            '2025W2': ['green', '#bfd918']
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
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.width = 0 + "%";
            }
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.width = (values[i] / maxValue * 100) + "%";
            }
        });