async function searchArtist() {
  const button = document.getElementById('artist-search-btn');
  button.addEventListener('click', async () => {
    const artistQuery = document.getElementById('artist').value;
    const request = { artist: artistQuery };
    const response = await fetch('http://localhost:3000/artist/search', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(request),
      mode: 'cors',
    });
    const responseJson = await response.json();
    if (responseJson.length > 0) {
      const responseContainer = document.getElementById('artist-results');
      const headingElem = document.createElement('h3');
      headingElem.innerText = 'Search Results:';
      responseContainer.appendChild(headingElem);
      const artists = [];
      responseJson.forEach((artist) => {
        const elem = document.createElement('div');
        const artistName = document.createElement('p');
        artistName.innerText = artist.name;
        artistName.classList.add('artist-search');
        artistName.classList.add('link');
        artistName.id = artist.id;
        elem.appendChild(artistName);
        artists.push(artistName);
        responseContainer.appendChild(elem);
      });
      artists.forEach((artistElem) => {
        artistElem.addEventListener('click', () => {
          console.log(artistElem.id);
        });
      });
    }
  });
}

module.exports = {
  searchArtist,
};
