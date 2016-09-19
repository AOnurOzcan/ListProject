angular.module('approve')

  .controller('approveController', ['approveService', '$scope', function (approveService, $scope) {

    approveService.getUnapprovedLists().success(function (lists) {
      $scope.lists = lists;
    });

    approveService.getUnapprovedItems().success(function (items) {
      $scope.items = items;
    });

    $scope.approveList = function (listId) {
      approveService.approveList(listId).success(function (lists) {
        $scope.lists = lists;
      });
    };

    $scope.approveItem = function (itemId, listId) {
      approveService.approveItem(itemId, listId).success(function (items) {
        $scope.items = items;
      });
    };

    $scope.removeList = function (listId) {
      approveService.removeList(listId).success(function (lists) {
        $scope.lists = lists;
      });
    };

    $scope.removeItem = function (listId, itemId) {
      approveService.removeItem(listId, itemId).success(function (items) {
        $scope.items = items;
      });
    };

  }]);
