document.addEventListener('DOMContentLoaded', function () {
    // Toggle sidebar on mobile

    // Initialize tabs
    const settingsTabs = document.querySelectorAll('#settingsTabs button');
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            const tabId = this.getAttribute('data-bs-target');
            // You can add specific code for each tab if needed
        });
    });

    // Save General Settings
    document.getElementById('generalSettingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const settings = {
            language: document.getElementById('systemLanguage').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value,
            currency: document.getElementById('currency').value,
            darkMode: document.getElementById('enableDarkMode').checked
        };

        console.log('General settings to be saved:', settings);
        alert('تم حفظ الإعدادات العامة بنجاح!');

        // Apply dark mode immediately if changed
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    // Save Payment Settings
    document.getElementById('paymentSettingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const settings = {
            paymentMethods: {
                bankTransfer: document.getElementById('enableBankTransfer').checked,
                creditCard: document.getElementById('enableCreditCard').checked,
                mada: document.getElementById('enableMada').checked,
                applePay: document.getElementById('enableApplePay').checked
            },
            paymentDueDays: document.getElementById('paymentDueDays').value,
            lateFeePercentage: document.getElementById('lateFeePercentage').value,
            bankAccountInfo: document.getElementById('bankAccountInfo').value
        };

        console.log('Payment settings to be saved:', settings);
        alert('تم حفظ إعدادات الدفع بنجاح!');
    });

    // Save Smart Lock Settings
    document.getElementById('smartLockSettingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const settings = {
            enableSmartLocks: document.getElementById('enableSmartLocks').checked,
            autoLockForLatePayments: document.getElementById('autoLockForLatePayments').checked,
            lockGracePeriod: document.getElementById('lockGracePeriod').value,
            lockVendor: document.getElementById('lockVendor').value,
            lockApiKey: document.getElementById('lockApiKey').value
        };

        console.log('Smart lock settings to be saved:', settings);
        alert('تم حفظ إعدادات الأقفال الذكية بنجاح!');
    });

    // Save Security Settings
    document.getElementById('securitySettingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const settings = {
            enable2FA: document.getElementById('enable2FA').checked,
            forceStrongPasswords: document.getElementById('forceStrongPasswords').checked,
            sessionTimeout: document.getElementById('sessionTimeout').checked,
            sessionTimeoutMinutes: document.getElementById('sessionTimeoutMinutes').value,
            passwordChangeDays: document.getElementById('passwordChangeDays').value,
            allowedIPs: document.getElementById('allowedIPs').value.split('\n').filter(ip => ip.trim() !== '')
        };

        console.log('Security settings to be saved:', settings);
        alert('تم حفظ إعدادات الأمان بنجاح!');
    });

    // Save Profile Settings
    document.getElementById('profileSettingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const profileData = {
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value,
            position: document.getElementById('profilePosition').value,
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: document.getElementById('newPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };

        // Basic password validation
        if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقين!');
            return;
        }

        console.log('Profile data to be saved:', profileData);
        alert('تم تحديث الملف الشخصي بنجاح!');

        // Reset password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    // Show/hide session timeout field based on checkbox
    document.getElementById('sessionTimeout').addEventListener('change', function () {
        document.getElementById('sessionTimeoutMinutes').disabled = !this.checked;
    });
});

// تفعيل تبويب الإعدادات المحدد من الرابط
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');

    if (activeTab) {
        const tab = document.querySelector(`#${activeTab}-tab`);
        if (tab) {
            const tabInstance = new bootstrap.Tab(tab);
            tabInstance.show();
        }
    }
});