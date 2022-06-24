let leftMenu = $('.leftMenu');
let rightMenu = $('.rightMenu');
let triggle = $('#triggle');

triggle.click(function () {
    let width = leftMenu.outerWidth();
    if (triggle.attr('class') === 'open') {
        triggle.removeClass('open').addClass('close');
        leftMenu.animate({ 'left': `-${width}px` }, 1000);
        rightMenu.animate({ 'left': `0px` }, 1000);
        $('.leftMenu li').animate({ opacity: 0, paddingTop: '500px' }, 1000);
    }
    else {
        triggle.removeClass('close').addClass('open');
        leftMenu.animate({ 'left': `0` }, 1000);
        rightMenu.animate({ 'left': `${width}px` }, 1000);
        $('.leftMenu li').animate({ opacity: 1, paddingTop: '20px' }, 1000);
    }
});


let moviesList = [];
let imgPath = `https://image.tmdb.org/t/p/w500/`;
let movieContainer = document.getElementById('movies-container');
let movieTitle = `now_playing`;
let menueMovies = document.querySelectorAll('.nav-item li a');

async function getMovies(category) {
    // let movieResponse = await fetch(`https://api.themoviedb.org/3/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1SeiZTnTpAvf-PLdAjW5VwweyaoR-wbsWyCZlgzEaNEZ22m0AtUd4qv0k`);
    let movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`);
    movieResponse = await movieResponse.json();
    moviesList = movieResponse.results;
    console.log(moviesList);
    displayMovies(moviesList);
}

getMovies(movieTitle);

for (let i = 0; i < menueMovies.length - 1; i++) {
    menueMovies[i].addEventListener('click', function () {
        getMovies(this.getAttribute('movie-title'));
    });
}

/* ********************************
    Search Movies
********************************** */

let searchedMovies = [];

async function searchMovie(query) {
    let searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${query}&page=1&include_adult=false`);
    searchResponse = await searchResponse.json();
    searchedMovies = searchResponse.results;
    console.log(moviesList);
    displayMovies(searchedMovies);
}

$('#searchByWord').on('input', function (e) {
    if (e.target.value.trim().length !== 0) {
        console.log(e.target.value.trim())
        searchMovie(e.target.value.trim())
    }
});

$('#search').on('input', function (e) {
    let filteredMovies = [];
    searchedMovies.forEach(movie => {
        if (movie.original_title.toLowerCase().includes(e.target.value.toLowerCase())) {
            filteredMovies.push(movie);
        }
    });

    displayMovies(filteredMovies);
});

function displayMovies(items) {
    let temp = ``;
    for (let i = 0; i < items.length; i++) {
        temp += `<div class="col-md-4 mb-2">
            <div class="movie-item">
                <img src="${imgPath}${items[i].poster_path}" class="img-fluid" >
                <div class="layer">
                    <h2>${items[i].original_title}</h2>
                    <p>${items[i].overview}</p>
                    <p>rate ${items[i].vote_average}</p>
                    <p>released date ${items[i].release_date}</p>
                </div>
            </div>
        </div>`;
    }

    movieContainer.innerHTML = temp;
}


/* ***************************
    Form Validation
****************************** */
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const userAge = document.getElementById('age');
const userPassword = document.getElementById('password');
const userRepassword = document.getElementById('repassword');

function validateInput(input, regex, message) {
    if (regex.test(input.value)) {
        input.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else {
        input.nextElementSibling.classList.replace('d-none', 'd-block');
        input.nextElementSibling.textContent = message;
    }
}

userName.addEventListener('input', (e) => {
    validateInput(e.target, /^[A-Z][a-z]{3,}/, 'Enter at least four characters, but the first should be uppercase');
});

userEmail.addEventListener('input', (e) => {
    validateInput(e.target, /^[a-z]{1,}@[a-z]{1,}.com$/, 'Enter a valid Email');
});

userPhone.addEventListener('input', (e) => {
    validateInput(e.target, /^01[0125][0-9]{8}$/, 'Enter a valid Phone Number');
});

userAge.addEventListener('input', (e) => {
    validateInput(e.target, /^[1-9]{1,2}$/, 'Enter a real Age');
});

userPassword.addEventListener('input', (e) => {
    validateInput(e.target, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Enter a valid Password, at least 8 character includes at least one letter and one character');
});

userRepassword.addEventListener('input', (e) => {
    if (e.target.value === userPassword.value) {
        e.target.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else {
        e.target.nextElementSibling.classList.replace('d-none', 'd-block');
        e.target.nextElementSibling.textContent = `Enter the same password`;
    }
});