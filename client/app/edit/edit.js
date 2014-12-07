angular.module('waffle.edit', [])

.controller('EditController', function ($scope, $rootScope, Edit, Dashboard, $location) {

  $scope.submit = function(title, content) {
  	Edit.addPost(this.title, this.content, $rootScope.user)
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
})
