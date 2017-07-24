angular
  .module('omdb', [])
  .factory('omdbApi', function($http) {
    var service = {};
    var searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=00b17aa278bdea546a4abf4278f98707&language=en-US&page=1&include_adult=false&query={query}';
    var findUrl = 'https://api.themoviedb.org/3/movie/{id}?api_key=00b17aa278bdea546a4abf4278f98707&language=en-US';

    function getRequest(url) {
      return $http
        .get(url)
        .then(function(response) {
          return response.data;
        });
    }

    service.search = function(q) {
      return getRequest(searchUrl.replace('{query}', q));
    };

    service.find = function(id) {
      return getRequest(findUrl.replace('{id}', id));
    };

    return service;
  });
