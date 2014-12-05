angular.module('waffle.nav', [])

.controller('NavController', function ($scope, $location, Auth) {
  $scope.logout = function() {
  	console.log("nav logging out")
  	Auth.logout();
  }
  // $scope.signedIn = Auth.signedIn;
  //$scope.post = {content: '', title: ''};
  // $scope.user = user;

})