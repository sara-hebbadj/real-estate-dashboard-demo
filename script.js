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

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#334155",
        font: chartFont
      }
    }
  },
  scales: {
    x: {
      ticks: { color: "#64748b", font: chartFont },
      grid: { color: "rgba(148, 163, 184, 0.12)", drawBorder: false }
    },
    y: {
      ticks: { color: "#64748b", font: chartFont },
      grid: { color: "rgba(148, 163, 184, 0.15)", drawBorder: false }
    }
  }
};

const priceTrendCanvas = document.getElementById("priceTrendChart");
if (priceTrendCanvas) {
  const lineCtx = priceTrendCanvas.getContext("2d");
  const lineGradient = lineCtx.createLinearGradient(0, 0, 0, 300);
  lineGradient.addColorStop(0, "rgba(37, 99, 235, 0.25)");
  lineGradient.addColorStop(1, "rgba(37, 99, 235, 0.02)");

  new Chart(priceTrendCanvas, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Average Property Price (AED)",
          data: [1650000, 1710000, 1680000, 1775000, 1840000, 1920000],
          borderColor: "#2563EB",
          backgroundColor: lineGradient,
          borderWidth: 3,
          fill: true,
          tension: 0.42,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: "#2563EB"
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
  barGradient.addColorStop(0, "#6366F1");
  barGradient.addColorStop(1, "#2563EB");

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
          backgroundColor: ["#2563EB", "#6366F1", "#8B5CF6", "#93C5FD"],
          borderColor: "#ffffff",
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
            color: "#334155",
            padding: 16,
            font: chartFont
          }
        }
      }
    }
  });
}
