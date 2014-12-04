angular.module('waffle', [
  'waffle.services',
  'waffle.postCtrl',
  'waffle.autCtrl.',
  'waffle.dashboardCtrl',
  'waffle.editCtrl',
  'waffle.mainCtrl',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('post', {
      templateUrl: 'app/post/postView.html',
      controller: 'PostController',
      url: '/',
    })
});