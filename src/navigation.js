let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trendingMovies'
});
trendingSeriesBtn.addEventListener('click', () => {
    location.hash = '#trendingSeries'
});
arrowBtn.addEventListener('click', () => {
    history.back();
    //location.hash = '#home'
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator () {
    console.log({location});

    if (infiniteScroll) {
        window.removeEventListener('scroll',infiniteScroll, {passive: false,},);
        infiniteScroll = undefined;
    }

    if (location.hash.startsWith('#trendingMovies')) {
        trendingMoviesPage();//if we are in trendingMovies page
    } else if (location.hash.startsWith('#trendingSeries')) {
        trendingSeriesPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();// if we are in seach page
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();//if we are in movie page
    } else if (location.hash.startsWith('#serie=')) {
        serieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage(); //if we are in category page
    } else { //if we are in home page
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false,},);
    }
}

function homePage () {
    console.log('HOME!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingMoviesPreviewSection.classList.remove('inactive');
    trendingSeriesPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getTrendindSeriesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

function categoriesPage () {
    console.log('CATEGORY!!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');//with split we are saying that every time there is a = we have a position of the new array example ['#category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName

    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage () {
    console.log('MOVIE!!');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');//with split we are saying that every time there is a = we have a position of the new array example ['#movie', '132345']

    getMovieById(movieId);
}

function serieDetailsPage () {

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, serieId] = location.hash.split('=');//with split we are saying that every time there is a = we have a position of the new array example ['#movie', '132345']

    getSerieById(serieId);
}

function searchPage () {
    console.log('SEARCH!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');//with split we are saying that every time there is a = we have a position of the new array example ['#search', 'find']
    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendingMoviesPage () {
    console.log('TRENDINGMOVIES!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Trending Movies'

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}

function trendingSeriesPage () {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingMoviesPreviewSection.classList.add('inactive');
    trendingSeriesPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Trending Series'

    getTrendingSeries();

    infiniteScroll = getPaginatedTrendingSeries;
}