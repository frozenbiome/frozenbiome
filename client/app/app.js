angular.module('waffle', [
  'waffle.services',
  'waffle.dashboard',
  'waffle.edit',
  'waffle.post',
  'waffle.auth',
  'waffle.nav',
  'ui.router',
  'yaru22.md',
  'ngSanitize'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/dashboard');
  
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $stateProvider
    .state('post', {
      templateUrl: 'app/post/post.html',
      controller: 'EditController',
      url: '/post'
    })

    .state('edit', {
      templateUrl: 'app/edit/edit.html',
      controller: 'EditController',
      url: '/edit'
    })

    .state('dashboard', {
    	templateUrl: 'app/dashboard/dashboard.html',
    	controller: 'DashboardController',
    	url: '/dashboard'
    })

    .state('login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController',
      url: '/login'
    })

    .state('signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      url: '/signup'
    })

    .state('users', {
      templateUrl: 'app/users/users.html',
      controller: 'DashboardController',
      url: "/{beginPath:users/}{endPath:.+}"
    })

})

.factory('httpRequestInterceptor', ['$q', '$location', '$rootScope', function($q, $location) {
    return {
      'responseError': function(rejection) {
          if (rejection.status === 403) {

              $location.path('/login');
              return $q.reject(rejection);
          }
      }
  };
}]);
