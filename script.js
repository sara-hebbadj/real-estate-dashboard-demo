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

const chartText = uiColor("--muted", "#9faed1");
const chartLabel = uiColor("--text", "#ecf2ff");
const chartGrid = "rgba(159, 174, 209, 0.18)";
const chartPrimary = uiColor("--primary", "#6ea8ff");
const chartAccent = uiColor("--accent", "#9a7bff");
const chartPrimaryStrong = uiColor("--primary-strong", "#4f7cff");

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
  lineGradient.addColorStop(0, "rgba(110, 168, 255, 0.32)");
  lineGradient.addColorStop(1, "rgba(110, 168, 255, 0.04)");

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
  barGradient.addColorStop(0, chartAccent);
  barGradient.addColorStop(1, chartPrimaryStrong);

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
          backgroundColor: [chartPrimaryStrong, chartAccent, "#7ca6ff", "#51d5bf"],
          borderColor: "rgba(13, 20, 40, 0.85)",
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
