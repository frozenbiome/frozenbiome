angular.module('waffle', [
  'waffle.services',
  'waffle.post',
  'waffle.edit',
  'waffle.dashboard',
  'waffle.auth',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('post', {
      templateUrl: 'app/post/post.html',
      controller: 'DashboardController',
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

<<<<<<< HEAD
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

})
=======
