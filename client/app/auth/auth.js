angular.module('waffle.auth', [])

.controller('AuthController', function ($scope, $rootScope, Auth) {
	$scope.login = function() {
		if (!$scope.username || !$scope.password) {
			alert('Username and password required!')
			return;
		}
		Auth.login($scope.username, $scope.password)
		.then(function(data){
			$rootScope.loggedIn = true;
			$rootScope.user = $scope.username;
			//TODO redirect to dashboard
		}, function(err) {
			alert(err.data)
			$scope.username = '';
			$scope.password = '';
		})
	}

	$scope.signup = function() {
		if (!$scope.username || !$scope.password) {
			alert('Username and password required!')
		}
		if ($scope.password !== $scope.passwordMatch) {
			alert('Passwords do not match!');
			return;
		}
		Auth.signup($scope.username, $scope.password)
		.then(function(data){
			$rootScope.loggedIn = true;
			$rootScope.user = $scope.username;
		}, function(err) {
			alert(err.data)
			$scope.username = '';
			$scope.password = '';
			$scope.passwordMatch = '';
		})
	}

	$scope.logout = function() {
		Auth.logout();
	}
 
})