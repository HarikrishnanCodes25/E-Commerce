(function(){
  const form = document.querySelector('.contact-form');
  const submitBtn = form.querySelector('.btn-primary');
  const resetBtn = document.getElementById('btn-reset');

  // create top alert element (if not present)
  let topAlert = form.querySelector('.form-alert');
  if (!topAlert) {
    topAlert = document.createElement('div');
    topAlert.className = 'form-alert';
    form.prepend(topAlert);
  }

  // helper validators
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function isPhone(v) {
    return /^[\d+\s()-]{7,18}$/.test(v.trim());
  }

  // fields
  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    phone: form.querySelector('#phone'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message')
  };

  // ensure each field has an error node
  Object.values(fields).forEach(el => {
    if (!el) return;
    let err = el.parentElement.querySelector('.form-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error';
      el.parentElement.appendChild(err);
    }
  });

  function clearErrors() {
    topAlert.style.display = 'none';
    topAlert.textContent = '';
    topAlert.classList.remove('error','success');
    Object.values(fields).forEach(el => {
      if (!el) return;
      el.classList.remove('input-invalid');
      const err = el.parentElement.querySelector('.form-error');
      if (err) { err.style.display = 'none'; err.textContent = ''; }
    });
  }

  function showFieldError(el, msg) {
    const err = el.parentElement.querySelector('.form-error');
    if (err) {
      err.textContent = msg;
      err.style.display = 'block';
    }
    el.classList.add('input-invalid');
  }

  function showTopError(msg) {
    topAlert.textContent = msg;
    topAlert.classList.remove('success');
    topAlert.classList.add('error');
    topAlert.style.display = 'block';
  }

  function showTopSuccess(msg) {
    topAlert.textContent = msg;
    topAlert.classList.remove('error');
    topAlert.classList.add('success');
    topAlert.style.display = 'block';
  }

  // validate but do NOT perform any navigation here
  function validate() {
    clearErrors();
    let ok = true;

    const name = fields.name.value || '';
    const email = fields.email.value || '';
    const phone = fields.phone.value || '';
    const subject = fields.subject.value || '';
    const message = fields.message.value || '';

    if (name.trim().length < 2) {
      showFieldError(fields.name, 'Please enter your full name.');
      if (ok) fields.name.focus();
      ok = false;
    }

    if (!isEmail(email)) {
      showFieldError(fields.email, 'Please enter a valid email address.');
      if (ok) fields.email.focus();
      ok = false;
    }

    if (phone.trim().length > 0 && !isPhone(phone)) {
      showFieldError(fields.phone, 'Please enter a valid phone number.');
      if (ok) fields.phone.focus();
      ok = false;
    }

    if (subject.trim().length < 2) {
      showFieldError(fields.subject, 'Please add a short subject.');
      if (ok) fields.subject.focus();
      ok = false;
    }

    if (message.trim().length < 10) {
      showFieldError(fields.message, 'Please write at least 10 characters.');
      if (ok) fields.message.focus();
      ok = false;
    }

    if (!ok) {
      showTopError('Please fill the valid details.');
    }

    return ok;
  }

  /* ---------- Submit handler ----------
     Important: when valid, DO NOT call e.preventDefault() so the browser will follow form.action (./404.html).
     When invalid, prevent default and show errors.
  */
  form.addEventListener('submit', function(e){
    const ok = validate();

    if (!ok) {
      // invalid -> prevent navigation
      e.preventDefault();
      return;
    }

    // Valid -> allow normal submit to form.action (./404.html)
    // We don't prevent default here so browser navigates.
  });

  /* ---------- Reset button behavior ----------
     - If the form is empty/invalid -> show error and DO NOT navigate.
     - If the form has values and is valid -> navigate to ./404.html.
  */
  resetBtn.addEventListener('click', function(e){
    const hasValues = Object.values(fields).some(f => f && f.value && f.value.trim().length > 0);

    // If no values -> show validation error (do not navigate)
    if (!hasValues) {
      clearErrors();
      showTopError('Please fill the valid details.');
      // small shake effect
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      setTimeout(()=> form.classList.remove('shake'), 500);
      return;
    }

    // If there are values, validate them. If invalid -> show error
    const ok = validate();
    if (!ok) {
      return;
    }

    // If valid -> navigate to 404 page
    window.location.href = './404.html';
  });

  // remove field error as user types
  Object.values(fields).forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
      const err = el.parentElement.querySelector('.form-error');
      if (err) { err.style.display = 'none'; err.textContent = ''; }
      el.classList.remove('input-invalid');
      topAlert.style.display = 'none';
    });
  });

})();
