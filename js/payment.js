// payment.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    $('#paymentsTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
        },
        columnDefs: [
            { orderable: false, targets: [0, 8] }
        ]
    });

    // Initialize datepicker
    $('.datepicker').datepicker({
        language: 'ar',
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    // Auto-fill payment amount based on tenant
    $('#paymentTenant').on('change', function() {
        const tenantRentAmounts = {
            '1': 500,
            '2': 600,
            '3': 450,
            '4': 550,
            '5': 700
        };
        const tenantId = this.value;
        if (tenantId && tenantRentAmounts[tenantId]) {
            $('#paymentAmount').val(tenantRentAmounts[tenantId]);
        }
    });

    // Function to validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Reset previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        // Validate tenant
        if (!$('#paymentTenant').val()) {
            $('#paymentTenant').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب اختيار المستأجر</div>');
            isValid = false;
        }

        // Validate payment type
        if (!$('#paymentType').val()) {
            $('#paymentType').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب اختيار نوع الدفعة</div>');
            isValid = false;
        }

        // Validate amount
        const amount = $('#paymentAmount').val();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            $('#paymentAmount').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب إدخال مبلغ صحيح أكبر من الصفر</div>');
            isValid = false;
        }

        // Validate payment date
        if (!$('#paymentDate').val()) {
            $('#paymentDate').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب تحديد تاريخ الدفع</div>');
            isValid = false;
        }

        // Validate receipt number
        if (!$('#paymentReceipt').val()) {
            $('#paymentReceipt').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب إدخال رقم الإيصال</div>');
            isValid = false;
        }

        return isValid;
    }

    // Save payment button handler
    $('#savePaymentBtn').on('click', function(e) {
        e.preventDefault();
        
        if (!validatePaymentForm()) {
            // Focus on first invalid field
            $('.is-invalid').first().focus();
            return;
        }

        const formData = {
            tenant: $('#paymentTenant').val(),
            type: $('#paymentType').val(),
            amount: $('#paymentAmount').val(),
            date: $('#paymentDate').val(),
            receipt: $('#paymentReceipt').val(),
            notes: $('#paymentNotes').val()
        };

        console.log('Payment data to be saved:', formData);
        alert('تم حفظ الدفعة بنجاح!');
        
        // Hide modal and reset form
        $('#addPaymentModal').modal('hide');
        $('#addPaymentForm')[0].reset();
    });

    // Delete payment modal handler
    $('#deletePaymentModal').on('show.bs.modal', function(event) {
        const button = $(event.relatedTarget);
        const paymentId = button.data('payment-id');
        $(this).find('#confirmDeleteBtn').data('payment-id', paymentId);
    });

    // Delete payment confirmation
    $('#confirmDeleteBtn').on('click', function() {
        const paymentId = $(this).data('payment-id');
        console.log('Deleting payment with ID:', paymentId);
        alert('تم حذف الدفعة بنجاح!');
        $('#deletePaymentModal').modal('hide');
    });
});

const cardsData = [
    { type: "primary", title: "إجمالي الإيرادات", value: "24,500", icon: "fas fa-money-bill-wave", currency: "د.أ" },
    { type: "success", title: "دفعات هذا الشهر", value: "8,200", icon: "fas fa-calendar-check", currency: "د.أ" },
    { type: "warning", title: "دفعات معلقة", value: "3,500", icon: "fas fa-clock", currency: "د.أ" },
    { type: "danger", title: "دفعات متأخرة", value: "2,800", icon: "fas fa-exclamation-triangle", currency: "د.أ" }
];