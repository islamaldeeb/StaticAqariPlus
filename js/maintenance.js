document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    $(document).ready(function () {
        $('#maintenanceTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
            },
            columnDefs: [
                { orderable: false, targets: [0, 8] } // Disable sorting for specific columns
            ]
        });
    });

    // Function to validate maintenance form
    function validateMaintenanceForm() {
        let isValid = true;
        
        // Reset previous errors
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

        // Validate tenant (المستأجر)
        const tenantSelect = document.getElementById('maintenanceTenant');
        if (tenantSelect.value === "" || tenantSelect.value === null) {
            tenantSelect.classList.add('is-invalid');
            const tenantContainer = tenantSelect.closest('.mb-3');
            if (!tenantContainer.querySelector('.invalid-feedback')) {
                tenantSelect.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب اختيار المستأجر من القائمة</div>');
            }
            isValid = false;
        }

        // Validate problem type (نوع المشكلة)
        const typeSelect = document.getElementById('maintenanceType');
        if (typeSelect.value === "" || typeSelect.value === null) {
            typeSelect.classList.add('is-invalid');
            const typeContainer = typeSelect.closest('.mb-3');
            if (!typeContainer.querySelector('.invalid-feedback')) {
                typeSelect.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب اختيار نوع المشكلة من القائمة</div>');
            }
            isValid = false;
        }

        // Validate description (وصف المشكلة)
        const descriptionTextarea = document.getElementById('maintenanceDescription');
        if (!descriptionTextarea.value.trim() || descriptionTextarea.value.trim().length < 10) {
            descriptionTextarea.classList.add('is-invalid');
            const descContainer = descriptionTextarea.closest('.mb-3');
            if (!descContainer.querySelector('.invalid-feedback')) {
                descriptionTextarea.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال وصف مفصل للمشكلة (10 أحرف على الأقل)</div>');
            }
            isValid = false;
        }

        return isValid;
    }

    // Save maintenance request
    document.getElementById('saveMaintenanceBtn').addEventListener('click', function () {
        if (!validateMaintenanceForm()) {
            // Focus on first invalid field
            const firstInvalid = document.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                
                // Scroll to the error
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            return;
        }

        const formData = {
            tenant: document.getElementById('maintenanceTenant').value,
            type: document.getElementById('maintenanceType').value,
            description: document.getElementById('maintenanceDescription').value,
            priority: document.getElementById('maintenancePriority').value,
            technician: document.getElementById('maintenanceTechnician')?.value
        };

        console.log('Maintenance request to be saved:', formData);

        // Simulate successful save
        alert('تم حفظ طلب الصيانة بنجاح!');
        var modal = bootstrap.Modal.getInstance(document.getElementById('addMaintenanceModal'));
        modal.hide();

        // Reset form
        document.getElementById('addMaintenanceForm').reset();
    });

    // Save technician
    document.getElementById('saveTechnicianBtn').addEventListener('click', function () {
        const formData = {
            name: document.getElementById('technicianName').value,
            specialty: document.getElementById('technicianSpecialty').value,
            phone: document.getElementById('technicianPhone').value
        };

        console.log('Technician data to be saved:', formData);

        // Simulate successful save
        alert('تم حفظ الفني بنجاح!');
        var modal = bootstrap.Modal.getInstance(document.getElementById('addTechnicianModal'));
        modal.hide();

        // Reset form
        document.getElementById('addTechnicianForm').reset();
    });
});

const cardsData = [
    { type: "primary", title: "طلبات الصيانة", value: "24", icon: "fas fa-tools", currency: "" },
    { type: "success", title: "طلبات مكتملة", value: "18", icon: "fas fa-check-circle", currency: "" },
    { type: "warning", title: "طلبات قيد التنفيذ", value: "4", icon: "fas fa-clock", currency: "" },
    { type: "danger", title: "طلبات عاجلة", value: "2", icon: "fas fa-exclamation-triangle", currency: "" }
];