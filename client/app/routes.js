angular.module('routes', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $stateProvider

      .state('Homepage', {
        url: '/',
        templateUrl: 'Homepage/homepage.html',
        resolve: {
          user: check
        }
      });

    $urlRouterProvider.otherwise("/");

  }]);

var check = function ($q, sessionService, $state, $rootScope) {
  var deferred = $q.defer();
  sessionService.loggedIn().success(function (userLoggedIn) {
    if (userLoggedIn) {
      $rootScope.currentUser = true;
      $rootScope.userId = userLoggedIn._id;
      $rootScope.userName = userLoggedIn.facebook.name;
    } else {
      $rootScope.currentUser = false;
      delete $rootScope.userId;
      delete $rootScope.userName;
    }
    deferred.resolve();
  });
  return deferred.promise;
};