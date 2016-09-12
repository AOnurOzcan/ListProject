angular.module('category')

  .controller('categoryController', ['categoryService', '$scope', function (categoryService, $scope) {

    $scope.formData = {};
    $scope.tableData = [];

    $scope.editMode = false;

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    };

    categoryService.getCategories().success(function (categories) {
      $scope.categories = categories;
    });

    $scope.createCategory = function () {
      categoryService.createCategory($scope.formData).success(function (categories) {
        $scope.categories = categories;
        $scope.formData = {};
      });
    };

    $scope.updateCategory = function (index) {
      categoryService.updateCategory($scope.categories[index]).success(function (categories) {
        $scope.categories = categories;
        $scope.editMode = false;
      });
    };

    $scope.removeCategory = function (categoryId) {
      categoryService.removeCategory(categoryId).success(function (categories) {
        $scope.categories = categories;
      });
    };

  }]);
