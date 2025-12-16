document.addEventListener('DOMContentLoaded', () => {
  // skills-charts.js

  const skillsData = {
    js: 85,
    python: 80,
    html: 85,
    java: 70
  };

  // JavaScript chart
  new Chart(document.getElementById('jsChart'), {
    type: 'doughnut',
    data: {
      labels: ['JavaScript', 'Remaining'],
      datasets: [{
        data: [skillsData.js, 100 - skillsData.js],
        backgroundColor: ['#f7df1e', '#444'],
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      cutout: '70%',
    }
  });

  new Chart(document.getElementById('javaChart'), {
    type: 'doughnut',
    data: {
      labels: ['Java', 'Remaining'],
      datasets: [{
        data: [skillsData.java, 100 - skillsData.java],
        backgroundColor: ['#b07219', '#444'], 
        borderWidth: 2
      }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '70%' }
  });

  // Python chart
  new Chart(document.getElementById('pythonChart'), {
    type: 'doughnut',
    data: {
      labels: ['Python', 'Remaining'],
      datasets: [{
        data: [skillsData.python, 100 - skillsData.python],
        backgroundColor: ['#306998', '#444'],
        borderWidth: 2
      }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '70%' }
  });

  // HTML chart
  new Chart(document.getElementById('htmlChart'), {
  type: 'doughnut',
  data: {
    labels: ['HTML', 'Remaining'], // This will appear in tooltip and legend
    datasets: [{
      data: [skillsData.html, 100 - skillsData.html],
      backgroundColor: ['#e34f26', '#444'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#fff', // legend text color
          font: { size: 14 }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold', size: 16 },
        formatter: (value, context) => {
          return value + '%';
        }
      }
    },
    cutout: '70%' // keeps the doughnut hollow
  },
  plugins: [ChartDataLabels] // register the plugin
});

  new Chart(document.getElementById('VBScriptChart'), {
    type: 'doughnut',
    data: {
      labels: ['VBScript', 'Remaining'],
      datasets: [{  
        data: [65, 35],
        backgroundColor: ['#6a5acd', '#444'],
        borderWidth: 2
      }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '70%' }
  });
});