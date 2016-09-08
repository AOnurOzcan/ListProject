angular.module('profile')

  .controller('ProfileController', ['profileService', '$scope', function (profileService, $scope) {

    $scope.listFormData = {};
    $scope.listArray = [];
    $scope.formData = {};

    profileService.getUsersLists().success(function (lists) {
      $scope.lists = lists;
    });

    $scope.createList = function () {

      if ($scope.formData.title != undefined) {

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
      $scope.listFormData.list_id = list_id;
      $scope.listFormData.item = $scope.listArray[index];

      profileService.createItem($scope.listFormData)
        .success(function (lists) {
          $scope.listFormData = {};
          $scope.listArray = {};
          $scope.lists = lists;
        });
    }

  }]);