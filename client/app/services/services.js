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
    })
    .then(function (res) {
    	return res.data;
    });
  }

  return {
  	getAllPosts: getAllPosts,
  };
})

.factory('Auth', function ($http, $location, $window) {
  var signup = function(username, password) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        password: password
      }
    })
  }

  var login = function(username, password) {
    return $http({
      method: 'POST',
      url: '/login',
      data: {
        username: username,
        password: password
      }
    })
  }

  return {
    signup: signup,
    login: login
  };

})