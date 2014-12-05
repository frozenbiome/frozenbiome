angular.module('waffle.services', [])

.factory('Edit', function ($http, $location, $window) {
  //getPost() if post exists, else if new post, don't
  var addPost = function (title, content) {
    return $http({
      method: 'POST',
      url: 'newPost',
      data: { title: title, content: content, username: 'BILLY' }
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
      url: '/users',


    })
    .then(function (res) {
    	return res.data;
    });
  }

  return {
  	getAllPosts: getAllPosts,
  };
})
