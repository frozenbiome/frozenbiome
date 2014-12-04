angular.module('waffle.edit', [])

.controller('EditController', function ($scope, Edit) {
  $scope.submit = function() {
  	Edit.addPost()
  	.then (function() {
  	  //can't test till ng-controller set up in main html?
  	});
  }
})