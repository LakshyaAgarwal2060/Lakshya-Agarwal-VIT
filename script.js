document.addEventListener('DOMContentLoaded', function () {
    // ===================== TAB NAVIGATION =====================
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    const chartRegistry = {};

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            contents.forEach(function (c) { c.classList.remove('active'); });
            tab.classList.add('active');
            var tabId = 'tab-' + tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            renderChartsForTab(tab.getAttribute('data-tab'));
            window.scrollTo(0, 0);
        });
    });

    // ===================== DASHBOARD TITLE CLICK (GO TO TOP) =====================
    var dashboardTitle = document.getElementById('dashboard-title');
    if (dashboardTitle) {
        dashboardTitle.addEventListener('click', function () {
            // Switch to overview tab
            tabs.forEach(function (t) { t.classList.remove('active'); });
            contents.forEach(function (c) { c.classList.remove('active'); });
            var overviewTab = document.querySelector('[data-tab=overview]');
            if (overviewTab) overviewTab.classList.add('active');
            var overviewContent = document.getElementById('tab-overview');
            if (overviewContent) overviewContent.classList.add('active');
            renderChartsForTab('overview');
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===================== ALERT CLOSE BUTTON =====================
    var alertClose = document.getElementById('alert-close');
    var alertBanner = document.getElementById('alert-banner');
    if (alertClose && alertBanner) {
        alertClose.addEventListener('click', function (e) {
            e.stopPropagation();
            alertBanner.style.display = 'none';
        });
    }

    // ===================== CSV EXPORT =====================
    document.querySelectorAll('.export-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var csv = 'No,Problem Area,Risk Category,KPI,Q1 FY26,Q2 FY26,Q3 FY26,Target,Trend\n';
            csv += '1,Rising NPAs,Credit Risk,Gross NPA Ratio (%),1.82,1.73,1.57,2.0,Improving\n';
            csv += '1,Rising NPAs,Credit Risk,Net NPA Ratio (%),0.47,0.42,0.39,0.5,Improving\n';
            csv += '2,Delayed EMI Payments,Credit Risk,Slippage Ratio (%),0.75,0.45,0.40,0.6,Improving\n';
            csv += '3,Sector-Specific Defaults,Market Risk,Net Interest Margin (NIM),3.10,3.15,3.12,3.0,Stable\n';
            csv += '4,Weak Early Warning,Operational,YONO System Uptime (%),99.85,99.92,99.95,99.9,Improving\n';
            csv += '5,Poor Recovery Rate,Credit Risk,Credit Cost (%),0.47,0.39,0.29,0.5,Stable\n';
            csv += '6,Loan Restructuring,Capital Risk,Capital Adequacy Ratio (%),14.63,14.30,14.04,12.5,Stable\n';
            csv += '6,Loan Restructuring,Capital Risk,CET-1 Ratio (%),11.10,10.80,10.99,10.0,Stable\n';
            csv += '7,Regional Risk Imbalance,Liquidity,LCR (Liquidity Coverage),118.5,116.2,115.8,110,Stressed\n';
            csv += '8,Credit Appraisal Gaps,Operational,Cyber Fraud Attempts,145,162,128,150,Improving\n';
            var blob = new Blob([csv], { type: 'text/csv' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'Risk_Dashboard_KPIs.csv';
            a.click();
        });
    });

    // ===================== CHART DEFAULTS =====================
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.maintainAspectRatio = false;
    
    // Enhanced interactions
    Chart.defaults.plugins.tooltip.enabled = true;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26,26,46,0.95)';
    Chart.defaults.plugins.tooltip.titleColor = '#fff';
    Chart.defaults.plugins.tooltip.bodyColor = '#fff';
    Chart.defaults.plugins.tooltip.borderColor = '#0065ff';
    Chart.defaults.plugins.tooltip.borderWidth = 2;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.titleFont = { size: 13, weight: 'bold' };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
    Chart.defaults.plugins.tooltip.caretSize = 6;
    Chart.defaults.plugins.tooltip.caretPadding = 8;
    
    // Legend interactions
    Chart.defaults.plugins.legend.onHover = function(e) {
        e.native.target.style.cursor = 'pointer';
    };
    Chart.defaults.plugins.legend.onLeave = function(e) {
        e.native.target.style.cursor = 'default';
    };
    
    // Hover animations
    Chart.defaults.elements.point.radius = 4;
    Chart.defaults.elements.point.hoverRadius = 10;
    Chart.defaults.elements.point.borderWidth = 2;
    Chart.defaults.elements.point.borderColor = '#1a1a2e';
    Chart.defaults.elements.point.hoverBorderWidth = 3;
    Chart.defaults.elements.point.hoverBorderColor = '#000';
    Chart.defaults.elements.bar.hoverBorderWidth = 3;
    Chart.defaults.elements.bar.hoverBorderColor = 'rgba(0,101,255,0.8)';
    
    // Animation settings
    Chart.defaults.animation.duration = 1000;
    Chart.defaults.animation.easing = 'easeInOutQuart';
    
    // Interaction settings for better hover detection
    Chart.defaults.interaction = {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
    };
    
    // Custom hover highlight plugin
    var hoverHighlightPlugin = {
        id: 'hoverHighlight',
        afterDatasetsDraw: function(chart) {
            if (chart.tooltip._active && chart.tooltip._active.length) {
                var activePoint = chart.tooltip._active[0];
                var ctx = chart.ctx;
                var x = activePoint.element.x;
                var y = activePoint.element.y;
                var topY = chart.scales.y ? chart.scales.y.top : 0;
                var bottomY = chart.scales.y ? chart.scales.y.bottom : chart.height;
                
                ctx.save();
                
                // Draw glow circle behind point
                var gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
                gradient.addColorStop(0, 'rgba(0,101,255,0.3)');
                gradient.addColorStop(1, 'rgba(0,101,255,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, 2 * Math.PI);
                ctx.fill();
                
                // Draw vertical line
                if (chart.scales.y) {
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba(0,101,255,0.3)';
                    ctx.setLineDash([5, 5]);
                    ctx.stroke();
                }
                
                ctx.restore();
            }
        }
    };
    Chart.register(hoverHighlightPlugin);

    // ===================== HORIZONTAL LINE PLUGIN =====================
    var hLinePlugin = {
        id: 'hLine',
        afterDraw: function (chart) {
            var cfg = chart.options.plugins.hLine;
            if (!cfg || !cfg.lines) return;
            var ctx = chart.ctx;
            var yScale = chart.scales.y;
            var left = chart.chartArea.left;
            var right = chart.chartArea.right;
            cfg.lines.forEach(function (line) {
                var yPos = yScale.getPixelForValue(line.value);
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash(line.dash || [6, 4]);
                ctx.strokeStyle = line.color || '#de350b';
                ctx.lineWidth = line.width || 1.5;
                ctx.moveTo(left, yPos);
                ctx.lineTo(right, yPos);
                ctx.stroke();
                if (line.label) {
                    ctx.fillStyle = line.color || '#de350b';
                    ctx.font = '10px Segoe UI';
                    ctx.textAlign = 'right';
                    ctx.fillText(line.label, right - 4, yPos - 5);
                }
                ctx.restore();
            });
        }
    };
    Chart.register(hLinePlugin);

    var quarters = ['Q1 FY26', 'Q2 FY26', 'Q3 FY26'];

    // ===================== HELPER: Add line-chart class =====================
    function addLineChartClass(chartId) {
        var canvas = document.getElementById(chartId);
        if (canvas && canvas.parentElement) {
            canvas.parentElement.classList.add('line-chart');
        }
    }

    // ===================== RENDER PER TAB =====================
    function renderChartsForTab(tabName) {
        if (chartRegistry[tabName]) return;
        chartRegistry[tabName] = true;
        switch (tabName) {
            case 'overview': renderOverviewCharts(); break;
            case 'credit': renderCreditCharts(); break;
            case 'capital': renderCapitalCharts(); break;
            case 'liquidity': renderLiquidityCharts(); break;
            case 'market': renderMarketCharts(); break;
            case 'operational': renderOpsCharts(); break;
            case 'performance': renderPerformanceCharts(); break;
        }
    }

    // ===================== OVERVIEW =====================
    function renderOverviewCharts() {
        addLineChartClass('chartOverviewNPA');
        new Chart(document.getElementById('chartOverviewNPA'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'Gross NPA %', data: [1.82, 1.73, 1.57], borderColor: '#de350b', backgroundColor: 'rgba(222,53,11,0.08)', fill: true, tension: 0.3 },
                    { label: 'Net NPA %', data: [0.47, 0.42, 0.39], borderColor: '#0065ff', backgroundColor: 'rgba(0,101,255,0.08)', fill: true, tension: 0.3 },
                    { label: 'Slippage %', data: [0.75, 0.45, 0.40], borderColor: '#e6a817', backgroundColor: 'rgba(230,168,23,0.08)', fill: true, tension: 0.3 }
                ]
            },
            options: { plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
        });

        new Chart(document.getElementById('chartOverviewDonut'), {
            type: 'doughnut',
            data: {
                labels: ['Credit Risk', 'Capital Risk', 'Liquidity Risk', 'Market Risk', 'Operational Risk'],
                datasets: [{
                    data: [4, 2, 1, 1, 2],
                    backgroundColor: ['#de350b', '#e6a817', '#0065ff', '#00a3bf', '#6554c0'],
                    borderWidth: 2, borderColor: '#fff'
                }]
            },
            options: { cutout: '55%', plugins: { legend: { position: 'bottom' } } }
        });

        new Chart(document.getElementById('chartOverviewCapital'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'CAR %', data: [14.63, 14.30, 14.04], backgroundColor: '#0065ff', borderRadius: 4 },
                    { label: 'CET-1 %', data: [11.10, 10.80, 10.99], backgroundColor: '#6554c0', borderRadius: 4 }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [
                        { value: 12.5, color: '#de350b', label: 'CAR Min (12.5%)' },
                        { value: 10.0, color: '#e6a817', label: 'CET-1 Min (10%)' }
                    ]}
                },
                scales: { y: { min: 8, max: 16 } }
            }
        });

        new Chart(document.getElementById('chartOverviewFraud'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'Fraud Attempts', data: [145, 162, 128], backgroundColor: ['#e6a817', '#de350b', '#22a06b'], borderRadius: 6 }
                ]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    hLine: { lines: [{ value: 150, color: '#de350b', label: 'Target (150)' }] }
                },
                scales: { y: { beginAtZero: true, max: 200 } }
            }
        });
    }

    // ===================== CREDIT RISK =====================
    function renderCreditCharts() {
        addLineChartClass('chartCreditNPA');
        new Chart(document.getElementById('chartCreditNPA'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'Gross NPA %', data: [1.82, 1.73, 1.57], borderColor: '#de350b', backgroundColor: 'rgba(222,53,11,0.1)', fill: true, tension: 0.3, borderWidth: 2.5 },
                    { label: 'Net NPA %', data: [0.47, 0.42, 0.39], borderColor: '#0065ff', backgroundColor: 'rgba(0,101,255,0.1)', fill: true, tension: 0.3, borderWidth: 2.5 }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [
                        { value: 2.0, color: '#de350b', label: 'Gross Target (2.0%)' },
                        { value: 0.5, color: '#0065ff', label: 'Net Target (0.5%)' }
                    ]}
                },
                scales: { y: { beginAtZero: true, max: 2.5 } }
            }
        });

        new Chart(document.getElementById('chartCreditSlippage'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'Slippage Ratio %', data: [0.75, 0.45, 0.40], backgroundColor: ['#de350b', '#e6a817', '#22a06b'], borderRadius: 6 }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 0.6, color: '#de350b', label: 'Target (0.6%)' }] }
                },
                scales: { y: { beginAtZero: true, max: 1.0 } }
            }
        });

        new Chart(document.getElementById('chartCreditSector'), {
            type: 'bar',
            data: {
                labels: ['MSME', 'Agriculture', 'Retail', 'Corporate', 'Housing'],
                datasets: [
                    { label: 'Q1', data: [3.2, 2.8, 1.1, 0.8, 0.6], backgroundColor: 'rgba(222,53,11,0.7)', borderRadius: 3 },
                    { label: 'Q2', data: [3.0, 2.5, 1.0, 0.7, 0.5], backgroundColor: 'rgba(230,168,23,0.7)', borderRadius: 3 },
                    { label: 'Q3', data: [2.6, 2.2, 0.9, 0.6, 0.5], backgroundColor: 'rgba(34,160,107,0.7)', borderRadius: 3 }
                ]
            },
            options: { plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'NPA %' } } } }
        });

        addLineChartClass('chartCreditCost');
        new Chart(document.getElementById('chartCreditCost'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Credit Cost %', data: [0.47, 0.39, 0.29],
                    borderColor: '#6554c0', backgroundColor: 'rgba(101,84,192,0.15)',
                    fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#6554c0'
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 0.5, color: '#de350b', label: 'Target (0.5%)' }] }
                },
                scales: { y: { beginAtZero: true, max: 0.6 } }
            }
        });
    }

    // ===================== CAPITAL RISK =====================
    function renderCapitalCharts() {
        new Chart(document.getElementById('chartCapitalTrend'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'CAR %', data: [14.63, 14.30, 14.04], backgroundColor: '#0065ff', borderRadius: 4 },
                    { label: 'CET-1 %', data: [11.10, 10.80, 10.99], backgroundColor: '#6554c0', borderRadius: 4 }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [
                        { value: 12.5, color: '#de350b', label: 'CAR Min (12.5%)' },
                        { value: 10.0, color: '#e6a817', label: 'CET-1 Min (10%)' }
                    ]}
                },
                scales: { y: { min: 8, max: 16 } }
            }
        });

        new Chart(document.getElementById('chartCapitalBuffer'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Buffer Above Min %', data: [2.13, 1.80, 1.54],
                    backgroundColor: ['#22a06b', '#e6a817', '#de350b'], borderRadius: 6
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 1.5, color: '#de350b', label: 'Warning (1.5%)' }] }
                },
                scales: { y: { beginAtZero: true, max: 3.0 } }
            }
        });
    }

    // ===================== LIQUIDITY RISK =====================
    function renderLiquidityCharts() {
        addLineChartClass('chartLiquidityLCR');
        new Chart(document.getElementById('chartLiquidityLCR'), {
            type: 'line',
            data: {
                labels: ['Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26 (proj.)'],
                datasets: [{
                    label: 'LCR %', data: [118.5, 116.2, 115.8, 114.5],
                    borderColor: '#de350b', backgroundColor: 'rgba(222,53,11,0.1)',
                    fill: true, tension: 0.3, borderWidth: 2.5,
                    pointRadius: [5, 5, 5, 5],
                    pointStyle: ['circle', 'circle', 'circle', 'triangle'],
                    pointBackgroundColor: ['#de350b', '#de350b', '#de350b', '#999']
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 110, color: '#bf2600', label: 'Regulatory Floor (110%)' }] }
                },
                scales: { y: { min: 105, max: 125 } }
            }
        });

        addLineChartClass('chartLiquidityBuffer');
        new Chart(document.getElementById('chartLiquidityBuffer'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Buffer Above Min %', data: [8.5, 6.2, 5.8],
                    borderColor: '#de350b', backgroundColor: 'rgba(222,53,11,0.2)',
                    fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#de350b'
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 5.0, color: '#bf2600', label: 'Danger Zone (5%)' }] }
                },
                scales: { y: { beginAtZero: true, max: 12 } }
            }
        });
    }

    // ===================== MARKET RISK =====================
    function renderMarketCharts() {
        addLineChartClass('chartMarketNIM');
        new Chart(document.getElementById('chartMarketNIM'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'NIM %', data: [3.10, 3.15, 3.12],
                    borderColor: '#00a3bf', backgroundColor: 'rgba(0,163,191,0.15)',
                    fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#00a3bf'
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [
                        { value: 3.0, color: '#de350b', label: 'Target Floor (3.0%)' },
                        { value: 3.5, color: '#22a06b', label: 'Comfort Ceiling (3.5%)' }
                    ]}
                },
                scales: { y: { min: 2.8, max: 3.6 } }
            }
        });

        new Chart(document.getElementById('chartMarketSector'), {
            type: 'bar',
            data: {
                labels: ['MSME', 'Agriculture', 'Retail', 'Corporate'],
                datasets: [{
                    label: 'Risk Score',
                    data: [8.5, 7.8, 4.2, 2.5],
                    backgroundColor: ['#de350b', '#e6a817', '#0065ff', '#22a06b'],
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true, max: 10, title: { display: true, text: 'Risk Score (0-10)' } } }
            }
        });
    }

    // ===================== OPERATIONAL RISK =====================
    function renderOpsCharts() {
        new Chart(document.getElementById('chartOpsFraud'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'Fraud Attempts', data: [145, 162, 128], backgroundColor: ['#e6a817', '#de350b', '#22a06b'], borderRadius: 6 }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 150, color: '#de350b', label: 'Target (150)' }] }
                },
                scales: { y: { beginAtZero: true, max: 200 } }
            }
        });

        addLineChartClass('chartOpsUptime');
        new Chart(document.getElementById('chartOpsUptime'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Uptime %', data: [99.85, 99.92, 99.95],
                    borderColor: '#22a06b', backgroundColor: 'rgba(34,160,107,0.15)',
                    fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#22a06b'
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 99.9, color: '#de350b', label: 'Target (99.9%)' }] }
                },
                scales: { y: { min: 99.8, max: 100 } }
            }
        });
    }

    // ===================== PERFORMANCE METRICS =====================
    function renderPerformanceCharts() {
        // ROA & ROE Trend
        addLineChartClass('chartPerfROA');
        new Chart(document.getElementById('chartPerfROA'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [
                    { label: 'ROA %', data: [0.71, 0.78, 0.82], borderColor: '#22a06b', backgroundColor: 'rgba(34,160,107,0.15)', fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#22a06b', yAxisID: 'y' },
                    { label: 'ROE %', data: [14.0, 14.1, 14.2], borderColor: '#0065ff', backgroundColor: 'rgba(0,101,255,0.15)', fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#0065ff', yAxisID: 'y1' }
                ]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [
                        { value: 0.75, color: '#22a06b', label: 'ROA Target (0.75%)' },
                        { value: 12, color: '#0065ff', label: 'ROE Target (12%)', yAxis: 'y1' }
                    ]}
                },
                scales: {
                    y: { type: 'linear', position: 'left', title: { display: true, text: 'ROA (%)' }, min: 0.5, max: 1.0 },
                    y1: { type: 'linear', position: 'right', title: { display: true, text: 'ROE (%)' }, min: 10, max: 16, grid: { drawOnChartArea: false } }
                }
            }
        });

        // CASA Ratio Trend
        new Chart(document.getElementById('chartPerfCASA'), {
            type: 'bar',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'CASA Ratio %', data: [44.2, 45.0, 45.8],
                    backgroundColor: ['#0065ff', '#00a3bf', '#22a06b'], borderRadius: 6
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 40, color: '#de350b', label: 'Target (40%)' }] }
                },
                scales: { y: { min: 35, max: 50 } }
            }
        });

        // Cost-to-Income Ratio
        addLineChartClass('chartPerfCost');
        new Chart(document.getElementById('chartPerfCost'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Cost-to-Income %', data: [51.2, 49.8, 48.3],
                    borderColor: '#22a06b', backgroundColor: 'rgba(34,160,107,0.15)',
                    fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#22a06b'
                }]
            },
            options: {
                plugins: {
                    legend: { position: 'bottom' },
                    hLine: { lines: [{ value: 50, color: '#de350b', label: 'Target (50%)' }] }
                },
                scales: { y: { min: 45, max: 55 } }
            }
        });

        // Priority Sector Lending
        new Chart(document.getElementById('chartPerfPriority'), {
            type: 'doughnut',
            data: {
                labels: ['Agriculture (18.2%)', 'MSME (15.5%)', 'Housing/Education (8.4%)', 'Non-Priority (57.9%)'],
                datasets: [{
                    data: [18.2, 15.5, 8.4, 57.9],
                    backgroundColor: ['#22a06b', '#0065ff', '#6554c0', '#e8e8e8'],
                    borderWidth: 2, borderColor: '#fff'
                }]
            },
            options: { cutout: '55%', plugins: { legend: { position: 'bottom' } } }
        });
    }

    // ===================== INIT =====================
    renderChartsForTab('overview');
});
