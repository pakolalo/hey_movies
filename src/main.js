const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key':API_KEY,
    },
});

async function getTrendingMoviesPreview() {
    const {data} = await api('trending/all/day');
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';// avoid to download again the movies and the categories
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');//Added the class movie-container to the div in HTML
        const movieImg = document.createElement('img');// Created the element img in HTML
        movieImg.classList.add('movie-img');// Added the class movie-img to the img in HTML
        movieImg.setAttribute('alt', movie.title);//added the attribute alt to the img
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);//added the attribute src to the img

        movieContainer.appendChild(movieImg);//added the image to the div 
        trendingMoviesPreviewList.appendChild(movieContainer);//added the div to the article in html


    });
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;

    categoriesPreviewList.innerHTML= '';// avoid to download again the movies and the categories

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
        categoriesPreviewList.appendChild(categoryContainer);//added the div to the article

    });
}

async function getMoviesByCategory() {
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';// avoid to download again the movies and the categories
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');//Added the class movie-container to the div in HTML
        const movieImg = document.createElement('img');// Created the element img in HTML
        movieImg.classList.add('movie-img');// Added the class movie-img to the img in HTML
        movieImg.setAttribute('alt', movie.title);//added the attribute alt to the img
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);//added the attribute src to the img

        movieContainer.appendChild(movieImg);//added the image to the div 
        trendingMoviesPreviewList.appendChild(movieContainer);//added the div to the article in html


    });
}