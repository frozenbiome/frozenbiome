angular.module('waffle.nav', [])

.controller('NavController', function ($scope, $location, $rootScope, Auth) {
  $scope.logout = function() {
  	console.log("nav logging out")
  	Auth.logout();
  	$rootScope.loggedIn = false;
  	$rootScope.user = '';

  }
  // $scope.signedIn = Auth.signedIn;
  //$scope.post = {content: '', title: ''};
  // $scope.user = user;

})