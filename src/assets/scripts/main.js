const { storeLoginDetails, hideLoginSectionIfLoggedIn } = require('./login');

document.addEventListener('DOMContentLoaded', async () => {
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
});
