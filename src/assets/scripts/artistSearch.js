const { createElem, clearContentsOfElemWithId } = require('./utils');

async function getArtists(searchQuery) {
  const request = { artist: searchQuery };
  const response = await fetch('http://localhost:3000/artist/search', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(request),
    mode: 'cors',
  });
  return response.json();
}

function createArtistElems(artists) {
  const artistList = [];
  artists.forEach((artist) => {
    const elem = document.createElement('div');
    const artistName = createElem('p', artist.id, artist.name, 'artist-search', 'link');
    elem.appendChild(artistName);
    artistList.push(artistName);
  });
  return artistList;
}

async function getSetlists(artistId) {
  const artistSetlists = await fetch(`http://localhost:3000/artist/${artistId}/setlists`);
  return artistSetlists.json();
}

function createSetlistElem(setlistInfo) {
  const setlistDiv = createElem('div', null, null, 'artist-setlist-container');
  const detailsContainer = document.createElement('div');
  const {
    eventDate, venueName, tourName, id,
  } = setlistInfo;
  const dateElem = createElem('p', null, eventDate);
  const venueElem = createElem('p', null, venueName);
  detailsContainer.appendChild(dateElem);
  detailsContainer.appendChild(venueElem);
  if (tourName) {
    const tourElem = createElem('p', null, tourName);
    detailsContainer.appendChild(tourElem);
  }
  setlistDiv.appendChild(detailsContainer);
  const selectContainer = document.createElement('div');
  const selectButton = createElem('button', id, 'Select', 'btn', 'btn-primary');
  selectContainer.appendChild(selectButton);
  setlistDiv.appendChild(selectContainer);
  return setlistDiv;
}

function displaySetlists(setlists) {
  const setlistContainer = document.getElementById('setlist-results');
  const setlistsHeading = createElem('h3', null, 'Setlist results:');
  setlistContainer.appendChild(setlistsHeading);
  setlists.forEach((setlist) => {
    setlistContainer.appendChild(createSetlistElem(setlist));
  });
}

function initGetSetlistCallback(artistElem) {
  artistElem.addEventListener('click', async () => {
    clearContentsOfElemWithId('setlist-results');
    displaySetlists(await getSetlists(artistElem.id));
  });
}

async function displayArtistSearchResults(searchResults) {
  if (searchResults.length > 0) {
    clearContentsOfElemWithId('artist-results', 'setlist-results');
    const responseContainer = document.getElementById('artist-results');
    const headingElem = createElem('h3', null, 'Search results:');
    responseContainer.appendChild(headingElem);
    const artistList = createArtistElems(searchResults);
    artistList.forEach((artist) => {
      responseContainer.appendChild(artist);
      initGetSetlistCallback(artist);
    });
  }
}

async function initSearch() {
  const button = document.getElementById('artist-search-btn');
  button.addEventListener('click', async () => {
    const artistQuery = document.getElementById('artist').value;
    const artists = await getArtists(artistQuery);
    await displayArtistSearchResults(artists);
  });
}

module.exports = {
  initSearch,
};
