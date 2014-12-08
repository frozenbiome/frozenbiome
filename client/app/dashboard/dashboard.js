angular.module('waffle.dashboard', [])


.controller('DashboardController', function($scope, $rootScope, Dashboard, $timeout, $location, Auth) {
  $scope.posts = [];
  //For tracking which posts are already rendered
  $scope.post_ids = [];

  $scope.getRandomSpan = function() {
    return Math.floor((Math.random() * 100));
  }

  $scope.getRandomName = function() {
    arr = ['Alex Hawkins', 'Evan Spiler', 'David Kae', 'Grant Wu'];
    var pos = Math.floor((Math.random() * 4));
    return arr[pos];
  }

  $scope.getAllPosts = function() {
    console.log("GETTING POSTS")
    Dashboard.getAllPosts()
      .then(function(data) {
        data.forEach(function(post) {
          console.log(post)
          if ($scope.post_ids.indexOf(post._id) == -1) {
            $scope.posts.push(post);
            $scope.post_ids.push(post._id);
          }
        }, function(err) {
          console.log("Couldn't retrieve posts: ", err);
        });

      });
  }

  $scope.makePost = function() {
    $rootScope.title = '';
    $rootScope.content = '';
    $rootScope.postID = '';
    $rootScope.isUpdate = false;

    $location.path('/edit');
  }

  $scope.savePostInfo = function() {
    console.log(this.post._id);
    $rootScope.title = this.post.title;
    $rootScope.content = this.post.content;
    $rootScope.postID = this.post._id;
    $rootScope.isUpdate = true;
    $rootScope.created = this.post.created;
  }

  $scope.testFunc = function() {
    return true;
  }

  $scope.logged = function() {
    return $rootScope.loggedIn;
  }

  $scope.checkSession = function() {
    Auth.checkSession()
    .then(function(data) {
      $rootScope.displayName = data.data.displayName;
      $rootScope.user = data.data.username;
      $rootScope.loggedIn = true;
    })
  }


})
