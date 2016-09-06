angular.module('homepage', ['ngResource'])

  .factory('homepageService', ['$resource', function ($resource) {
    return $resource('/list/:id', {}, {
      query: {method: 'GET', params: {id: ''}, isArray: true},
      post: {method: 'POST'},
      update: {method: 'PUT'},
      remove: {method: 'DELETE'}
    })
  }]);