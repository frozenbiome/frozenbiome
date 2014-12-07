angular.module('waffle.nav', [])

.controller('NavController', function ($scope, $location, $rootScope, Auth) {
  $scope.logout = function() {
  	console.log("nav logging out")
  	Auth.logout();
  	$rootScope.loggedIn = false;
  	$rootScope.user = '';

  }
  
  $scope.makePost = function() {
  	$rootScope.title = '';
    $rootScope.content = '';
    $rootScope.postID = '';
    $rootScope.isUpdate = false;

  	$location.path('/edit');
  }

})