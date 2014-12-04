angular.module('waffle.services', [])

.factory('Edit', function ($http, $location, $window) {
  //getPost() ?? if post exists, else if new post don't
  //var editPost?
  var addPost = function (post) {
  	method: 'POST',
  	data: post
  } 

})

.factory('Dashboard', function ($http, $location, $window) {
  var getAllPosts = function () {
  	method: 'GET'
  }
  .then(function (res) {
  	return res.data;
  });

  return {
  	getPost: getPost,
  	getAllPosts: getAllPosts,
  	addPost: addPost
  };

})