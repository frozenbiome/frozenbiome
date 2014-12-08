angular.module('waffle.edit', [])

.controller('EditController', function ($scope, $rootScope, Edit, Dashboard, $location, Auth) {

  $scope.getRandomName = function() {
    arr = ['Alex Hawkins', 'Evan Spiler', 'David Kae', 'Grant Wu'];
    var pos = Math.floor((Math.random() * 4));
    return arr[pos];
  }

  $scope.submit = function(title, content, created) {
  	Edit.addPost(this.title, this.content, this.created, $rootScope.user)
  	.success(function(data) {
      console.log("SUCCESS: ", data)
    })
    .error(function(err, data) {
      console.log("ERROR", err);
      console.log("DATA", data);
    });
    
    $location.path('/');
  }

  $scope.updatePost = function(title, content) {
    Edit.updatePost(title, content, $rootScope.postID)
    .success(function(data) {
  	  console.log("SUCCESS: ", data)
  	})
    .error(function(err, data) {
      console.log("ERROR", err);
      console.log("DATA", data);
    });

    $location.path('/');
  }

  $scope.checkSession = function() {
    Auth.checkSession()
    .then(function(data) {
      $rootScope.displayName = data.data;
    })
  }

})
