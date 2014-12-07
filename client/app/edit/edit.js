angular.module('waffle.edit', [])

.controller('EditController', function ($scope, $rootScope, Edit, Dashboard) {

  $scope.submit = function(title, content) {
    console.log(this.title);
    console.log(this.content);
  	Edit.addPost(this.title, this.content)
  	.success(function(data) {
  	  console.log("SUCCESS: ", data)
  	})
    .error(function(err, data) {
      console.log("ERROR", err);
      console.log("DATA", data);
    });
  }
})
