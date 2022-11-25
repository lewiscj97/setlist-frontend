const { storeLoginDetails, hideLoginSectionIfLoggedIn, setLoginHref } = require('./login');
const { initSearch } = require('./artistSearch');

document.addEventListener('DOMContentLoaded', async () => {
  setLoginHref();
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
  await initSearch();
});
