angular.module('session', [])

  .factory('SessionService', ['$http', function ($http) {
    return {
      loggedIn: function () {
        return $http.get('/loggedIn');
      },
      logout : function () {
        return $http.get('/logout');
      }
    }
  }]);