angular.module('waffle.services', [])

.factory('Edit', function ($http, $location, $window) {
  //getPost() if post exists, else if new post, don't
  var addPost = function (title, content) {
    return $http({
      method: 'POST',
      //url
      data: { title: title, content: content }
    });
  }

  return{
    addPost: addPost
  };
})

.factory('Dashboard', function ($http, $location, $window) {
  var getAllPosts = function () {
  	return $http({
      method: 'GET',
      //url
      // data: post
    })
    .then(function (res) {
    	return res.data;
    });
  }

  return {
  	getAllPosts: getAllPosts,
  };
})