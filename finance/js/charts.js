const chartController = {
    instances: { line: null, donut: null },

    renderCharts() {
        const isDark = appState.theme === 'dark';
        const textColor = isDark ? '#94a3b8' : '#64748b'; 
        const gridColor = isDark ? '#334155' : '#f1f5f9'; 

        const sorted = [...appState.transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
        const dates = [];
        const balances = [];
        let runningBalance = 0; 
        
        sorted.forEach(t => {
            runningBalance += (t.type === 'income' ? t.amount : -t.amount);
            dates.push(utils.formatDate(t.date).slice(0, 6)); 
            balances.push(runningBalance);
        });

        const categoryData = {};
        appState.transactions.filter(t => t.type === 'expense').forEach(t => {
            categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
        });
        const donutLabels = Object.keys(categoryData);
        const donutValues = Object.values(categoryData);

        if(this.instances.line) this.instances.line.destroy();
        if(this.instances.donut) this.instances.donut.destroy();

        Chart.defaults.color = textColor;
        Chart.defaults.font.family = "'Inter', sans-serif";

        const ctxLine = document.getElementById('lineChart')?.getContext('2d');
        if (ctxLine) {
            const gradient = ctxLine.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

            this.instances.line = new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: dates.length ? dates : ['No Data'],
                    datasets: [{
                        label: 'Balance',
                        data: balances.length ? balances : [0],
                        borderColor: '#10b981',
                        backgroundColor: gradient,
                        borderWidth: 2,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#10b981',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.4 
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { grid: { color: gridColor }, ticks: { callback: (val) => '$' + val } }
                    },
                    interaction: { mode: 'nearest', axis: 'x', intersect: false }
                }
            });
        }

        const ctxDonut = document.getElementById('donutChart')?.getContext('2d');
        if (ctxDonut) {
            this.instances.donut = new Chart(ctxDonut, {
                type: 'doughnut',
                data: {
                    labels: donutLabels.length ? donutLabels : ['No Data'],
                    datasets: [{
                        data: donutValues.length ? donutValues : [1],
                        backgroundColor: donutValues.length ? [
                            '#10b981', '#0ea5e9', '#f43f5e', '#f59e0b', '#8b5cf6', '#64748b'
                        ] : [gridColor],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%', 
                    plugins: {
                        legend: { position: 'right', labels: { boxWidth: 12, usePointStyle: true, padding: 20 } },
                        tooltip: { callbacks: { label: (ctx) => ` $${ctx.raw}` } }
                    }
                }
            });
        }
    }
};
