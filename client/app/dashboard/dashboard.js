angular.module('waffle.dashboard', [])


.controller('DashboardController', function ($scope, Dashboard, $timeout) {
  $scope.posts = [];
  //For tracking which posts are already rendered
  $scope.post_ids = [];

  $scope.getAllPosts = function () {
    console.log("GETTING POSTS")
    Dashboard.getAllPosts()
      .then(function (data) {
         data.forEach(function(post) {
           //TODO: PUSH IN DESC CREATED ORDER
           if ($scope.post_ids.indexOf(post._id) == -1) {
             $scope.posts.push(post);
             $scope.post_ids.push(post._id);
           }
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})
