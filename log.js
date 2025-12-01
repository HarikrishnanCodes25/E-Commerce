/* === JS: view switching, validation, toggle-password, redirects === */

document.addEventListener('DOMContentLoaded', function () {
  // View elements
  const navSignin = document.getElementById('nav-signin');
  const navSignup = document.getElementById('nav-signup');
  const navForgot = document.getElementById('nav-forgot');

  const viewSignin = document.getElementById('view-signin');
  const viewSignup = document.getElementById('view-signup');
  const viewForgot = document.getElementById('view-forgot');

  const navButtons = [navSignin, navSignup, navForgot];
  const views = [viewSignin, viewSignup, viewForgot];

  function activate(index) {
    // nav
    navButtons.forEach((b, i) => {
      b.classList.toggle('active', i === index);
      b.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // views
    views.forEach((v, i) => v.classList.toggle('active', i === index));
    // focus first input in view
    const first = views[index].querySelector('input');
    if (first) first.focus();
  }

  navSignin.addEventListener('click', () => activate(0));
  navSignup.addEventListener('click', () => activate(1));
  navForgot.addEventListener('click', () => activate(2));

  // small inline links to switch
  document.getElementById('link-signup').addEventListener('click', (e) => { e.preventDefault(); activate(1); });
  document.getElementById('link-signin').addEventListener('click', (e) => { e.preventDefault(); activate(0); });
  document.getElementById('link-signin-2').addEventListener('click', (e) => { e.preventDefault(); activate(0); });
  document.getElementById('link-forgot').addEventListener('click', (e) => { e.preventDefault(); activate(2); });

  // Toggle password visibility for any .eye button
  document.querySelectorAll('.eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = targetId ? document.getElementById(targetId) : btn.closest('.input-wrap').querySelector('input');
      if (!input) return;
      input.type = (input.type === 'password') ? 'text' : 'password';
      btn.textContent = (input.type === 'password') ? '👁️' : '🙈';
    });
  });

  // Validation helpers
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // Sign In form
  const formSI = document.getElementById('form-signin');
  const siEmail = document.getElementById('si-email');
  const siPwd = document.getElementById('si-password');
  const siErr = document.getElementById('si-error');

  formSI.addEventListener('submit', function (e) {
    e.preventDefault();
    siErr.hidden = true;
    [siEmail, siPwd].forEach(i => i.classList.remove('invalid'));

    const emailOk = isValidEmail(siEmail.value);
    const pwdOk = siPwd.value.trim().length >= 6;

    if (!emailOk || !pwdOk) {
      siErr.hidden = false;
      if (!emailOk) siEmail.classList.add('invalid');
      if (!pwdOk) siPwd.classList.add('invalid');
      ( !emailOk ? siEmail : siPwd ).focus();
      return;
    }

    // valid -> redirect to 404 (demo)
    window.location.href = '404.html';
  });

  [siEmail, siPwd].forEach(el => el.addEventListener('input', () => { siErr.hidden = true; el.classList.remove('invalid'); }));

  // Sign Up form
  const formSU = document.getElementById('form-signup');
  const suName = document.getElementById('su-name');
  const suEmail = document.getElementById('su-email');
  const suPwd = document.getElementById('su-password');
  const suConf = document.getElementById('su-confirm');
  const suErr = document.getElementById('su-error');

  formSU.addEventListener('submit', function (e) {
    e.preventDefault();
    suErr.hidden = true;
    [suName, suEmail, suPwd, suConf].forEach(i => i.classList.remove('invalid'));

    const nameOk = suName.value.trim().length >= 2;
    const emailOk = isValidEmail(suEmail.value);
    const pwdOk = suPwd.value.trim().length >= 6;
    const confOk = suPwd.value === suConf.value && suConf.value.trim().length >= 6;

    if (!nameOk || !emailOk || !pwdOk || !confOk) {
      suErr.hidden = false;
      if (!nameOk) suName.classList.add('invalid');
      if (!emailOk) suEmail.classList.add('invalid');
      if (!pwdOk) suPwd.classList.add('invalid');
      if (!confOk) suConf.classList.add('invalid');
      const toFocus = !nameOk ? suName : (!emailOk ? suEmail : (!pwdOk ? suPwd : suConf));
      toFocus.focus();
      return;
    }

    window.location.href = '404.html';
  });

  [suName, suEmail, suPwd, suConf].forEach(el => el.addEventListener('input', () => { suErr.hidden = true; el.classList.remove('invalid'); }));

  // Forgot form
  const formFP = document.getElementById('form-forgot');
  const fpEmail = document.getElementById('fp-email');
  const fpErr = document.getElementById('fp-error');

  formFP.addEventListener('submit', function (e) {
    e.preventDefault();
    fpErr.hidden = true;
    fpEmail.classList.remove('invalid');

    const emailOk = isValidEmail(fpEmail.value);
    if (!emailOk) {
      fpErr.hidden = false;
      fpEmail.classList.add('invalid');
      fpEmail.focus();
      return;
    }

    window.location.href = '404.html';
  });

  fpEmail.addEventListener('input', () => { fpErr.hidden = true; fpEmail.classList.remove('invalid'); });

  // initial focus
  document.querySelector('#view-signin input')?.focus();
});
