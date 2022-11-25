const { storeLoginDetails, hideLoginSectionIfLoggedIn } = require('./login');
const { initSearch } = require('./artistSearch');

document.addEventListener('DOMContentLoaded', async () => {
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
  await initSearch();
});
