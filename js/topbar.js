
function loadTopbar() {
    const topbarContainer = document.getElementById('topbar-container');
    if (!topbarContainer) return;

    topbarContainer.innerHTML = `
        <!-- شريط التنقل العلوي -->
        <nav class="topbar navbar navbar-expand">
            <div class="container-fluid">
              
                        <div class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                            <h1><p class="styled-text-aqari">Aqari plus</p></h1> 
                        </div>
                 
                
                <!-- قائمة الأدوات العلوية -->
                <ul class="navbar-nav ms-auto">
                    <!-- تنبيهات -->
                    <li class="nav-item dropdown no-arrow mx-1">
                        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-bell fa-fw"></i>
                            <span class="badge bg-danger notification-badge">3</span>
                        </a>
                        <!-- قائمة التنبيهات -->
                        <div class="dropdown-menu dropdown-menu-end shadow">
                            <h6 class="dropdown-header">مركز التنبيهات</h6>
                            <a class="dropdown-item d-flex align-items-center" href="notifications.html?type=invoice">
                                <div class="me-3">
                                    <div class="icon-circle bg-primary">
                                        <i class="fas fa-file-alt text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="small text-gray-500">أبريل 5, 2025</div>
                                    <span class="fw-bold">فاتورة جديدة جاهزة!</span>
                                </div>
                            </a>
                            <a class="dropdown-item d-flex align-items-center" href="notifications.html?type=payment">
                                <div class="me-3">
                                    <div class="icon-circle bg-success">
                                        <i class="fas fa-donate text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="small text-gray-500">أبريل 1, 2025</div>
                                    500 د.أ تم تحصيلها من المستأجر أحمد محمد
                                </div>
                            </a>
                            <a class="dropdown-item d-flex align-items-center" href="notifications.html?type=maintenance">
                                <div class="me-3">
                                    <div class="icon-circle bg-warning">
                                        <i class="fas fa-exclamation-triangle text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="small text-gray-500">مارس 28, 2025</div>
                                    طلب صيانة عاجل في الوحدة 305
                                </div>
                            </a>
                            <a class="dropdown-item text-center small text-gray-500" href="notifications.html">عرض جميع التنبيهات</a>
                        </div>
                    </li>
                    
                    <div class="topbar-divider d-none d-sm-block"></div>
                    
                    <!-- معلومات المستخدم -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                            <span class="me-2 d-none d-lg-inline text-gray-600 small">مدير العقار</span>
                        </a>
                        <!-- قائمة المستخدم -->
                        <div class="dropdown-menu dropdown-menu-end shadow">
                            <a class="dropdown-item" href="settings.html?tab=profile">
                                <i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                                الملف الشخصي
                            </a>
                            <a class="dropdown-item" href="settings.html?tab=settings">
                                <i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                                الإعدادات
                            </a>
                           
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                                تسجيل الخروج
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- مودال تسجيل الخروج -->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">تأكيد تسجيل الخروج</h5>
                        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">هل أنت متأكد أنك تريد تسجيل الخروج؟</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">إلغاء</button>
                        <a class="btn btn-primary" href="login.html">تسجيل الخروج</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// تهيئة الشريط العلوي عند تحميل الصفحة
if (document.readyState === 'complete') {
    loadTopbar();
} else {
    document.addEventListener('DOMContentLoaded', loadTopbar);
}