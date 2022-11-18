function initLoginButton() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', () => {
    console.log('Hello world');
  });
}

module.exports = {
  initLoginButton,
};
