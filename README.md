# SBI Risk Management MockUp

## 📊 Project Overview
A comprehensive web-based Risk Management Dashboard designed for State Bank of India (SBI) to monitor and analyze key banking risk indicators across multiple risk categories. This dashboard provides real-time insights into Credit Risk, Capital Risk, Liquidity Risk, Market Risk, Operational Risk, and Performance Metrics for FY 2025-26.

## 🎯 Project Objectives
- Provide a centralized platform for monitoring critical banking KPIs
- Enable early identification of risk factors and problem areas
- Facilitate data-driven decision-making for risk management
- Ensure regulatory compliance with RBI and Basel III norms
- Visualize complex financial data through interactive charts and dashboards

## ✨ Features

### Multi-Tab Navigation
- **Overview**: Executive summary with key metrics and risk health at a glance
- **Credit Risk**: NPA trends, slippage ratios, provision coverage, and SMA tracking
- **Capital Risk**: CAR, CET-1, leverage ratios with regulatory compliance monitoring
- **Liquidity Risk**: LCR and NSFR tracking with stress alerts
- **Market Risk**: Net Interest Margin and sector exposure analysis
- **Operational Risk**: Cyber fraud monitoring and system uptime tracking
- **Performance**: Profitability metrics (ROA, ROE, CASA ratio, Cost-to-Income)
- **Problem Areas**: Detailed analysis of 8 identified risk issues

### Interactive Visualizations
- 20+ interactive charts using Chart.js
- Line charts for trend analysis
- Bar charts for comparative analysis
- Doughnut charts for risk distribution
- Hover tooltips with detailed information
- Regulatory threshold indicators

### Key Performance Indicators (12+ KPIs)
- Gross NPA Ratio: 1.57% (Target: <2.0%)
- Net NPA Ratio: 0.39% (Target: <0.5%)
- Capital Adequacy Ratio: 14.04% (Min: 12.5%)
- LCR: 115.8% (Min: 110%) - ⚠️ Under stress
- NSFR: 118.2% (Min: 100%)
- ROA: 0.82% (Target: >0.75%)
- CASA Ratio: 45.8% (Target: >40%)
- And more...

### Alert System
- Real-time alerts for KPIs approaching critical thresholds
- Visual indicators (✓ Good, ⚠ Warning, ⚠ Stressed)
- Color-coded status badges

### Data Export
- CSV export functionality for detailed KPI data
- Downloadable reports for analysis

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with responsive design principles
- **JavaScript (ES6)**: Dynamic functionality and interactivity

### Libraries & Frameworks
- **Chart.js v4.4.7**: Interactive data visualization
- **Custom Plugins**: Horizontal line plugin for threshold indicators

### Design
- Modern, clean UI with professional banking aesthetics
- Color-coded risk categories
- Responsive layout (desktop-optimized)

## 📁 Project Structure

risk_dashboard/ :

├── index.html          # Main dashboard HTML structure
├── styles.css          # Stylesheet with custom designs
├── script.js           # JavaScript logic and chart rendering
└── README.md           # Project documentation (this file)

## 🚀 How to Run

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server setup required (runs locally)

### Steps
1. Clone or download the project folder
2. Navigate to the `risk_dashboard` directory
3. Open `index.html` in your web browser:
   - **Option 1**: Double-click `index.html`
   - **Option 2**: Right-click → Open with → Your preferred browser
   - **Option 3**: Use Live Server extension in VS Code

That's it! The dashboard will load with all interactive features.

## 📊 KPI Definitions

### Credit Risk Metrics
- **Gross NPA Ratio**: Percentage of total advances that are non-performing (90+ days overdue)
- **Net NPA Ratio**: Gross NPAs minus provisions, as a percentage of net advances
- **Provision Coverage Ratio**: Provisions held against NPAs as a percentage of gross NPAs
- **Slippage Ratio**: Fresh NPAs added during the quarter as a percentage of standard assets
- **SMA (Special Mention Accounts)**: Early warning indicators
  - SMA-0: 1-30 days past due
  - SMA-1: 31-60 days past due
  - SMA-2: 61-90 days past due

### Capital Risk Metrics
- **CAR (Capital Adequacy Ratio)**: Total capital as a percentage of risk-weighted assets (Basel III minimum: 12.5%)
- **CET-1 Ratio**: Common Equity Tier 1 capital ratio (Basel III minimum: 10.0%)
- **Leverage Ratio**: Tier 1 capital as a percentage of total exposure (Basel III minimum: 4.0%)

### Liquidity Risk Metrics
- **LCR (Liquidity Coverage Ratio)**: High-quality liquid assets / Net cash outflows over 30 days (Minimum: 110%)
- **NSFR (Net Stable Funding Ratio)**: Available stable funding / Required stable funding (Minimum: 100%)

### Market Risk Metrics
- **NIM (Net Interest Margin)**: Net interest income as a percentage of average earning assets
- **Priority Sector Lending**: Percentage of lending to priority sectors as mandated by RBI (Minimum: 40%)

### Performance Metrics
- **ROA (Return on Assets)**: Net profit as a percentage of total assets
- **ROE (Return on Equity)**: Net profit as a percentage of shareholders' equity
- **CASA Ratio**: Current Account + Savings Account deposits as a percentage of total deposits
- **Cost-to-Income Ratio**: Operating expenses as a percentage of operating income

## 🎨 Dashboard Highlights

### Quarterly Tracking
All KPIs tracked across Q1, Q2, and Q3 of FY 2025-26 with:
- Quarter-over-quarter comparisons
- Trend analysis
- Target achievement status

### Problem Area Analysis
8 identified risk issues with detailed breakdown:
1. Rising NPAs (Credit Risk)
2. Delayed EMI Payments (Credit Risk)
3. Sector-Specific Defaults (Market Risk)
4. Weak Early Warning System (Operational Risk)
5. Poor Recovery Rate (Credit Risk)
6. Loan Restructuring (Capital Risk)
7. Regional Risk Imbalance (Liquidity Risk)
8. Credit Appraisal Gaps (Operational Risk)

Each problem includes:
- Root cause analysis
- Impact assessment
- Associated KPIs
- Severity classification

## ⚠️ Current Alerts

**Critical Alert**: LCR (Liquidity Coverage Ratio) is at 115.8%, only 5.8% above the regulatory floor of 110%. The ratio has declined for 3 consecutive quarters, requiring immediate attention.

## 🔮 Future Enhancements

### Potential Additions
- [ ] Dark mode toggle
- [ ] Real-time data integration with backend APIs
- [ ] User authentication and role-based access
- [ ] PDF report generation
- [ ] Email alerts for threshold breaches
- [ ] Mobile-responsive design optimization
- [ ] Historical data comparison (YoY analysis)
- [ ] Peer bank benchmarking
- [ ] Stress testing scenarios
- [ ] Enhanced Market Risk metrics (VaR, Interest Rate Risk)
- [ ] Drill-down capabilities for detailed analysis
- [ ] Commentary section for each KPI
- [ ] Search and advanced filtering

### Expanded Risk Coverage
- Interest Rate Risk in Banking Book (IRRBB)
- Foreign Exchange Risk metrics
- Concentration Risk indicators
- Reputational Risk tracking
- Environmental, Social, Governance (ESG) risk factors

## 📚 References & Standards

- Reserve Bank of India (RBI) Guidelines
- Basel III Capital Adequacy Framework
- Banking Regulation Act, 1949
- Priority Sector Lending Guidelines
- Prudential Norms on Income Recognition, Asset Classification and Provisioning

## 👨‍💻 Author
**Lakshya Agarwal** 
Year: 2026

## 🙏 Acknowledgmentsin

- State Bank of India for domain context
- Chart.js community for visualization library
- Banking domain experts for KPI validation

**Note**: All data shown in this dashboard is mock/sample data for demonstration purposes and does not represent actual SBI financial figures.
