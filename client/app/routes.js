angular.module('routes', ['ui.router'])

  .config(['$stateProvider','$urlRouterProvider','$httpProvider',function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'Home/home.html'
      })

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'Dashboard/dashboard.html'
      });

    $urlRouterProvider.otherwise("/");

  }]);
