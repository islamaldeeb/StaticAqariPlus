document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    $(document).ready(function () {
        $('#smartLocksTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
            },
            columnDefs: [
                { orderable: false, targets: [7] }
            ]
        });
    });

    // متغيرات العد التنازلي
    let countdownInterval;
    let remainingTime = 0;
    let isModalOpen = false;

    // دالة التحقق من صحة النموذج
    function validateLockForm() {
        let isValid = true;
        
        // إعادة تعيين رسائل الخطأ السابقة
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

        // التحقق من اسم القفل
        const lockName = document.getElementById('lockName');
        if (!lockName.value.trim()) {
            lockName.classList.add('is-invalid');
            lockName.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال اسم القفل</div>');
            isValid = false;
        }

        // التحقق من العقار
        const lockProperty = document.getElementById('lockProperty');
        if (!lockProperty.value) {
            lockProperty.classList.add('is-invalid');
            lockProperty.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب اختيار العقار</div>');
            isValid = false;
        }

        // التحقق من نوع القفل
        const lockType = document.getElementById('lockType');
        if (!lockType.value) {
            lockType.classList.add('is-invalid');
            lockType.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب اختيار نوع القفل</div>');
            isValid = false;
        }

        // التحقق من الرقم التسلسلي
        const lockSerial = document.getElementById('lockSerial');
        if (!lockSerial.value.trim()) {
            lockSerial.classList.add('is-invalid');
            lockSerial.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال الرقم التسلسلي</div>');
            isValid = false;
        } else if (isNaN(lockSerial.value)) {
            lockSerial.classList.add('is-invalid');
            lockSerial.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب أن يكون الرقم التسلسلي رقمًا صحيحًا</div>');
            isValid = false;
        }

        // التحقق من تاريخ التركيب (حقل إجباري جديد)
        const lockInstallationDate = document.getElementById('lockInstallationDate');
        if (!lockInstallationDate.value) {
            lockInstallationDate.classList.add('is-invalid');
            lockInstallationDate.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب تحديد تاريخ التركيب</div>');
            isValid = false;
        }

        return isValid;
    }

    // Save new lock مع التحقق من الصحة
    document.getElementById('saveLockBtn').addEventListener('click', function () {
        if (!validateLockForm()) {
            // التركيز على أول حقل به خطأ
            document.querySelector('.is-invalid')?.focus();
            
            // التمرير إلى الحقل الذي به خطأ
            document.querySelector('.is-invalid')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            return;
        }

        const lockData = {
            name: document.getElementById('lockName').value,
            property: document.getElementById('lockProperty').value,
            type: document.getElementById('lockType').value,
            serial: document.getElementById('lockSerial').value,
            installationDate: document.getElementById('lockInstallationDate').value,
            status: document.getElementById('lockStatus').value,
            notes: document.getElementById('lockNotes').value
        };

        console.log('Lock data to be saved:', lockData);
        alert('تم حفظ القفل الذكي بنجاح!');
        
        // إغلاق المودال وإعادة تعيين النموذج
        var modal = bootstrap.Modal.getInstance(document.getElementById('addLockModal'));
        modal.hide();
        document.getElementById('addLockForm').reset();
    });

    // عند فتح نافذة التحكم
    document.getElementById('lockControlModal').addEventListener('show.bs.modal', function () {
        isModalOpen = true;
        resetCountdown();
    });

    // عند إغلاق نافذة التحكم
    document.getElementById('lockControlModal').addEventListener('hidden.bs.modal', function () {
        isModalOpen = false;
    });

    // تحديث العد التنازلي
    function updateCountdown() {
        if (remainingTime > 0) {
            remainingTime--;
            if (isModalOpen) {
                updateCountdownDisplay();
            }

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                if (isModalOpen) {
                    lockAfterCountdown();
                }
            }
        }
    }

    // Lock/Unlock buttons functionality
    document.getElementById('unlockBtn')?.addEventListener('click', function () {
        resetCountdown();
        document.getElementById('lockIcon').classList.remove('fa-lock', 'text-danger');
        document.getElementById('lockIcon').classList.add('fa-lock-open', 'text-success');
        document.getElementById('lockStatusText').textContent = 'مفتوح';

        console.log('Sending unlock command to lock...');
        setTimeout(() => {
            alert('تم فتح القفل بنجاح!');
        }, 1000);
    });

    document.getElementById('lockBtn')?.addEventListener('click', function () {
        resetCountdown();
        document.getElementById('lockIcon').classList.remove('fa-lock-open', 'text-success');
        document.getElementById('lockIcon').classList.add('fa-lock', 'text-danger');
        document.getElementById('lockStatusText').textContent = 'مقفول';

        console.log('Sending lock command to lock...');
        setTimeout(() => {
            alert('تم قفل القفل بنجاح!');
        }, 1000);
    });

    // Temporary unlock functionality
    document.getElementById('tempUnlockBtn')?.addEventListener('click', function () {
        const durationInput = document.getElementById('tempDuration');
        const duration = parseInt(durationInput.value);

        if (isNaN(duration)) {
            alert('الرجاء إدخال مدة صحيحة');
            return;
        }

        if (duration < 1 || duration > 60) {
            alert('المدة يجب أن تكون بين 1 و 60 دقيقة');
            return;
        }

        const lockIcon = document.getElementById('lockIcon');
        const statusText = document.getElementById('lockStatusText');

        lockIcon.classList.remove('fa-lock', 'text-danger');
        lockIcon.classList.add('fa-lock-open', 'text-success');
        statusText.textContent = 'مفتوح مؤقت';

        startCountdown(duration);

        console.log(`Sending temporary unlock command for ${duration} minutes...`);
        alert(`تم فتح القفل مؤقتاً لمدة ${duration} دقيقة. سيتم إغلاقه تلقائياً بعد انتهاء المدة.`);
    });

    // دالة بدء العد التنازلي
    function startCountdown(minutes) {
        resetCountdown();
        remainingTime = minutes * 60;
        updateCountdownDisplay();
        document.getElementById('countdownContainer').style.display = 'block';
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // دالة تحديث عرض العد التنازلي
    function updateCountdownDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        document.getElementById('countdownTimer').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const totalTime = parseInt(document.getElementById('tempDuration').value) * 60;
        const progressPercent = (remainingTime / totalTime) * 100;
        document.getElementById('countdownProgress').style.width = `${progressPercent}%`;

        if (progressPercent < 20) {
            document.getElementById('countdownProgress').classList.remove('bg-warning');
            document.getElementById('countdownProgress').classList.add('bg-danger');
        } else {
            document.getElementById('countdownProgress').classList.remove('bg-danger');
            document.getElementById('countdownProgress').classList.add('bg-warning');
        }
    }

    // دالة إغلاق القفل بعد انتهاء الوقت
    function lockAfterCountdown() {
        const lockIcon = document.getElementById('lockIcon');
        const statusText = document.getElementById('lockStatusText');

        lockIcon.classList.remove('fa-lock-open', 'text-success');
        lockIcon.classList.add('fa-lock', 'text-danger');
        statusText.textContent = 'مقفول';
        document.getElementById('countdownContainer').style.display = 'none';

        console.log('Lock automatically re-engaged after temporary duration');
        alert('تم إغلاق القفل تلقائياً بعد انتهاء المدة المؤقتة.');
    }

    // دالة إعادة تعيين العد التنازلي
    function resetCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        remainingTime = 0;
        document.getElementById('countdownContainer').style.display = 'none';
    }

    // Open control modal when clicking control button
    document.querySelectorAll('.btn-control').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const lockName = row.cells[1].textContent;
            const lockProperty = row.cells[2].textContent;
            const lockStatus = row.cells[4].textContent.includes('مفتوح');

            document.getElementById('lockControlName').textContent = lockName;
            document.getElementById('lockControlProperty').textContent = lockProperty;

            const lockIcon = document.getElementById('lockIcon');
            const statusText = document.getElementById('lockStatusText');

            if (lockStatus) {
                lockIcon.classList.remove('fa-lock', 'text-danger');
                lockIcon.classList.add('fa-lock-open', 'text-success');
                statusText.textContent = 'مفتوح';
            } else {
                lockIcon.classList.remove('fa-lock-open', 'text-success');
                lockIcon.classList.add('fa-lock', 'text-danger');
                statusText.textContent = 'مقفول';
            }

            document.getElementById('tempDuration').value = '15';
            var lockControlModal = new bootstrap.Modal(document.getElementById('lockControlModal'));
            lockControlModal.show();
        });
    });

    // Delete lock confirmation
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', function () {
        alert('تم حذف القفل بنجاح!');
        var modal = bootstrap.Modal.getInstance(document.getElementById('deleteLockModal'));
        modal.hide();
    });
});

const cardsData = [
    { type: "primary", title: "إجمالي الأقفال", value: "12", icon: "fas fa-lock", currency: "" },
    { type: "success", title: "أقفال نشطة", value: "10", icon: "fas fa-check-circle", currency: "" },
    { type: "warning", title: "أقفال غير نشطة", value: "2", icon: "fas fa-exclamation-circle", currency: "" },
    { type: "danger", title: "أقفال مغلقة", value: "3", icon: "fas fa-lock-open", currency: "" }
];

// MQTT Client for Smart Locks
const mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('smartlock/status');
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'smartlock/status') {
        const status = message.toString();
        console.log('Lock status update:', status);
        // يمكنك هنا تحديث واجهة المستخدم بناءً على حالة القفل
    }
});

// وظيفة التحكم في القفل
function controlLock(action, duration = 0) {
    let message = '';
    if (action === 'unlock') {
        message = 'unlock';
    } else if (action === 'lock') {
        message = 'lock';
    } else if (action === 'temp_unlock') {
        message = `temp_unlock:${duration}`;
    }
    
    mqttClient.publish('smartlock/control', message);
    console.log('Sent lock command:', message);
}

// تعديل وظائف الأزرار في الموقع لاستخدام MQTT
document.getElementById('unlockBtn')?.addEventListener('click', function() {
    controlLock('unlock');
});

document.getElementById('lockBtn')?.addEventListener('click', function() {
    controlLock('lock');
});

document.getElementById('tempUnlockBtn')?.addEventListener('click', function() {
    const duration = parseInt(document.getElementById('tempDuration').value);
    if (duration >= 1 && duration <= 60) {
        controlLock('temp_unlock', duration);
    } else {
        alert('المدة يجب أن تكون بين 1 و 60 دقيقة');
    }
});