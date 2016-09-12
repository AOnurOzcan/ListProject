angular.module('dashboard', [])

  .factory('dashboardService', ['$http', function ($http) {
    return {
      getUnapprovedLists: function () {
        return $http.get('/list/unapproved');
      },
      getUnapprovedItems: function () {
        return $http.get('/item/unapproved');
      },
      approveItem: function (itemId, listId) {
        return $http.get('/list/item/' + listId + '/' + itemId);
      },
      approveList: function (listId) {
        return $http.get('/list/approve/' + listId);
      }
    }
  }]);