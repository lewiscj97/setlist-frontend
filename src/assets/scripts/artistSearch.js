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
      const setlistContainer = document.getElementById('setlist-results');
      responseContainer.innerHTML = '';
      setlistContainer.innerHTML = '';
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
        artistElem.addEventListener('click', async () => {
          const artistSetlists = await fetch(`http://localhost:3000/artist/${artistElem.id}/setlists`);
          const artistSetlistsJson = await artistSetlists.json();
          setlistContainer.innerHTML = '';
          const setlistsHeading = document.createElement('h3');
          setlistsHeading.innerText = 'Setlist Results:';
          artistSetlistsJson.forEach((setlist) => {
            const setlistDiv = document.createElement('div');
            setlistDiv.classList.add('artist-setlist-container');
            const detailsContainer = document.createElement('div');
            const date = setlist.eventDate;
            const venue = setlist.venueName;
            const tour = setlist?.tourName;
            const dateElem = document.createElement('p');
            dateElem.innerText = date;
            const venueElem = document.createElement('p');
            venueElem.innerText = venue;
            detailsContainer.appendChild(dateElem);
            detailsContainer.appendChild(venueElem);
            if (tour) {
              const tourElem = document.createElement('p');
              tourElem.innerText = tour;
              detailsContainer.appendChild(tourElem);
            }
            setlistDiv.appendChild(detailsContainer);
            const selectContainer = document.createElement('div');
            const selectButton = document.createElement('button');
            selectButton.id = setlist.id;
            selectButton.innerText = 'Select';
            selectButton.classList.add('btn', 'btn-primary');
            selectContainer.appendChild(selectButton);
            setlistDiv.appendChild(selectContainer);
            setlistContainer.appendChild(setlistDiv);
          });
        });
      });
    }
  });
}

module.exports = {
  searchArtist,
};
