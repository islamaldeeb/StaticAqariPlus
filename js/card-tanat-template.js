// cards.js

// تعريف القالب كمتغير نصي
const cardTemplate = `
<div class="col-xl-3 col-md-6 mb-4">
    <div class="card stat-card {{type}} h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col me-2">
                    <div class="fs-5 font-weight-bold text-uppercase mb-1 text-{{type}}">{{title}}</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{value}} <small>{{currency}}</small></div>
                    <div class="mt-2 small">{{currency2}} </div>
                </div>
                <div class="col-auto">
                    <i class="fas {{icon}} fa-2x text-{{type}}"></i>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// بيانات البطاقات


// دالة لتحميل البطاقات
function loadCards() {
    const container = document.getElementById('cards-container');

    // استخدام DocumentFragment لتحسين الأداء
    const fragment = document.createDocumentFragment();

    cardsData.forEach(data => {
        const cardHTML = cardTemplate
            .replace(/{{type}}/g, data.type)
            .replace(/{{title}}/g, data.title)
            .replace(/{{value}}/g, data.value)
            .replace(/{{icon}}/g, data.icon)
            .replace(/{{currency}}/g, data.currency)
            .replace(/{{currency2}}/g, data.currency2);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        fragment.appendChild(tempDiv.firstElementChild);
    });

    container.appendChild(fragment);
}

// جعل الدوال متاحة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadCards);