'use strict';

// helper: toggle a class
const elementToggleFunc = elem => elem.classList.toggle('active');

//
// SIDEBAR (mobile toggle)
//
const sidebar    = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

//
// TESTIMONIALS MODAL (if present)
//
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer   = document.querySelector('[data-modal-container]');
const modalCloseBtn    = document.querySelector('[data-modal-close-btn]');
const overlay          = document.querySelector('[data-overlay]');
const modalImg         = document.querySelector('[data-modal-img]');
const modalTitle       = document.querySelector('[data-modal-title]');
const modalText        = document.querySelector('[data-modal-text]');

if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {
  const toggleModal = () => {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  testimonialsItem.forEach(item => {
    item.addEventListener('click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      const title  = item.querySelector('[data-testimonials-title]');
      const text   = item.querySelector('[data-testimonials-text]');
      if (avatar && title && text) {
        modalImg.src      = avatar.src;
        modalImg.alt      = avatar.alt;
        modalTitle.innerHTML = title.innerHTML;
        modalText.innerHTML  = text.innerHTML;
      }
      toggleModal();
    });
  });

  modalCloseBtn.addEventListener('click', toggleModal);
  overlay.addEventListener('click', toggleModal);
}

//
// CONTACT FORM (enable submit when valid)
//
window.addEventListener('DOMContentLoaded', () => {
  const form    = document.querySelector('[data-form]');
  const btn     = form.querySelector('[data-form-btn]');
  const fullIn  = form.querySelector('input[name="fullname"]');
  const emailIn = form.querySelector('input[name="email"]');
  const msgIn   = form.querySelector('textarea[name="message"]');

  // Enable button
  form.addEventListener('input', () => {
    btn.disabled = !form.checkValidity();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const to      = 'topooyesh@gmail.com';
    const subject = `Message from ${fullIn.value.trim()}`;
    const body    = [
      `Name: ${fullIn.value.trim()}`,
      `Email: ${emailIn.value.trim()}`,
      '',
      msgIn.value.trim()
    ].join('\n');

    // 1) Gmail Web URL
    const gmailUrl = 'https://mail.google.com/mail/?view=cm'
                   + '&fs=1'
                   + '&to='     + encodeURIComponent(to)
                   + '&su='     + encodeURIComponent(subject)
                   + '&body='   + encodeURIComponent(body);

    // 2) mailto: fallback
    const mailtoUrl = 'mailto:' + to
                    + '?subject=' + encodeURIComponent(subject)
                    + '&body='    + encodeURIComponent(body);

    // Open Gmail in new tab
    const win = window.open(gmailUrl, '_blank');
    // If popup was blocked or Gmail doesn’t load, fall back to mailto
    setTimeout(() => {
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.open(mailtoUrl, '_self');
      }
    }, 500);
  });
});


//
// PAGE NAVIGATION (About / Resume / Contact)
//
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages           = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link, linkIndex) => {
  link.addEventListener('click', () => {
    const target = link.textContent.trim().toLowerCase();
    pages.forEach((page, pageIndex) => {
      const isActive = page.dataset.page === target;
      page.classList.toggle('active', isActive);
      navigationLinks[pageIndex].classList.toggle('active', isActive);
    });
    window.scrollTo(0, 0);
  });
});


