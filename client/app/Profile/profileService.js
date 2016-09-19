angular.module('profile', [])

  .factory('profileService', ['$http', function ($http) {
    return {
      getUsersLists: function () {
        return $http.get('/list');
      },
      createList: function (list) {
        return $http.post('/list', list);
      },
      updateList: function (list) {
        return $http.put('/list', list);
      },
      removeList: function (listId) {
        return $http.delete('/list/' + listId);
      },
      createItem: function (item) {
        return $http.post('/list/item', item);
      },
      getCategories: function () {
        return $http.get('/category');
      },
      removeItem: function (listId, itemId) {
        return $http.delete('/item/' + listId + '/' + itemId);
      }
    }
  }]);