document.getElementById('continueBtn').addEventListener('click', () => {
    const subject = document.getElementById('subject').value;
    localStorage.setItem('selectedSubject', subject); // حفظ المادة المختارة
    window.location.href = 'tables.html'; // الانتقال إلى صفحة الجداول
});
