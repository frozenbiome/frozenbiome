angular.module('waffle.dashboard', [])


.controller('DashboardController', function ($scope, $rootScope, Dashboard, $timeout) {
  $scope.posts = [];
  //For tracking which posts are already rendered
  $scope.post_ids = [];

  $scope.getAllPosts = function () {
    console.log("GETTING POSTS")
      Dashboard.getAllPosts()
      .then(function (data) {
        data.forEach(function(post) {
          console.log(post)
          if ($scope.post_ids.indexOf(post._id) == -1) {
            $scope.posts.push(post);
            $scope.post_ids.push(post._id);
          }
        }, function (err) { console.log("Couldn't retrieve posts: ", err); }
        );

      });
  }

  $scope.savePostInfo = function() {
    $rootScope.title = this.post.title;
    $rootScope.content = this.post.content;
    $rootScope.postID = this.post._id;
    $rootScope.isUpdate = true;
  }

  $scope.testFunc = function() {
    return true;
  }

  $scope.logged = function() {
    return $rootScope.loggedIn;
  }
  

})
