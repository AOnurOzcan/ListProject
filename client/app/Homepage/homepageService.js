angular.module('homepage')

  .factory('homepageService', ['$http', function ($http) {

    var selected;

    return {
      getListsByCategory: function (categoryId) {
        return $http.get('/list/category/' + categoryId);
      },
      getCategories: function () {
        return $http.get('/category');
      },
      likeList: function (listId, itemId) {
        return $http.get('/list/like/' + listId + '/' + itemId);
      },
      createItem: function (item) {
        return $http.post('/list/item', item);
      },
      setMaster: function (section) {
        selected = section;
      },
      getMaster: function () {
        return selected;
      }
    }
  }]);