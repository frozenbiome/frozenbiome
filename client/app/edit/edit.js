angular.module('waffle.edit', [])

.controller('EditController', function ($scope, Edit) {

  $scope.submit = function(title, body) {
  	Edit.addPost()
  	.then (function() {
	  console.log(title);
	  console.log(body);
  	});
  }
})