// notifications.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    $('#notificationsTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json'
        },
        columnDefs: [
            { orderable: false, targets: [6] } // Disable sorting for actions column
        ]
    });

    // Function to validate notification form
    function validateNotificationForm() {
        let isValid = true;
        
        // Reset previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        // Validate notification type
        if (!$('#notificationType').val()) {
            $('#notificationType').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب اختيار نوع الإشعار</div>');
            isValid = false;
        }

        // Validate recipients
        if ($('#notificationRecipients').val().length === 0) {
            $('#notificationRecipients').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب اختيار مستلم واحد على الأقل</div>');
            isValid = false;
        }

        // Validate subject
        if (!$('#notificationSubject').val()) {
            $('#notificationSubject').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب إدخال عنوان للإشعار</div>');
            isValid = false;
        }

        // Validate message
        if (!$('#notificationMessage').val()) {
            $('#notificationMessage').addClass('is-invalid')
                .after('<div class="invalid-feedback">يجب إدخال نص الإشعار</div>');
            isValid = false;
        }

        return isValid;
    }

    // Send notification button handler
    $('#sendNotificationBtn').on('click', function(e) {
        e.preventDefault();
        
        if (!validateNotificationForm()) {
            // Focus on first invalid field
            $('.is-invalid').first().focus();
            return;
        }

        const formData = {
            type: $('#notificationType').val(),
            priority: $('#notificationPriority').val(),
            recipients: $('#notificationRecipients').val(),
            subject: $('#notificationSubject').val(),
            message: $('#notificationMessage').val()
        };

        console.log('Notification data to be sent:', formData);
        
        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'تم الإرسال!',
            text: 'تم إرسال الإشعار بنجاح',
            confirmButtonText: 'حسناً'
        }).then(() => {
            // Hide modal and reset form
            $('#addNotificationModal').modal('hide');
            $('#addNotificationForm')[0].reset();
        });
    });

    // Delete notification function
    window.deleteNotification = function(id) {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "لن تتمكن من استعادة هذا الإشعار!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                // Here you would typically make an AJAX call to delete the notification
                Swal.fire(
                    'تم الحذف!',
                    'تم حذف الإشعار بنجاح.',
                    'success'
                ).then(() => {
                    // Remove the row from the table
                    $(`button[onclick="deleteNotification(${id})"]`).closest('tr').remove();
                });
            }
        });
    };

    // Save notification settings
    $('#notificationSettingsForm').on('submit', function(e) {
        e.preventDefault();
        
        const settings = {
            payment: $('#enablePaymentNotifications').is(':checked'),
            maintenance: $('#enableMaintenanceNotifications').is(':checked'),
            contract: $('#enableContractNotifications').is(':checked'),
            general: $('#enableGeneralNotifications').is(':checked')
        };

        console.log('Notification settings saved:', settings);
        
        Swal.fire({
            icon: 'success',
            title: 'تم الحفظ!',
            text: 'تم حفظ إعدادات الإشعارات بنجاح',
            confirmButtonText: 'حسناً'
        });
    });

    // Mark notification as read when clicked
    $('#notificationsTable tbody').on('click', 'tr', function(e) {
        if ($(e.target).is('button, a, i')) return;
        
        if ($(this).hasClass('unread-notification')) {
            $(this).removeClass('unread-notification');
            $(this).find('.badge')
                .removeClass('bg-warning')
                .addClass('bg-success')
                .text('مقروء');
        }
    });
});

const cardsData = [
    { type: "primary", title: "إجمالي الإشعارات", value: "24", icon: "fas fa-bell", currency: "" },
    { type: "success", title: "إشعارات مقروءة", value: "18", icon: "fas fa-check-circle", currency: "" },
    { type: "warning", title: "إشعارات غير مقروءة", value: "5", icon: "fas fa-exclamation-circle", currency: "" },
    { type: "danger", title: "إشعارات عاجلة", value: "1", icon: "fas fa-exclamation-circle", currency: "" }
];