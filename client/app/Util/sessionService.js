angular.module('session', ['ngResource'])

  .factory('sessionService', ['$resource', '$http', function ($resource, $http) {
    return {
      loggedIn: function () {
        return $http.get('/loggedIn');
      },
      logout : function () {
        return $http.get('/logout');
      }
    }
  }]);