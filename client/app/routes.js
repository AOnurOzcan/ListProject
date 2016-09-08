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
        resolve: {check: requireLogin}
      })

      .state('Profile', {
        url: '/profile',
        templateUrl: 'Profile/profile.html',
        resolve: {check: notRequireLogin}
      });

    $urlRouterProvider.otherwise("/");

  }]);

var requireLogin = ['$q', 'SessionService', '$state', '$rootScope', function ($q, SessionService, $state, $rootScope) {
  var deferred = $q.defer();
  SessionService.loggedIn().success(function (userLoggedIn) {
    if (userLoggedIn) {
      if (typeof $rootScope.user == "undefined") {
        $rootScope.user = {};
        $rootScope.user.isLoggedIn = true;
        $rootScope.user.userName = userLoggedIn.facebook.name;
        $rootScope.user.picture = userLoggedIn.facebook.profilePicture;
      }
    } else {
      delete $rootScope.user;
    }
    deferred.resolve();
  });
  return deferred.promise;
}];

var notRequireLogin = ['$q', 'SessionService', '$state', '$rootScope', function ($q, SessionService, $state, $rootScope) {
  var deferred = $q.defer();
  SessionService.loggedIn().success(function (userLoggedIn) {
    if (userLoggedIn) {
      if (typeof $rootScope.user == "undefined") {
        $rootScope.user = {};
        $rootScope.user.isLoggedIn = true;
        $rootScope.user.userName = userLoggedIn.facebook.name;
        $rootScope.user.picture = userLoggedIn.facebook.profilePicture;
      }
    } else {
      delete $rootScope.user;
      $state.go("Homepage");
    }
    deferred.resolve();
  });
  return deferred.promise;
}];