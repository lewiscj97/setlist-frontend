function searchArtist() {
  const button = document.getElementById('artist-search-btn');
  button.addEventListener('click', async () => {
    const artist = document.getElementById('artist').value;
    console.log(artist);
  });
}

module.exports = {
  searchArtist,
};
