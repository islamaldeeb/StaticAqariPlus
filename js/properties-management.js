// properties-management.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    $(document).ready(function () {
        $('#propertiesTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
            },
            columnDefs: [
                { orderable: false, targets: [0, 7] } // Disable sorting for image and actions columns
            ]
        });
    });

    // Auto-fill vacant units when total units change
    document.getElementById('propertyUnits')?.addEventListener('change', function () {
        const vacantUnitsInput = document.getElementById('propertyVacantUnits');
        if (!vacantUnitsInput.value) {
            vacantUnitsInput.value = this.value;
        }
    });

    // Function to validate property form
    function validatePropertyForm() {
        let isValid = true;
        
        // Reset previous errors
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

        // Validate property name
        const propertyName = document.getElementById('propertyName');
        if (!propertyName.value.trim()) {
            propertyName.classList.add('is-invalid');
            propertyName.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال اسم العقار</div>');
            isValid = false;
        }

        // Validate property type
        const propertyType = document.getElementById('propertyType');
        if (!propertyType.value) {
            propertyType.classList.add('is-invalid');
            propertyType.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب اختيار نوع العقار</div>');
            isValid = false;
        }

        // Validate address
        const propertyAddress = document.getElementById('propertyAddress');
        if (!propertyAddress.value.trim()) {
            propertyAddress.classList.add('is-invalid');
            propertyAddress.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال عنوان العقار</div>');
            isValid = false;
        }

        // Validate city
        const propertyCity = document.getElementById('propertyCity');
        if (!propertyCity.value.trim()) {
            propertyCity.classList.add('is-invalid');
            propertyCity.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال المدينة</div>');
            isValid = false;
        }

        // Validate units (إجباري)
        const propertyUnits = document.getElementById('propertyUnits');
        if (!propertyUnits.value || isNaN(propertyUnits.value) || parseInt(propertyUnits.value) < 1) {
            propertyUnits.classList.add('is-invalid');
            propertyUnits.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال عدد وحدات صحيح (1 على الأقل)</div>');
            isValid = false;
        }

        // Validate vacant units (إجباري)
        const propertyVacantUnits = document.getElementById('propertyVacantUnits');
        if (!propertyVacantUnits.value || 
            isNaN(propertyVacantUnits.value) || 
            parseInt(propertyVacantUnits.value) < 0 || 
            parseInt(propertyVacantUnits.value) > parseInt(propertyUnits.value || 0)) {
            propertyVacantUnits.classList.add('is-invalid');
            propertyVacantUnits.insertAdjacentHTML('afterend', '<div class="invalid-feedback">يجب إدخال عدد وحدات شاغرة صحيح (بين 0 وعدد الوحدات الكلي)</div>');
            isValid = false;
        }

        // Validate year (إجباري)
        const propertyYear = document.getElementById('propertyYear');
        const currentYear = new Date().getFullYear();
        if (!propertyYear.value || 
            isNaN(propertyYear.value) || 
            parseInt(propertyYear.value) < 1900 || 
            parseInt(propertyYear.value) > currentYear) {
            propertyYear.classList.add('is-invalid');
            propertyYear.insertAdjacentHTML('afterend', `<div class="invalid-feedback">يجب إدخال سنة بناء صحيحة (بين 1900 و${currentYear})</div>`);
            isValid = false;
        }

        return isValid;
    }

    // Save property button handler with validation
    document.getElementById('savePropertyBtn')?.addEventListener('click', function () {
        if (!validatePropertyForm()) {
            // Focus on first invalid field
            document.querySelector('.is-invalid')?.focus();
            
            // Scroll to the error
            document.querySelector('.is-invalid')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            return;
        }

        const formData = {
            name: document.getElementById('propertyName').value,
            type: document.getElementById('propertyType').value,
            address: document.getElementById('propertyAddress').value,
            city: document.getElementById('propertyCity').value,
            units: document.getElementById('propertyUnits').value,
            vacantUnits: document.getElementById('propertyVacantUnits').value,
            year: document.getElementById('propertyYear').value,
            description: document.getElementById('propertyDescription').value,
            features: {
                parking: document.getElementById('featureParking').checked,
                elevator: document.getElementById('featureElevator').checked,
                garden: document.getElementById('featureGarden').checked,
                pool: document.getElementById('featurePool').checked
            }
        };

        console.log('Property data to be saved:', formData);

        // Simulate successful save
        alert('تم حفظ العقار بنجاح!');
        var modal = bootstrap.Modal.getInstance(document.getElementById('addPropertyModal'));
        modal.hide();

        // Reset form
        document.getElementById('addPropertyForm').reset();

        // In a real app, you would refresh the properties table or add the new property to it
    });

    // Delete property confirmation
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', function () {
        const propertyId = this.getAttribute('data-property-id');
        console.log('Deleting property with ID:', propertyId);
        alert('تم حذف العقار بنجاح!');
        var modal = bootstrap.Modal.getInstance(document.getElementById('deletePropertyModal'));
        modal.hide();
    });

    // Set up delete modal with property ID
    document.getElementById('deletePropertyModal')?.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const propertyId = button.getAttribute('data-property-id');
        document.getElementById('confirmDeleteBtn').setAttribute('data-property-id', propertyId);
    });
});

const cardsData = [
    { type: "primary", title: "إجمالي العقارات", value: "15", icon: "fa-building", currency: "" },
    { type: "success", title: "عقارات مؤجرة", value: "12", icon: "fa-key", currency: "" },
    { type: "warning", title: "عقارات شاغرة", value: "3", icon: "fa-door-open", currency: "" },
    { type: "danger", title: "تحت الصيانة", value: "2", icon: "fa-tools", currency: "" }
];