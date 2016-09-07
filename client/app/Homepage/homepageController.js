angular.module('homepage')

  .controller('homepageController', ['homepageService', 'sessionService', '$scope', '$rootScope',
    function (homepageService, sessionService, $scope, $rootScope) {
      $scope.categories = ['Teknoloji', 'Dizi', 'Film', 'Oyun', 'Siyaset', 'Müzik', 'Spor', 'Bilim', 'Sosyal Medya'];
      $scope.lists = [
        {
          title: "List 1",
          items: [
            {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }
          ]
        },
        {
          title: "List 2",
          items: [{
            name: "Item 1",
            likes: 2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          }, {
            name: "Item 1",
            likes: 10,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }, {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }]
        },
        {
          title: "List 3",
          items: [{
            name: "Item 1",
            likes: 60,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          }, {
            name: "Item 1",
            likes: 10,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }, {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }, {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }]
        },
        {
          title: "List 4",
          items: [{
            name: "Item 1",
            likes: 40,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          }, {
            name: "Item 1",
            likes: 10,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
          },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }, {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }, {
              name: "Item 1",
              likes: 10,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            },
            {
              name: "Item 2",
              likes: 13,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper ultricies est. Suspendisse tortor orci, imperdiet in metus in, ullamcorper auctor leo. Fusce et dapibus justo."
            }]
        }
      ];
      $scope.logout = function () {
        sessionService.logout().success(function (data) {
          if (data.logout == true) {
            $rootScope.currentUser = false;
          }
        });
      }
    }]);
