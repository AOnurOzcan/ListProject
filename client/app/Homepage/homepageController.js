angular.module('homepage')

  .controller('homepageController', ['homepageService', function (homepageService) {
    console.log("hi");
    homepageService.query();
  }]);