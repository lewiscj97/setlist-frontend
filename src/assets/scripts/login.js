// TODO: rename display name and id to be correct
function storeLoginDetails() {
  const url = window.location.hash.substring(1);
  if (url !== '') {
    const splitUrl = url.split('#');
    const details = {
      displayName: splitUrl[0],
      accessToken: splitUrl[1],
      id: splitUrl[2],
      refreshToken: splitUrl[3],
    };
    localStorage.setItem('setlist-generator-details', JSON.stringify(details));
    window.location = '/';
  }
}

function hideLoginSectionIfLoggedIn() {
  if (localStorage.getItem('setlist-generator-details') !== null) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('logged-in').classList.remove('hidden');
    document.getElementById('username').innerText = JSON.parse(localStorage.getItem(
      'setlist-generator-details',
    )).id;
  }
}

module.exports = {
  storeLoginDetails,
  hideLoginSectionIfLoggedIn,
};
