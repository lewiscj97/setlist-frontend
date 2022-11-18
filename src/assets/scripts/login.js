function storeLoginDetails() {
  const url = window.location.hash.substring(1);
  if (url !== '') {
    const splitUrl = url.split('#');
    const details = {
      displayName: splitUrl[0],
      accessToken: splitUrl[1],
    };
    localStorage.setItem('setlist-generator-details', JSON.stringify(details));
  }
}

function hideLoginSectionIfLoggedIn() {
  if (localStorage.getItem('setlist-generator-details') !== null) {
    document.getElementById('login-section').classList.add('hidden');
  }
}

module.exports = {
  storeLoginDetails,
  hideLoginSectionIfLoggedIn,
};
