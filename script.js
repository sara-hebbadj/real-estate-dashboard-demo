const dateDisplay = document.getElementById("current-date");
if (dateDisplay) {
  const now = new Date();
  dateDisplay.textContent = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

const chartFont = {
  family: "Inter",
  weight: "500"
};

const css = getComputedStyle(document.documentElement);
const uiColor = (variable, fallback) => css.getPropertyValue(variable).trim() || fallback;

const chartText = uiColor("--muted", "#9cb0d1");
const chartLabel = uiColor("--text", "#f2f6ff");
const chartGrid = "rgba(207, 174, 102, 0.16)";
const chartPrimary = uiColor("--primary", "#cfae66");
const chartAccent = uiColor("--accent", "#d8b978");
const chartPrimaryStrong = uiColor("--primary-strong", "#e2c586");

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: chartLabel,
        font: chartFont
      }
    }
  },
  scales: {
    x: {
      ticks: { color: chartText, font: chartFont },
      grid: { color: chartGrid, drawBorder: false }
    },
    y: {
      ticks: { color: chartText, font: chartFont },
      grid: { color: chartGrid, drawBorder: false }
    }
  }
};

const priceTrendCanvas = document.getElementById("priceTrendChart");
if (priceTrendCanvas) {
  const lineCtx = priceTrendCanvas.getContext("2d");
  const lineGradient = lineCtx.createLinearGradient(0, 0, 0, 300);
  lineGradient.addColorStop(0, "rgba(207, 174, 102, 0.22)");
  lineGradient.addColorStop(1, "rgba(207, 174, 102, 0.03)");

  new Chart(priceTrendCanvas, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Average Property Price (AED)",
          data: [1650000, 1710000, 1680000, 1775000, 1840000, 1920000],
          borderColor: chartPrimary,
          backgroundColor: lineGradient,
          borderWidth: 3,
          fill: true,
          tension: 0.42,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: chartPrimary
        }
      ]
    },
    options: commonOptions
  });
}

const areaSalesCanvas = document.getElementById("areaSalesChart");
if (areaSalesCanvas) {
  const barCtx = areaSalesCanvas.getContext("2d");
  const barGradient = barCtx.createLinearGradient(0, 0, 0, 280);
  barGradient.addColorStop(0, chartPrimaryStrong);
  barGradient.addColorStop(1, chartAccent);

  new Chart(areaSalesCanvas, {
    type: "bar",
    data: {
      labels: ["Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "Business Bay", "JVC"],
      datasets: [
        {
          label: "Sales (AED M)",
          data: [6.8, 8.9, 7.4, 5.7, 4.8],
          backgroundColor: barGradient,
          borderRadius: 10,
          borderSkipped: false,
          maxBarThickness: 34
        }
      ]
    },
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false }
      }
    }
  });
}

const typeDistributionCanvas = document.getElementById("typeDistributionChart");
if (typeDistributionCanvas) {
  new Chart(typeDistributionCanvas, {
    type: "pie",
    data: {
      labels: ["Apartments", "Villas", "Townhouses", "Commercial"],
      datasets: [
        {
          data: [45, 25, 18, 12],
          backgroundColor: [chartPrimaryStrong, chartAccent, "#d8c089", "#9a7f44"],
          borderColor: "#08162b",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: chartLabel,
            padding: 16,
            font: chartFont
          }
        }
      }
    }
  });
}

const generateReportButton = document.getElementById("generate-report");
if (generateReportButton) {
  generateReportButton.addEventListener("click", () => {
    const csv = [
      "Metric,Value",
      "Closed Revenue,14600000",
      "Average Deal Size,1950000",
      "Commission Collected,292000",
      "Deals Closed,56"
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Monthly_Performance_Report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}
