const { createElem, clearContentsOfElemWithId } = require('./utils');

const setlistFmUri = 'https://setlist-fm-layer.onrender.com';
const generateUri = 'https://setlist-generator.onrender.com';

async function getArtists(searchQuery) {
  const request = { artist: searchQuery };
  const response = await fetch(`${setlistFmUri}/artist/search`, {
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
    const artistName = createElem('p', artist.id, artist.name, 'artist-search', 'link', 'list-group-item');
    elem.appendChild(artistName);
    artistList.push(artistName);
  });
  return artistList;
}

async function getSetlists(artistId) {
  const artistSetlists = await fetch(`${setlistFmUri}/artist/${artistId}/setlists`);
  return artistSetlists.json();
}

function createRequest(songsObject) {
  const {
    artistId, name, songs, eventDate, venueName,
  } = songsObject;
  const { displayName, accessToken, refreshToken } = JSON.parse(localStorage.getItem('setlist-generator-details'));
  return {
    artistId,
    name,
    songs,
    eventDate,
    venueName,
    accessToken,
    userId: displayName,
    refreshToken,
  };
}

async function sendGeneratePlaylistRequest(songs) {
  const request = createRequest(songs);
  const response = await fetch(`${generateUri}/generate`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(request),
    mode: 'cors',
  });
  if (response.status === 200) {
    const setlistSongContainer = document.getElementById('setlist-songs-container');
    clearContentsOfElemWithId('setlist-songs-container');
    const { name, url } = await response.json();
    const messageElem = createElem('span', null, `Success! Playlist ${name} is available `);
    const urlElem = createElem('a', null, 'here');
    urlElem.href = url;
    messageElem.appendChild(urlElem);
    setlistSongContainer.appendChild(messageElem);
    const newPlaylistButton = createElem('a', 'new-playlist', 'Create new playlist', 'btn', 'btn-secondary', 'display-block');
    newPlaylistButton.addEventListener('click', () => {
      window.location.reload();
    });
    setlistSongContainer.appendChild(newPlaylistButton);
  } else {
    console.log(await response.text());
  }
}

async function getSetlistSongs(id) {
  const artistSetlistContainer = document.getElementById('search-artist-setlists-container');
  const setlistSongContainer = document.getElementById('setlist-songs-container');
  const response = await fetch(`${setlistFmUri}/setlist/${id}`);
  const songsJson = await response.json();
  artistSetlistContainer.classList.add('hidden');
  const { songs } = songsJson;
  const songListContainer = createElem('ol', null, null, 'list-group', 'list-group-numbered');
  const heading = createElem('h3', null, 'Your playlist:');
  songListContainer.appendChild(heading);
  songs.forEach((song) => {
    const songElem = createElem('li', null, song, 'list-group-item');
    songListContainer.appendChild(songElem);
  });
  const submitButton = createElem('button', 'generate-playlist-button', 'Create playlist', 'btn', 'btn-success', 'display-block');
  submitButton.addEventListener('click', async () => {
    await sendGeneratePlaylistRequest(songsJson);
  });
  setlistSongContainer.appendChild(songListContainer);
  setlistSongContainer.appendChild(submitButton);
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
  selectButton.addEventListener('click', async () => {
    await getSetlistSongs(id);
  });
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
    const artistContainer = createElem('div', 'artist-container', null, 'margin-top');
    const artistList = createArtistElems(searchResults);
    artistList.forEach((artist) => {
      artistContainer.appendChild(artist);
      initGetSetlistCallback(artist);
    });
    responseContainer.appendChild(artistContainer);
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
