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

const chartText = uiColor("--muted", "#61708f");
const chartLabel = uiColor("--text", "#14233f");
const chartGrid = "rgba(126, 145, 180, 0.22)";
const chartPrimary = uiColor("--primary", "#2f63ff");
const chartAccent = uiColor("--accent", "#7a7ff6");
const chartPrimaryStrong = uiColor("--primary-strong", "#2349c6");

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
  lineGradient.addColorStop(0, "rgba(47, 99, 255, 0.2)");
  lineGradient.addColorStop(1, "rgba(47, 99, 255, 0.02)");

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
          backgroundColor: [chartPrimaryStrong, chartAccent, "#5f8dff", "#34b78f"],
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
            color: chartLabel,
            padding: 16,
            font: chartFont
          }
        }
      }
    }
  });
}


const downloadBlob = (filename, content, type = "text/csv;charset=utf-8;") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const excelTemplateLinks = document.querySelectorAll("[data-excel-template]");
excelTemplateLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const name = link.getAttribute("data-excel-template") || "Template";
    const csv = [
      "Field,Value",
      "Agent,Sample Agent",
      "Property,Sample Property",
      "Stage,Viewing",
      "Expected Close Date,2026-06-30",
      "Commission (AED),25000"
    ].join("\n");
    downloadBlob(`${name}.csv`, csv);
  });
});

const excelPackLink = document.querySelector("[data-excel-pack]");
if (excelPackLink) {
  excelPackLink.addEventListener("click", (event) => {
    event.preventDefault();
    const csv = [
      "Report,Status",
      "Weekly Viewings,Included",
      "Commission Tracker,Included",
      "Inventory Valuation,Included"
    ].join("\n");
    downloadBlob("PrimeEstate_Excel_Pack.csv", csv);
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
    downloadBlob("Monthly_Performance_Report.csv", csv);
  });
}
