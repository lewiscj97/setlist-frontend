const { storeLoginDetails, hideLoginSectionIfLoggedIn, initLogoutButton } = require('./login');
const { initSearch } = require('./artistSearch');

document.addEventListener('DOMContentLoaded', async () => {
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
  await initSearch();
  initLogoutButton();
});
