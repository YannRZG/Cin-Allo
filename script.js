const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const movieResults = document.getElementById('movieResults');

const apiKey = '3928353e'; 
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;

// Soumettre la recherche
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const searchTerm = searchInput.value.trim(); // Get search term

    try {
        const response = await fetch(apiUrl + searchTerm);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            displayNoMoviesFound();
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
});

AOS.init({});

// affichage du résultat de recherche
function displayMovies(movies) {
    let movieHTML = '';

    movies.forEach(movie => {
        movieHTML += `
        <div data-aos="flip-up" data-aos-duration="1000" class="col-12 mb-4 d-flex justify-content-center">
        <div class="card small-card" style="width: 800px; height: 250px;">
            <div class="row no-gutters">
                <div class="col-md-6">
                    <img src="${movie.Poster}" class="card-img" style="width: 200px; height: 250px;" alt="${movie.Title}">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#movieModal" data-imdbid="${movie.imdbID}">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    
        `;
    });

    movieResults.innerHTML = movieHTML;
}


// Function to display 'No movies found' message
function displayNoMoviesFound() {
    movieResults.innerHTML = '<div class="col"><p class="text-center">No movies found!</p></div>';
}

// Event listener for 'Read More' button click
movieResults.addEventListener('click', async function(event) {
    if (event.target.classList.contains('btn-primary')) {
        const imdbID = event.target.getAttribute('data-imdbid');
        const movieDetailsUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

        try {
            const response = await fetch(movieDetailsUrl);
            const movieDetails = await response.json();

            if (response.ok && movieDetails.Response === 'True') {
                displayMovieDetails(movieDetails);
            } else {
                console.error('Error fetching movie details:', movieDetails.Error);
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
});

// bulle des details du film
function displayMovieDetails(movie) {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <img src="${movie.Poster}" class="img-fluid mb-3" alt="${movie.Title}">
            <p><strong>Title:</strong> ${movie.Title}</p>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Rated:</strong> ${movie.Rated}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
        `;
    } else {
        console.error('Modal body element not found.');
    }
}

// Event listener for modal close
$('#movieModal').on('hidden.bs.modal', function () {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = ''; 
    } else {
        console.error('Modal body element not found.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const attackBtn = document.getElementById('submit');
    const attackSound = new Audio('rafale.wav');

  
    attackBtn.addEventListener('click', function() {
      // Jouer le son d'attaque classique
      attackSound.currentTime = 0; // Rembobiner l'audio au début
      attackSound.play(); // Lancer la lecture de l'audio
    });
  
  });
  
  