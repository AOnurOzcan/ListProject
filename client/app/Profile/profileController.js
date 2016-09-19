angular.module('profile')

  .controller('ProfileController', ['profileService', '$scope', function (profileService, $scope) {

    $scope.listFormData = {};
    $scope.listArray = [];
    $scope.formData = {};
    $scope.lists = [];

    //Listeleri doldur
    profileService.getUsersLists().success(function (lists) {
      $scope.lists = lists;
    });

    //Kategorileri doldur
    profileService.getCategories().success(function (categories) {
      $scope.categories = categories;
    });

    $scope.createList = function () {

      if ($scope.formData.title != undefined && $scope.formData.category) {

        profileService.createList($scope.formData)

          .success(function (lists) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.lists = lists; // assign our new list of todos
          });
      }
    };

    $scope.removeList = function (listId) {

      profileService.removeList(listId)
        .success(function (lists) {
          $scope.lists = lists; // assign our new list of todos
        });
    };

    $scope.updateList = function (list) {
      profileService.updateList(list)
        .success(function (lists) {
          $scope.lists = lists; // assign our new list of todos
        });
    };

    $scope.createItem = function (list_id, index) {
      $scope.listFormData = $scope.listArray[index];
      $scope.listFormData.list_id = list_id;

      profileService.createItem($scope.listFormData)
        .success(function (lists) {
          $scope.listFormData = {};
          $scope.listArray = {};
          $scope.lists = lists;
        });
    }

    $scope.removeItem = function (listId, itemId, index) {
      profileService.removeItem(listId, itemId).success(function (lists) {
        $scope.lists.some(function (list) {
          if (list._id == listId) {
            list.items.splice(index, 1);
          }
        });
      });
    }

  }]);