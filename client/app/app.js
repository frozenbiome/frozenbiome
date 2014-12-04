angular.module('waffle', [
  'waffle.services',
  'waffle.post',
  'waffle.auth',
  'waffle.dashboard',
  'waffle.edit',
  'waffle.main',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('post', {
      templateUrl: 'app/post/post.html',
      controller: 'PostController',
      url: '/post'
    })
})