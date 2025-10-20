// ===================================
// 1. الثوابت الأساسية (Elements)
// ===================================
const neonText = document.getElementById('neonText');
const fontOptions = document.querySelectorAll('#fontSelectionGrid .font-option'); // أزرار الخطوط
const colorOptions = document.querySelectorAll('.color-option'); // أزرار الألوان
const neonSize = document.getElementById('neonSize');
const neonElement = document.getElementById('customNeon'); // العنصر المستهدف للتمرير
const toggleButton = document.getElementById('toggleButton');
const accordionHeaders = document.querySelectorAll('.accordion-header'); // رؤوس الأكورديون

// عناصر الخلفية الجديدة
const neonDisplay = neonElement.parentElement; 
const backgroundOptions = document.querySelectorAll('#backgroundSelection .color-option');


// حالة التشغيل/الإيقاف الافتراضية
let isNeonOn = true; 

// ===================================
// 2. الدوال الرئيسية
// ===================================

/**
 * دالة تحديث توقيع النيون بناءً على الإدخالات
 */
function updateNeonSign() {
    const text = neonText.value;
    const sizeValue = neonSize.value;

    // الحصول على الخط المختار حاليًا
    const activeFontElement = document.querySelector('.font-option.active');
    const fontValue = activeFontElement ? activeFontElement.getAttribute('data-font') : 'NeonClip'; 
    
    // الحصول على اللون المختار حاليًا
    const activeColorElement = document.querySelector('.color-option.active[data-color]'); // استثناء أزرار الخلفية
    const colorValue = activeColorElement ? activeColorElement.getAttribute('data-color') : 'CustomRed'; 

    // تحديث النص
    neonElement.textContent = text;
    
    // تحديث الخط
    neonElement.style.fontFamily = `'${fontValue}', sans-serif`;

    // تحديث الحجم
    neonElement.style.fontSize = `${sizeValue}px`;

    // تحديث اللون (إزالة جميع فئات الألوان السابقة وإضافة الفئة الجديدة)
    neonElement.className = 'neon-sign';
    neonElement.classList.add(`neon-${colorValue}`);
    
    // التأكد من تطبيق حالة التشغيل/الإيقاف
    if (!isNeonOn) {
        neonElement.classList.add('is-off');
    }
}

/**
 * دالة تبديل حالة التشغيل/الإيقاف للوحة النيون
 */
function toggleNeon() {
    isNeonOn = !isNeonOn; // عكس الحالة

    if (isNeonOn) {
        // حالة التشغيل (ON)
        neonElement.classList.remove('is-off');
        updateNeonSign(); 
        
        toggleButton.textContent = 'إيقاف';
        toggleButton.classList.remove('off');
        toggleButton.classList.add('on');
    } else {
        // حالة الإيقاف (OFF)
        neonElement.classList.add('is-off');
        
        toggleButton.textContent = 'تشغيل';
        toggleButton.classList.remove('on');
        toggleButton.classList.add('off');
    }
}


/**
 * معالج النقر على أزرار الخطوط (مع التمرير)
 */
function handleFontClick(event) {
    fontOptions.forEach(option => option.classList.remove('active'));
    event.target.classList.add('active');
    updateNeonSign();
    
    // 💡 الحل لتمرير شاشة الموبايل للأعلى فوراً 
    neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
}

/**
 * معالج النقر على أزرار الألوان
 */
function handleColorClick(event) {
    colorOptions.forEach(option => option.classList.remove('active'));
    event.target.classList.add('active');
    updateNeonSign();
    
    // 💡 التمرير للأعلى بعد اختيار اللون أيضاً
    neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/**
 * معالج النقر على أزرار الخلفية (جديد)
 */
function handleBackgroundClick(event) {
    const clickedOption = event.currentTarget;
    const selectedBg = clickedOption.getAttribute('data-bg');
    
    // إزالة فئة active من كل الخيارات
    backgroundOptions.forEach(opt => opt.classList.remove('active'));
    
    // إضافة فئة active للزر المختار
    clickedOption.classList.add('active');
    
    // إزالة جميع فئات الخلفية السابقة أولاً
    neonDisplay.classList.remove('bg-black', 'bg-brick-wall', 'bg-concrete');
    
    // إضافة الفئة الجديدة
    neonDisplay.classList.add(selectedBg);
    
    // التمرير للأعلى بعد اختيار الخلفية
    neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ===================================
// 3. ربط الأحداث (Listeners)
// ===================================

// ربط إدخال النص والحجم
neonText.addEventListener('input', updateNeonSign);
neonSize.addEventListener('input', updateNeonSign);
toggleButton.addEventListener('click', toggleNeon);

// ربط مستمع لشبكة الخطوط والألوان
fontOptions.forEach(option => {
    const fontName = option.getAttribute('data-font');
    option.style.fontFamily = `'${fontName}', sans-serif`;
    option.addEventListener('click', handleFontClick);
});

// ملاحظة: تم فصل مستمع الألوان عن الخلفيات
document.querySelectorAll('#color-body .color-option').forEach(option => {
    option.addEventListener('click', handleColorClick);
});

// ربط مستمع لأزرار الخلفية الجديدة
backgroundOptions.forEach(option => {
    option.addEventListener('click', handleBackgroundClick);
});


// ربط منطق الأكورديون (بقي كما هو)
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-target');
        const targetBody = document.getElementById(targetId);
        
        // إغلاق كل الأقسام الأخرى وإزالة التحديد النشط
        accordionHeaders.forEach(h => {
            const body = document.getElementById(h.getAttribute('data-target'));
            h.classList.remove('active');
            body.classList.remove('expanded');
        });
        
        // فتح/إغلاق القسم الحالي
        header.classList.toggle('active');
        targetBody.classList.toggle('expanded');
    });
});


// تشغيل التحديث الأولي عند تحميل الصفحة
window.addEventListener('load', updateNeonSign);
