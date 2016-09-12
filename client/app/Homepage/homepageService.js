angular.module('homepage', [])

  .factory('homepageService', ['$http', function ($http) {
    return {
      getRecentLists: function () {
        return $http.get('/list/recent');
      },
      getCategories: function () {
        return $http.get('/category');
      }
    }
  }]);