const { storeLoginDetails, hideLoginSectionIfLoggedIn } = require('./login');
const { searchArtist } = require('./artistSearch');

document.addEventListener('DOMContentLoaded', async () => {
  storeLoginDetails();
  hideLoginSectionIfLoggedIn();
  searchArtist();
});
