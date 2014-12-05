angular.module('waffle.edit', [])

.controller('EditController', function ($scope, Edit) {

  $scope.submit = function(title, content) {
    console.log(this.title);
    console.log(this.content);
  	Edit.addPost(this.title, this.content)
  	.then (function() {
  	  console.log("promise achieved")
  	});
  }
})