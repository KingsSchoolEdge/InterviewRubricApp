### script.js

```js
// Simple in-memory store
const rubrics = [];
let currentLang = 'en';

// i18n toggle
document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  document.documentElement.lang = currentLang;
  // rerun translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[currentLang][key] || key;
  });
});

// Rubric builder
const criteriaList = document.getElementById('criteria-list');
document.getElementById('add-criterion').addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'criterion';
  div.innerHTML = `
    <input type="text" placeholder="Criterion Label" class="label" />
    <textarea placeholder="Description" class="desc"></textarea>
    <input type="number" min="1" max="5" placeholder="Weight" class="weight" />
    <button class="remove">×</button>
  `;
  div.querySelector('.remove').addEventListener('click', () => div.remove());
  criteriaList.append(div);
});
document.getElementById('rubric-form').addEventListener('submit', e => {
  e.preventDefault();
  const criteria = Array.from(criteriaList.querySelectorAll('.criterion')).map(c => ({
    label: c.querySelector('.label').value,
    desc: c.querySelector('.desc').value,
    weight: parseInt(c.querySelector('.weight').value, 10)
  }));
  const rubric = { id: Date.now(), criteria };
  rubrics.push(rubric);
  alert('Rubric saved!');
  // reset
  criteriaList.innerHTML = '';
  updateRubricSelect();
});

function updateRubricSelect() {
  const select = document.getElementById('rubric-select');
  select.innerHTML = '<option value="">--</option>' +
    rubrics.map(r => `<option value="${r.id}">Rubric #${r.id}</option>`).join('');
}

// Schedule interview
const sessions = [];
document.getElementById('schedule-form').addEventListener('submit', e => {
  e.preventDefault();
  const rubricId = parseInt(document.getElementById('rubric-select').value, 10);
  const dt = document.getElementById('interview-datetime').value;
  sessions.push({ id: Date.now(), rubricId, datetime: dt });
  alert('Interview scheduled!');
});

// Stubbed i18n dictionary
const i18n = {
  en: { 'app.title': 'Interview Rubric App', 'builder.title': 'Rubric Builder', 'builder.addCriterion': 'Add Criterion', 'builder.saveRubric': 'Save Rubric', 'schedule.title': 'Schedule Interview', 'schedule.selectRubric': 'Select Rubric', 'schedule.dateTime': 'Date & Time', 'schedule.createSession': 'Create Session', 'score.title': 'Interview Scoring' },
  es: { 'app.title': 'Aplicación de Rúbricas', 'builder.title': 'Constructor de Rúbricas', 'builder.addCriterion': 'Agregar Criterio', 'builder.saveRubric': 'Guardar Rúbrica', 'schedule.title': 'Programar Entrevista', 'schedule.selectRubric': 'Seleccionar Rúbrica', 'schedule.dateTime': 'Fecha y Hora', 'schedule.createSession': 'Crear Sesión', 'score.title': 'Puntuación de la Entrevista' }
};
```
