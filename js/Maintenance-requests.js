
const cardsData = [
    { type: "primary", title: "الطلبات الجديدة", value: "1", icon: "fas fa-tools", currency: "", currency2: "" },
    { type: "success", title: "مكتملة", value: "1", icon: "fas fa-check-circle", currency: "", currency2: "" },
    { type: "warning", title: "قيد التنفيذ", value: "1", icon: "fas fa-spinner", currency: "", currency2: "" },
    { type: "danger", title: "ملغاة", value: "0", icon: "fas fa-times-circle", currency: "", currency2: "" }
];
// Image modal handler
document.querySelectorAll('.maintenance-img').forEach(img => {
    img.addEventListener('click', function () {
        document.getElementById('modalImage').src = this.src;
        document.getElementById('downloadImageBtn').href = this.src;
        document.getElementById('downloadImageBtn').setAttribute('download', 'صيانه-' + new Date().toISOString().slice(0, 10) + '.jpg');
    });
});

// Set minimum date for preferred date to today
document.getElementById('preferredDate').min = new Date().toISOString().split('T')[0];

// Image preview for new maintenance form
document.getElementById('issueImages').addEventListener('change', function () {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';

    if (this.files.length > 5) {
        alert('يمكنك رفع حتى 5 صور فقط');
        this.value = '';
        return;
    }

    Array.from(this.files).forEach(file => {
        if (!file.type.match('image.*')) {
            alert('الرجاء اختيار ملفات صور فقط (JPEG, PNG)');
            this.value = '';
            preview.innerHTML = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('حجم الصورة يجب أن يكون أقل من 5MB');
            this.value = '';
            preview.innerHTML = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('img-thumbnail');
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.marginRight = '5px';
            img.style.marginBottom = '5px';
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
});

// Submit maintenance request
document.getElementById('submitMaintenanceBtn').addEventListener('click', function () {
    const form = document.getElementById('maintenanceForm');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const formData = {
        issueType: document.getElementById('issueType').value,
        priority: document.getElementById('priority').value,
        propertyLocation: document.getElementById('propertyLocation').value,
        description: document.getElementById('issueDescription').value,
        preferredDate: document.getElementById('preferredDate').value,
        preferredTime: document.getElementById('preferredTime').value,
        allowEntry: document.getElementById('allowEntry').checked,
        images: document.getElementById('issueImages').files.length
    };

    console.log('Maintenance request data:', formData);

    // Simulate successful submission
    const toast = `
                <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-success text-white">
                            <strong class="me-auto">نجاح</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            تم إرسال طلب الصيانة بنجاح! رقم الطلب: #MT-2025-128
                        </div>
                    </div>
                </div>
            `;

    document.body.insertAdjacentHTML('beforeend', toast);

    // Hide toast after 5 seconds
    setTimeout(() => {
        const toastElement = document.querySelector('.toast');
        if (toastElement) {
            const bsToast = new bootstrap.Toast(toastElement);
            bsToast.hide();
        }
    }, 5000);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newMaintenanceModal'));
    modal.hide();

    // Reset form
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('imagePreview').innerHTML = '';

    // In a real app, you would add the new request to the table
});

// Details modal handler
const detailsModal = document.getElementById('detailsModal');
if (detailsModal) {
    detailsModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const requestId = button.getAttribute('data-id');
        document.getElementById('requestNumber').textContent = '#' + requestId;

        // In a real app, you would fetch the details from an API based on requestId
        // This is just a simulation
        if (requestId === 'MT-2025-125') {
            document.getElementById('detailType').textContent = 'سباكة';
            document.getElementById('detailPriority').textContent = 'عاجل';
            document.getElementById('detailPriority').className = 'priority-high';
            document.getElementById('detailDate').textContent = '15/11/2025';
            document.getElementById('detailStatus').innerHTML = '<i class="fas fa-check-circle me-1"></i> مكتمل';
            document.getElementById('detailStatus').className = 'status-badge status-completed';
            document.getElementById('detailLocation').textContent = 'المطبخ';
            document.getElementById('detailDescription').textContent = 'تسرب مياه من تحت حوض المطبخ';

            // Set images
            const imagesContainer = document.getElementById('detailImages');
            imagesContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = 'https://source.unsplash.com/random/300x200/?plumbing';
            img.className = 'maintenance-img me-2 mb-2';
            img.setAttribute('data-bs-toggle', 'modal');
            img.setAttribute('data-bs-target', '#imageModal');
            img.setAttribute('alt', 'صورة المشكلة');
            imagesContainer.appendChild(img);
        } else if (requestId === 'MT-2025-126') {
            document.getElementById('detailType').textContent = 'كهرباء';
            document.getElementById('detailPriority').textContent = 'متوسط';
            document.getElementById('detailPriority').className = 'priority-medium';
            document.getElementById('detailDate').textContent = '02/04/2025';
            document.getElementById('detailStatus').innerHTML = '<i class="fas fa-spinner me-1"></i> قيد التنفيذ';
            document.getElementById('detailStatus').className = 'status-badge status-in-progress';
            document.getElementById('detailLocation').textContent = 'غرفة المعيشة';
            document.getElementById('detailDescription').textContent = 'إصلاح مفتاح الإضاءة في غرفة المعيشة';

            // Set images
            const imagesContainer = document.getElementById('detailImages');
            imagesContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = 'https://source.unsplash.com/random/300x200/?electricity';
            img.className = 'maintenance-img me-2 mb-2';
            img.setAttribute('data-bs-toggle', 'modal');
            img.setAttribute('data-bs-target', '#imageModal');
            img.setAttribute('alt', 'صورة المشكلة');
            imagesContainer.appendChild(img);
        } else if (requestId === 'MT-2025-127') {
            document.getElementById('detailType').textContent = 'تكييف';
            document.getElementById('detailPriority').textContent = 'عاجل';
            document.getElementById('detailPriority').className = 'priority-high';
            document.getElementById('detailDate').textContent = '05/04/2025';
            document.getElementById('detailStatus').innerHTML = '<i class="fas fa-clock me-1"></i> قيد المراجعة';
            document.getElementById('detailStatus').className = 'status-badge status-pending';
            document.getElementById('detailLocation').textContent = 'غرفة النوم الرئيسية';
            document.getElementById('detailDescription').textContent = 'المكيف لا يعمل بشكل صحيح ويصدر أصوات غريبة';

            // Set images
            const imagesContainer = document.getElementById('detailImages');
            imagesContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = 'https://source.unsplash.com/random/300x200/?ac';
            img.className = 'maintenance-img me-2 mb-2';
            img.setAttribute('data-bs-toggle', 'modal');
            img.setAttribute('data-bs-target', '#imageModal');
            img.setAttribute('alt', 'صورة المشكلة');
            imagesContainer.appendChild(img);
        }
    });
}

// Print details
document.getElementById('printDetailsBtn').addEventListener('click', function () {
    window.print();
});

// Refresh table
document.getElementById('refreshTable').addEventListener('click', function () {
    location.reload();
});

// Apply filter
document.getElementById('applyFilterBtn').addEventListener('click', function () {
    // In a real app, you would filter the table based on selected filters
    const modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
    modal.hide();

    alert('تم تطبيق التصفية بنجاح');
});

// Reset filter
document.getElementById('resetFilterBtn').addEventListener('click', function () {
    document.getElementById('filterForm').reset();
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        this.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
}

