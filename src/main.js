async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key='+ API_KEY)
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');//Added the class movie-container to the div in HTML
        const movieImg = document.createElement('img');// Created the element img in HTML
        movieImg.classList.add('movie-img');// Added the class movie-img to the img in HTML
        movieImg.setAttribute('alt', movie.title);//added the attribute alt to the img
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);//added the attribute src to the img

        movieContainer.appendChild(movieImg);//added the image to the div 
        trendingPreviewMoviesContainer.appendChild(movieContainer);//added the div to the article in html


    });
}

getTrendingMoviesPreview();