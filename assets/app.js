const form = document.querySelector('#test-form');
const role = document.querySelector('#role');
const schoolField = document.querySelector('#school-field');
const school = document.querySelector('#school');
const success = document.querySelector('#success');

function setSchoolVisibility() {
  const isStudent = role.value === 'student';
  schoolField.hidden = !isStudent;
  school.required = isStudent;
  if (!isStudent) {
    school.value = '';
    clearError('school');
  }
}

function clearError(name) {
  const field = form.elements[name];
  const nodes = field instanceof RadioNodeList ? [...field] : [field];
  nodes.forEach(node => node?.classList.remove('invalid'));
  document.querySelector(`#${name}-error`).textContent = '';
}

function showError(name, message) {
  const field = form.elements[name];
  const nodes = field instanceof RadioNodeList ? [...field] : [field];
  nodes.forEach(node => node?.classList.add('invalid'));
  document.querySelector(`#${name}-error`).textContent = message;
}

function validate() {
  ['firstname','email','role','school','gender','interest'].forEach(clearError);
  let valid = true;
  const data = new FormData(form);
  const checks = [
    ['firstname', data.get('firstname')?.trim().length >= 2, '請輸入至少 2 個字元的姓名'],
    ['email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email') || ''), '請輸入正確的電子郵件'],
    ['role', Boolean(data.get('role')), '請選擇身分角色'],
    ['school', role.value !== 'student' || Boolean(data.get('school')?.trim()), '學生身分請填寫學校名稱'],
    ['gender', Boolean(data.get('gender')), '請選擇性別'],
    ['interest', data.getAll('interest').length > 0, '請至少選擇一項興趣']
  ];
  checks.forEach(([name, ok, message]) => { if (!ok) { showError(name, message); valid = false; } });
  return valid;
}

role.addEventListener('change', setSchoolVisibility);
form.addEventListener('input', event => { if (event.target.name) clearError(event.target.name); success.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) { success.hidden = true; document.querySelector('.invalid')?.focus(); return; }
  const data = new FormData(form);
  success.textContent = `驗證成功：${data.get('firstname')}（${role.options[role.selectedIndex].text}）的表單已完成。`;
  success.hidden = false;
});

setSchoolVisibility();
