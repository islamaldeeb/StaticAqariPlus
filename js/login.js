document.addEventListener('DOMContentLoaded', function () {
    // بيانات المستخدمين الافتراضية
    const users = {
        tenant: {
            email: "user@aqari.com",
            password: "user123",
            name: "أحمد محمد",
            type: "tenant"
        },
        manager: {
            email: "admin@aqari.com",
            password: "admin123",
            name: "مدير العقار",
            type: "manager"
        }
    };

    // عناصر DOM
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    const loginForm = document.getElementById('loginForm');

    // تبديل رؤية كلمة المرور
    togglePasswordBtn.addEventListener('click', function () {
        const icon = this.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    // اختيار نوع المستخدم
    
    // معالجة تسجيل الدخول
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // تحديد نوع المستخدم المختار
        

        // التحقق من بيانات الدخول
        const authenticatedUser = authenticateUser(email, password);

        if (authenticatedUser) {
            // حفظ بيانات المستخدم في localStorage إذا اختار "تذكرني"
            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({
                    email: authenticatedUser.email,
                    type: authenticatedUser.type
                }));
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // حفظ بيانات الجلسة
            sessionStorage.setItem('currentUser', JSON.stringify(authenticatedUser));

            // توجيه المستخدم حسب نوعه
            redirectUser(authenticatedUser.type);
        } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    });

    // التحقق من تذكر المستخدم عند تحميل الصفحة
    checkRememberedUser();

    // دالة المصادقة
    function authenticateUser(email, password) {
        // البحث عن المستخدم المناسب
        for (const key in users) {
            const user = users[key];
            if (user.email === email &&
                user.password === password ) {
                return user;
            }
        }
        return null;
    }

    // دالة التحقق من المستخدم المذكر
    function checkRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const user = JSON.parse(rememberedUser);
            document.getElementById('email').value = user.email;

            // تحديد نوع المستخدم المذكر
           
            document.getElementById('rememberMe').checked = true;
        }
    }

    // دالة توجيه المستخدم
    function redirectUser(userType) {
        const redirectUrls = {
            'manager': 'admin-dashboard.html',
            'tenant': 'index.html'
        };

        window.location.href = redirectUrls[userType] || redirectUrls['tenant'];
    }
});