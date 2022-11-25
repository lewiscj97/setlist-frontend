const { storeLoginDetails, hideLoginSectionIfLoggedIn, logout } = require('./login');
const { initSearch } = require('./artistSearch');

document.addEventListener('DOMContentLoaded', async () => {
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
  logout();
  await initSearch();
});
