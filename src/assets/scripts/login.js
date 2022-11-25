function storeLoginDetails() {
  const url = window.location.hash.substring(1);
  if (url !== '') {
    const splitUrl = url.split('#');
    const details = {
      displayName: splitUrl[0],
      accessToken: splitUrl[1],
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
    )).displayName;
  }
}

function logout() {
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('setlist-generator-details');
    window.location.reload();
  });
}

module.exports = {
  storeLoginDetails,
  hideLoginSectionIfLoggedIn,
  logout,
};
