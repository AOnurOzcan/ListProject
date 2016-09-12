angular.module('category', [])

  .factory('categoryService', ['$http', function ($http) {
    return {
      getCategories: function () {
        return $http.get('/category');
      },
      createCategory: function (formData) {
        return $http.post('/category', formData);
      },
      removeCategory: function (categoryId) {
        return $http.delete('/category/' + categoryId);
      },
      updateCategory: function (formData) {
        debugger;
        return $http.put('/category', formData);
      }
    }
  }]);