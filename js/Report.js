const cardsData = [
    { type: "primary", title: " إجمالي الإيرادات", value: "24,500", icon: "fas fa-money-bill-wave", currency: "د.أ" },
    { type: "success", title: "إجمالي المصروفات", value: "8,200", icon: "fas fa-receipt", currency: "د.أ" },
    { type: "warning", title: "معدل الإشغال", value: "85%", icon: "fas fa-home", currency: "" },
    { type: "danger", title: "طلبات الصيانة", value: "12", icon: "fas fa-tools", currency: "" }
];
// Highlight active page in sidebar
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'bar',
    data: {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        datasets: [{
            label: "الإيرادات",
            backgroundColor: "rgba(78, 115, 223, 0.5)",
            borderColor: "rgba(78, 115, 223, 1)",
            borderWidth: 1,
            data: [3500, 4200, 3800, 4100, 4500, 4800, 5200, 5500, 5000, 5300, 5800, 6200],
        }, {
            label: "المصروفات",
            backgroundColor: "rgba(231, 74, 59, 0.5)",
            borderColor: "rgba(231, 74, 59, 1)",
            borderWidth: 1,
            data: [1200, 1500, 1800, 1400, 1600, 2000, 2200, 2100, 1900, 2300, 2500, 2800],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value + ' د.أ';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.raw + ' د.أ';
                    }
                }
            }
        }
    }
});

// Revenue Pie Chart
const revenuePieCtx = document.getElementById('revenuePieChart').getContext('2d');
const revenuePieChart = new Chart(revenuePieCtx, {
    type: 'doughnut',
    data: {
        labels: ["إيجارات", "خدمات", "أخرى"],
        datasets: [{
            data: [85, 10, 5],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        },
        cutout: '70%',
    },
});

// Annual Report Chart
const annualCtx = document.getElementById('annualReportChart').getContext('2d');
const annualChart = new Chart(annualCtx, {
    type: 'line',
    data: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "الإيرادات",
            tension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [35000, 42000, 40000, 45000, 50000, 62000],
        }, {
            label: "المصروفات",
            tension: 0.3,
            backgroundColor: "rgba(231, 74, 59, 0.05)",
            borderColor: "rgba(231, 74, 59, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(231, 74, 59, 1)",
            pointBorderColor: "rgba(231, 74, 59, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(231, 74, 59, 1)",
            pointHoverBorderColor: "rgba(231, 74, 59, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [15000, 18000, 20000, 22000, 25000, 28000],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return value + ' د.أ';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.raw + ' د.أ';
                    }
                }
            }
        }
    }
});

// Print Report Button
document.getElementById('printReportBtn').addEventListener('click', function () {
    window.print();
});

// Export Report Button
document.getElementById('exportReportBtn').addEventListener('click', function () {
    alert('سيتم تصدير التقرير كملف PDF');
    // In a real app, this would generate and download a PDF report
});
