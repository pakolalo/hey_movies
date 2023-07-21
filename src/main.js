const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key':API_KEY,
    },
});

// utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if (entry.isIntersecting) {
        const url = entry.target.getAttribute('data-img')
        entry.target.setAttribute('src', url);
    }
    })
})

function createMovies (movies, container, {lazyLoad = false, clean = true,}={}) {
    if (clean) {
        container.innerHTML='';
    }
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');//Added the class movie-container to the div in HTML
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })
        const movieImg = document.createElement('img');// Created the element img in HTML
        movieImg.classList.add('movie-img');// Added the class movie-img to the img in HTML
        movieImg.setAttribute('alt', movie.title);//added the attribute alt to the img
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);//added the attribute src to the img
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', '/assets/error.jpg')
        })

        if (lazyLoad) {
        lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);//added the image to the div 
        container.appendChild(movieContainer);//added the div to the article in html


    });
}

function createCategories(categories, container) {
    container.innerHTML= '';// avoid to download again the movies and the categories

    categories.forEach(category => {
        
        const categoryContainer = document.createElement('div');//created the element div in html
        categoryContainer.classList.add('category-container');//added the class to the div in html
        const categoryTitle = document.createElement('h3');//created the h3 element in html
        categoryTitle.classList.add('category-title');//added the class to the h3 in html
        categoryTitle.setAttribute('id','id'+ category.id);//added the id to the h3 in html
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);//added a text to the h3 

        categoryTitle.appendChild(categoryTitleText);//added the text we put to the h3 in html
        categoryContainer.appendChild(categoryTitle);//added the h3 to the div
        container.appendChild(categoryContainer);//added the div to the article

    });
}

// calls to the API

async function getTrendingMoviesPreview() {
    const {data} = await api('trending/all/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList, true);
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)
    
}

async function getMoviesByCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad: true},)
}

function getPaginatedMoviesByCategory(id) {
    return async function () {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollBottom && pageIsNotMax) {
    page ++;
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
            page,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection, {lazyLoad: true, clean: false},);
    };
    }
}

async function getMoviesBySearch(query) {
    const {data} = await api('search/multi', {
        params: {
            query,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages

    createMovies(movies, genericSection)
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollBottom && pageIsNotMax) {
    page ++;
    const {data} = await api('search/multi', {
        params: {
            query,
            page,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection, {lazyLoad: true, clean: false},);
    };
    }
}

async function getTrendingMovies() {
    const {data} = await api('trending/all/day');
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad: true, clean: true},);
}

async function getPaginatedTrendingMovies() {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollBottom && pageIsNotMax) {
    page ++;
    const {data} = await api('trending/all/day', {
        params: {
            page,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection, {lazyLoad: true, clean: false},);
    };
}

async function  getMovieById(id) {
    const {data: movie} = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/'+ movie.poster_path;

    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})
    `;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMoviesId(id);
};

async function getRelatedMoviesId (id) {
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}