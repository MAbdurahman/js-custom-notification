
'use strict';

window.addEventListener("load", () => {
   const preloader = document.querySelector("#preloader");

   if (!preloader) {
      return;
   }

   preloader.classList.add("fade-out");

   preloader.addEventListener("transitionend", () => {
      preloader.remove();
   }, { once: true });
});


document.addEventListener('DOMContentLoaded', () => {
   const toastContainer = document.querySelector('.toast-container');
   const buttonContainer = document.querySelector('.button-container');

   if (!toastContainer || !buttonContainer) {
      console.error('Toast or button container was not found.');
      return;
   }

   const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warn: 'fa-triangle-exclamation',
      inform: 'fa-circle-info'
   };

   buttonContainer.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      // Make sure the click came from a button inside this container
      if (!button || !buttonContainer.contains(button)) {
         return;
      }

      const type = button.dataset.type;

      // Ignore buttons without a supported data-type
      if (!icons[type]) {
         return;
      }

      const toast = document.createElement('div');
      toast.classList.add('toast', type);

      const icon = document.createElement('i');
      icon.classList.add('fa-solid', icons[type]);
      icon.setAttribute('aria-hidden', 'true');

      let indefiniteArticle = type.charAt(0) === 'e' || type.charAt(0) === 'i' ? 'an ' : 'a ';
      const message = document.createTextNode(
         ` This is ${indefiniteArticle} ${type} notification.`
      );

      toast.append(icon, message);
      // Remove any existing toast, then add the new one
      toastContainer.replaceChildren();
      toastContainer.appendChild(toast);

      // Remove the toast after 5 seconds
      const exitTimer = setTimeout(() => {
         toast.classList.add('move-back-to-right');

         // Remove it after the exit animation
         setTimeout(() => {
            toast.remove();
         }, 1500);
      }, 5000);

      // Prevent unused-variable warnings if you later add cancellation logic
      toast.dataset.timerId = exitTimer;
   });
});