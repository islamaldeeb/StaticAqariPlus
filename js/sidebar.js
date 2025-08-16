document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('mySidebar')) {
        const sidebar = document.createElement('div');
        sidebar.id = 'mySidebar';
        sidebar.className = 'sidebar';

        sidebar.innerHTML = `
            <div class="text-center py-4">
                <h4 class="text-white fw-bold">Aqari Plus</h4>
                <span class="text-white-50">نظام إدارة العقارات</span>
            </div>
            <hr class="bg-white-50 mx-3">
            <ul class="nav flex-column">
                <li class="nav-item"><a href="admin-dashboard.html" class="nav-link"><i class="fas fa-fw fa-home"></i><span>الصفحة الرئيسية</span></a></li>
                <li class="nav-item"><a href="properties-management.html" class="nav-link"><i class="fas fa-fw fa-building"></i><span>إدارة العقارات</span></a></li>
                <li class="nav-item"><a href="tenants-management.html" class="nav-link"><i class="fas fa-fw fa-users"></i><span>إدارة المستأجرين</span></a></li>
                <li class="nav-item"><a href="payment.html" class="nav-link"><i class="fas fa-fw fa-file-invoice-dollar"></i><span>إدارة الدفعات</span></a></li>
                <li class="nav-item"><a href="maintenance-management.html" class="nav-link"><i class="fas fa-fw fa-tools"></i><span>إدارة الصيانة</span></a></li>
                <li class="nav-item"><a href="Report.html" class="nav-link"><i class="fas fa-fw fa-chart-bar"></i><span>التقارير</span></a></li>
                <li class="nav-item"><a href="smart-locks.html" class="nav-link"><i class="fas fa-fw fa-lock"></i><span>الأقفال الذكية</span></a></li>
                <li class="nav-item"><a href="notifications.html" class="nav-link"><i class="fas fa-fw fa-bell"></i><span>الإشعارات</span></a></li>
                <li class="nav-item"><a href="manager-chat.html" class="nav-link"><i class="fas fa-fw fa-comment"></i><span>المحادثة</span></a></li>
                <li class="nav-item"><a href="settings.html" class="nav-link"><i class="fas fa-fw fa-cog"></i><span>الإعدادات</span></a></li>
            </ul>
        `;

        document.querySelector('.d-flex').prepend(sidebar);
    }

    if (!document.getElementById('menuButton')) {
        const menuBtn = document.createElement('button');
        menuBtn.id = 'menuButton';
        menuBtn.className = 'openbtn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.position = 'fixed';
        menuBtn.style.top = '10px';
        menuBtn.style.right = '10px';
        menuBtn.style.zIndex = '9999';
        menuBtn.style.fontSize = '20px';
        menuBtn.style.border = 'none';
        menuBtn.style.background = 'transparent';
        menuBtn.style.cursor = 'pointer';
        menuBtn.style.color = '#4e73df';

        document.body.appendChild(menuBtn);
    }

    const sidebar = document.getElementById("mySidebar");
    const menuBtn = document.getElementById("menuButton");

    function toggleNav() {
        sidebar.style.width = (sidebar.style.width === "200px") ? "0" : "200px";
    }

    function closeNav() {
        sidebar.style.width = "0";
    }

    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNav();
    });

    document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && e.target !== menuBtn) {
            closeNav();
        }
    });

    sidebar.style.width = "0";

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
