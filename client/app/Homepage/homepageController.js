angular.module('homepage')

  .controller('homepageController', ['homepageService', 'SessionService', '$scope', '$rootScope',
    function (homepageService, SessionService, $scope, $rootScope) {

      //Kategorileri doldur
      homepageService.getCategories().success(function (categories) {
        $scope.categories = categories;
      });

      homepageService.getRecentLists().success(function (lists) {
        $scope.lists = lists;
      });

      $scope.logout = function () {
        SessionService.logout().success(function (data) {
          if (data.logout == true) {
            delete $rootScope.user;
          }
        });
      }
    }]);
