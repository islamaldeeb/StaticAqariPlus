// تهيئة أولية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    // إخفاء معلومات البنك وزر الدفع عند البدء
    document.getElementById('BankingInformation').style.display = 'none';
    document.getElementById('payButton').style.display = 'block'; // أو 'none' حسب ما تريد
});

// اختيار طريقة الدفع
function selectPaymentMethod(element, method) {
    // إزالة التحديد من جميع طرق الدفع
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
        const input = el.querySelector('input');
        input.checked = false;
    });

    // تحديد طريقة الدفع المختارة
    element.classList.add('selected');
    const input = element.querySelector('input');
    input.checked = true;

    // إخفاء جميع النماذج أولاً
    document.getElementById('creditCardForm').style.display = 'none';
    document.getElementById('BankingInformation').style.display = 'none';

    // التحكم في ظهور زر الدفع
    const payButton = document.getElementById('payButton');

    // إظهار العناصر المناسبة حسب طريقة الدفع
    if (method === 'credit') {
        document.getElementById('creditCardForm').style.display = 'block';
        payButton.style.display = 'block'; // إظهار زر الدفع
        payButton.innerHTML = '<i class="fas fa-credit-card me-2"></i> دفع الآن 600 د.أ';
    } else if (method === 'bank') {
        document.getElementById('BankingInformation').style.display = 'block';
        payButton.style.display = 'none'; // إخفاء زر الدفع
    }
}

// معالجة عملية الدفع
function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').id;

    // التحقق من صحة البيانات حسب طريقة الدفع
    if (paymentMethod === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;

        if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
            alert('الرجاء إدخال جميع معلومات البطاقة');
            return;
        }
    }

    // محاكاة عملية الدفع
    setTimeout(() => {
        // عرض نافذة نجاح الدفع
        var paymentModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
        paymentModal.show();

        // إعادة تعيين النموذج بعد النجاح
        if (paymentMethod === 'creditCard') {
            document.getElementById('cardNumber').value = '';
            document.getElementById('cardName').value = '';
            document.getElementById('cardExpiry').value = '';
            document.getElementById('cardCvv').value = '';
        }
    }, 1500);
}
