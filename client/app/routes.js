angular.module('routes', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $stateProvider

      .state('Homepage', {
        url: '/',
        templateUrl: 'Homepage/homepage.html'
      });

    $urlRouterProvider.otherwise("/");

  }]);
