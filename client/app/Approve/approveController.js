angular.module('dashboard')

  .controller('dashboardController', ['dashboardService', '$scope', function (dashboardService, $scope) {

    dashboardService.getUnapprovedLists().success(function (lists) {
      $scope.lists = lists;
    });

    dashboardService.getUnapprovedItems().success(function (items) {
      console.log(items);
      $scope.items = items;
    });

    $scope.approveList = function (listId) {
      dashboardService.approveList(listId).success(function (lists) {
        $scope.lists = lists;
      });
    }

    $scope.approveItem = function (itemId, listId) {
      dashboardService.approveItem(itemId, listId).success(function (items) {
        $scope.items = items;
      });
    }
  }]);
