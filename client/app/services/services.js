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
      //TODO: Dynamically update username, and display at top of dashboard page
      url: '/users?q=BILLY',
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
  var login = function (username, password) {
    return $http({
      method: 'POST',
      url: '/login',
      data: {username: username, password: password}
    })
    //TODO display error responses to client
    .then(function(res) {
      
    }) 
  }

  var signup = function () {
    return $http({
      method: 'POST',
      url: '/signup',
      data: {username: username, password: password}
    })
    //TODO display error responses to client 
    .then(function(res) {
    })
  }

  return {
  	login: login,
    signup: signup
  };
})
