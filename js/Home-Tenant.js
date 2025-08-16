const cardsData = [
    { type: "primary", title: "الوحدة السكنية", value: "الوحدة 305", icon: "fas fa-home", currency: "", currency2: "عمارة الأماني، عمان" },
    { type: "success", title: "حالة الإيجار", value: "نشط", icon: "fas fa-file-signature", currency: "", currency2: "ينتهي في 15/06/2025" },
    { type: "warning", title: "الإيجار الشهري", value: "600", icon: "fas fa-receipt", currency: "د.أ", currency2: "آخر دفع: 05/04/2025" },
    { type: "danger", title: "الدفع القادم", value: "14", icon: "fas fa-hourglass-half", currency: "يوم", currency2: "متوقع في 01/05/2025" }
];
// Select payment method
function selectPaymentMethod(element) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    const input = element.querySelector('input');
    input.checked = true;
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});


