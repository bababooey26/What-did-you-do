document.addEventListener('DOMContentLoaded', function () {
    const subjectSelect = document.getElementById('subjectSelect');
    const subjectName = document.getElementById('subjectName');
    const subjectTableBody = document.querySelector('#subjectTable tbody');

    const years = Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2024 - i);

    const data = {
        "علوم": {},
        "رياضيات": {},
        "تقني رياضي": {},
        "تسيير واقتصاد": {}
    };

    years.forEach(year => {
        Object.keys(data).forEach(subject => {
            data[subject][year] = {
                exercises1: [false, false, false, false, false],
                exercises2: [false, false, false, false, false]
            };
        });
    });

    function updateTable(subject) {
        subjectName.textContent = subject;
        subjectTableBody.innerHTML = '';

        const subjectData = data[subject];
        if (subjectData) {
            years.forEach(year => {
                const entry = subjectData[year];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${year}</td>
                    ${entry.exercises1.map((e, i) => `<td><input type="checkbox" ${e ? 'checked' : ''} data-year="${year}" data-exercise="1" data-index="${i}"></td>`).join('')}
                    ${entry.exercises2.map((e, i) => `<td><input type="checkbox" ${e ? 'checked' : ''} data-year="${year}" data-exercise="2" data-index="${i}"></td>`).join('')}
                `;
                subjectTableBody.appendChild(row);
            });
        }
    }

    function saveState() {
        const subject = subjectSelect.value;
        const subjectData = data[subject];
        if (subjectData) {
            Object.keys(subjectData).forEach(year => {
                const entry = subjectData[year];
                entry.exercises1 = Array.from(document.querySelectorAll(`input[type="checkbox"][data-year="${year}"][data-exercise="1"]`)).map(cb => cb.checked);
                entry.exercises2 = Array.from(document.querySelectorAll(`input[type="checkbox"][data-year="${year}"][data-exercise="2"]`)).map(cb => cb.checked);
            });
            localStorage.setItem('subjectData', JSON.stringify(data));
        }
    }

    function loadState() {
        const savedData = localStorage.getItem('subjectData');
        if (savedData) {
            Object.assign(data, JSON.parse(savedData));
            updateTable(subjectSelect.value);
        }
    }

    subjectSelect.addEventListener('change', function () {
        updateTable(subjectSelect.value);
    });

    document.body.addEventListener('change', function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            saveState();
        }
    });

    loadState();
    updateTable(subjectSelect.value);
});
