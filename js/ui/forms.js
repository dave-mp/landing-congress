export function initForms() {
  setupForm('form-registro');
  setupForm('form-contacto');
}

function setupForm(id) {
  const form = document.getElementById(id);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);

    if (!form.checkValidity()) {
      showErrors(form);
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const success = form.querySelector('.form__success');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Enviando…';
    }

    // Simulate async submission (replace with real fetch/formspree when ready)
    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.textContent = id === 'form-registro' ? 'Enviar Pre-registro' : 'Enviar Mensaje';
      }
      if (success) {
        success.hidden = false;
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    }, 800);
  });

  // Clear error on input
  form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('has-error');
      const errorEl = field.parentElement?.querySelector('.form__error');
      if (errorEl) errorEl.textContent = '';
    });
  });
}

function showErrors(form) {
  Array.from(form.elements).forEach(field => {
    if (!field.validity.valid) {
      field.classList.add('has-error');
      const errorEl = field.parentElement?.querySelector('.form__error');
      if (errorEl) {
        errorEl.textContent = getErrorMessage(field);
      }
    }
  });

  const firstError = form.querySelector('.has-error');
  firstError?.focus();
  firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearErrors(form) {
  form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  form.querySelectorAll('.form__error').forEach(el => { el.textContent = ''; });
}

function getErrorMessage(field) {
  if (field.validity.valueMissing)  return 'Este campo es obligatorio.';
  if (field.validity.typeMismatch)  return 'Por favor ingrese un valor válido.';
  if (field.validity.tooShort)      return `Mínimo ${field.minLength} caracteres.`;
  if (field.validity.tooLong)       return `Máximo ${field.maxLength} caracteres.`;
  return field.validationMessage || 'Valor inválido.';
}
