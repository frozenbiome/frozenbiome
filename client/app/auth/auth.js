angular.module('waffle.auth', [])

.controller('AuthController', function ($scope, Auth) {
	$scope.login = function() {
		Auth.login($scope.username, $scope.password)
		.success(function(data){
			$scope.username = '';
			$scope.password = '';
		})
		.error(function(err,data){
			alert('')
		})
	}

	$scope.signup = function() {
		Auth.signup($scope.username, $scope.password)
		.success(function(data){
			$scope.username = '';
			$scope.password = '';
		})
		.error(function(err,data){
			alert('')
		})
	}
 
})