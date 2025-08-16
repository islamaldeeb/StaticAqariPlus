document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('mySidebar')) {
        const sidebar = document.createElement('div');
        sidebar.id = 'mySidebar';
        sidebar.className = 'sidebar';

        sidebar.innerHTML = `
            <div class="text-center py-4">
                <h4 class="text-white fw-bold">Aqari Plus</h4>
                <span class="text-white-50">بوابة المستأجر</span>
            </div>
            <hr class="bg-white-50 mx-3">
            <ul class="nav flex-column">
                <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-fw fa-home"></i><span>الصفحة الرئيسية</span></a></li>
                <li class="nav-item"><a href="pay-rent.html" class="nav-link"><i class="fas fa-fw fa-file-invoice-dollar"></i><span>دفع الإيجار</span></a></li>
                <li class="nav-item"><a href="lease-contracts.html" class="nav-link"><i class="fas fa-fw fa-file-contract"></i><span>عقود الإيجار</span></a></li>
                <li class="nav-item"><a href="maintenance-requests.html" class="nav-link"><i class="fas fa-fw fa-tools"></i><span>طلبات الصيانة</span></a></li>
                <li class="nav-item"><a href="tenant-notifications.html" class="nav-link"><i class="fas fa-fw fa-bell"></i><span>الإشعارات</span></a></li>
                <li class="nav-item"><a href="tenant-chat.html" class="nav-link"><i class="fas fa-fw fa-comments"></i><span>المحادثة</span></a></li>
                <li class="nav-item"><a href="tenant-settings.html" class="nav-link"><i class="fas fa-fw fa-cog"></i><span>الإعدادات</span></a></li>
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