angular.module('waffle.dashboard', [])


.controller('DashboardController', function ($scope, Dashboard, $timeout) {
  $scope.posts = [];
  $scope.getAllPosts = function () {
    Dashboard.getAllPosts()
      .then(function (data) {
         data.forEach(function(post) {
          $scope.posts.push(post);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})