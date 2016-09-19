angular.module('homepage', ['ui.bootstrap'])

  .controller('homepageController', ['homepageService', 'SessionService', '$scope', '$rootScope', '$uibModal', '$stateParams', '$location',
    function (homepageService, SessionService, $scope, $rootScope, $uibModal, $stateParams, $location) {
      var categoryIndex = parseInt($stateParams.categoryIndex);
      var categoryId = "";

      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };

      //Kategorileri doldur
      homepageService.getCategories().success(function (categories) {
        $scope.categories = categories;
        if (categoryIndex != "" && !(categoryIndex >= categories.length) && categoryIndex > 0) {
          categoryId = categories[categoryIndex]._id;
        } else {
          categoryId = "recent";
        }
        homepageService.getListsByCategory(categoryId).success(function (lists) {
          $scope.lists = lists;
        });
      });

      $scope.logout = function () {
        SessionService.logout().success(function (data) {
          if (data.logout == true) {
            delete $rootScope.user;
          }
        });
      };

      $scope.likeList = function (listId, itemId) {
        homepageService.likeList(listId, itemId).success(function (lists) {
          $scope.lists = lists;
        });
      };

      //Katkıda bulun modal'ı
      $scope.open = function (list) {
        homepageService.setMaster(list);
        $scope.modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          controller: 'ModalController',
          templateUrl: 'contributionModal.html'
        });
      };

      $scope.isExists = function (likes, userId) {
        var obj = likes.some(function (x) {
          return x == userId;
        });
        return obj !== null && obj != false;
      };

    }])

  .controller('ModalController', ['$uibModalInstance', '$scope', 'homepageService',
    function ($uibModalInstance, $scope, homepageService) {
      $scope.modalFormData = {};
      $scope.completed = false;

      //Listeye eleman ekleme
      $scope.createItem = function () {
        $scope.modalFormData.list_id = homepageService.getMaster()._id;
        homepageService.createItem($scope.modalFormData).success(function (lists) {
          $scope.completed = true;
        });
      };

    }]);