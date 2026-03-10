const dateDisplay = document.getElementById('current-date');
const now = new Date();
dateDisplay.textContent = now.toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#334155',
        font: {
          family: 'Inter'
        }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#64748B' },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#64748B' },
      grid: { color: '#E2E8F0' }
    }
  }
};

new Chart(document.getElementById('priceTrendChart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Property Price (AED)',
        data: [1650000, 1710000, 1680000, 1775000, 1840000, 1920000],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.18)',
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#2563EB'
      }
    ]
  },
  options: commonOptions
});

new Chart(document.getElementById('areaSalesChart'), {
  type: 'bar',
  data: {
    labels: ['Dubai Marina', 'Palm Jumeirah', 'Downtown Dubai', 'Business Bay', 'JVC'],
    datasets: [
      {
        label: 'Sales (AED M)',
        data: [6.8, 8.9, 7.4, 5.7, 4.8],
        backgroundColor: ['#2563EB', '#3B82F6', '#6366F1', '#818CF8', '#93C5FD'],
        borderRadius: 8
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

new Chart(document.getElementById('typeDistributionChart'), {
  type: 'pie',
  data: {
    labels: ['Apartments', 'Villas', 'Townhouses', 'Commercial'],
    datasets: [
      {
        data: [45, 25, 18, 12],
        backgroundColor: ['#2563EB', '#6366F1', '#60A5FA', '#A5B4FC'],
        borderColor: '#FFFFFF',
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#334155',
          padding: 16,
          font: {
            family: 'Inter'
          }
        }
      }
    }
  }
});
