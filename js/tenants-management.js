// tenants-management.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    const tenantsTable = $('#tenantsTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
        },
        columnDefs: [
            { orderable: false, targets: [0, 1, 8] }
        ],
        dom: '<"top"lf>rt<"bottom"ip>',
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50, 100]
    });

    // Format phone number function
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0 && !value.startsWith('07')) {
            value = '07' + value.substring(2);
        }
        
        if (value.length > 3) {
            value = value.substring(0, 3) + '-' + value.substring(3, 10);
        }
        
        input.value = value;
        return value.length === 10 && value.match(/07\d-\d{7}/);
    }

    // Phone number input event
    document.getElementById('tenantPhone')?.addEventListener('input', function() {
        const isValid = formatPhoneNumber(this);
        this.setCustomValidity(isValid ? '' : 'يجب أن يكون الرقم 10 أرقام (مثال: 079-1234567)');
    });

    // Update units when property changes
    document.getElementById('tenantProperty')?.addEventListener('change', function() {
        const unitSelect = document.getElementById('tenantUnit');
        unitSelect.innerHTML = '<option value="" selected disabled>اختر الوحدة...</option>';

        const units = {
            '1': ['101', '102', '201', '202', '301', '302', '303', '304', '305', '306'],
            '2': ['فيلا كاملة'],
            '3': ['مكتب 1', 'مكتب 2', 'مكتب 3', 'مكتب 4'],
            '4': ['منزل كامل'],
            '5': ['مكتب كامل']
        };

        const propertyUnits = units[this.value] || [];
        propertyUnits.forEach(unit => {
            const option = new Option(unit, unit);
            unitSelect.add(option);
        });
    });

    // Set end date based on start date
    document.getElementById('startDate')?.addEventListener('change', function() {
        if (this.value) {
            const endDate = new Date(this.value);
            endDate.setFullYear(endDate.getFullYear() + 1);
            document.getElementById('endDate').value = endDate.toISOString().split('T')[0];
        }
    });

    // Validate tenant form
    function validateTenantForm() {
        let isValid = true;
        const form = document.getElementById('addTenantForm');
        
        // Reset validation
        form.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
            const feedback = el.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        });

        // Validate required fields
        const requiredFields = [
            { id: 'tenantName', message: 'يجب إدخال الاسم الكامل' },
            { id: 'tenantEmail', message: 'يجب إدخال بريد إلكتروني صحيح', 
              validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
            { id: 'tenantPhone', message: 'يجب إدخال رقم هاتف صحيح (مثال: 079-1234567)',
              validate: (value) => value.match(/07\d-\d{7}/) },
            { id: 'tenantId', message: 'يجب إدخال رقم هوية/إقامة صحيح (10 أرقام)',
              validate: (value) => value.length === 10 && !isNaN(value) },
            { id: 'tenantProperty', message: 'يجب اختيار العقار' },
            { id: 'tenantUnit', message: 'يجب اختيار الوحدة السكنية' },
            { id: 'startDate', message: 'يجب تحديد تاريخ بدء العقد' },
            { id: 'endDate', message: 'يجب تحديد تاريخ انتهاء العقد' },
            { id: 'rentAmount', message: 'يجب إدخال قيمة إيجار صحيحة',
              validate: (value) => !isNaN(value) && parseFloat(value) > 0 }
        ];

        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();
            let fieldValid = true;

            if (field.validate) {
                fieldValid = field.validate(value);
            } else {
                fieldValid = value !== '';
            }

            if (!fieldValid) {
                input.classList.add('is-invalid');
                input.insertAdjacentHTML('afterend', 
                    `<div class="invalid-feedback">${field.message}</div>`);
                isValid = false;
                
                if (field.id === 'endDate' && document.getElementById('startDate').value) {
                    const startDate = new Date(document.getElementById('startDate').value);
                    const endDate = new Date(value);
                    if (endDate <= startDate) {
                        input.insertAdjacentHTML('afterend',
                            `<div class="invalid-feedback">يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء</div>`);
                    }
                }
            }
        });

        return isValid;
    }

    // Save tenant handler
    document.getElementById('saveTenantBtn')?.addEventListener('click', function() {
        if (!validateTenantForm()) {
            const firstInvalid = document.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const formData = {
            name: document.getElementById('tenantName').value,
            email: document.getElementById('tenantEmail').value,
            phone: document.getElementById('tenantPhone').value,
            idNumber: document.getElementById('tenantId').value,
            property: document.getElementById('tenantProperty').value,
            unit: document.getElementById('tenantUnit').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            rentAmount: document.getElementById('rentAmount').value,
            notes: document.getElementById('tenantNotes').value
        };

        console.log('Form data:', formData);
        alert('تم حفظ المستأجر بنجاح!');
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('addTenantModal'));
        modal.hide();
        document.getElementById('addTenantForm').reset();
    });

    // Delete tenant handler
    const deleteModal = document.getElementById('deleteTenantModal');
    if (deleteModal) {
        deleteModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const tenantId = button.getAttribute('data-tenant-id');
            
            document.getElementById('confirmDeleteTenantBtn').onclick = function() {
                console.log('Deleting tenant:', tenantId);
                alert('تم حذف المستأجر بنجاح!');
                bootstrap.Modal.getInstance(deleteModal).hide();
                // In real app: refresh table or remove the row
            };
        });
    }
});

// Cards data
const cardsData = [
    { type: "primary", title: "إجمالي المستأجرين", value: "24", icon: "fas fa-users", currency: "" },
    { type: "success", title: "مستأجرين نشطين", value: "18", icon: "fas fa-user-check", currency: "" },
    { type: "warning", title: "دفعات متأخرة", value: "5", icon: "fas fa-exclamation-triangle", currency: "" },
    { type: "danger", title: "عقود منتهية", value: "1", icon: "fas fa-file-contract", currency: "" }
];