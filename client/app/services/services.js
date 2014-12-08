angular.module('waffle.services', [])


.factory('Edit', function ($http, $location, $window) {
  //getPost() if post exists, else if new post, don't
  var addPost = function (title, content, user) {
    return $http({
      method: 'POST',
      url: '/newPost',
      data: { title: title, content: content, username: user }
    });
  }
  
  var updatePost = function (title, content, postID) {
    return $http({
      method: 'POST',
      url: 'updatePost',
      data: { title: title, content: content, username: 'david', postID: postID }
    });
  }

  return {
    addPost: addPost,
    updatePost: updatePost
  };

})

.factory('Dashboard', function ($http, $location, $window) {
  var getAllPosts = function () {
    return $http({
      method: 'GET',
      //TODO: Dynamically update username, and display at top of dashboard page
      url: '/users',
    })
    .then(function(res) {
      console.log(res.data);
      return res.data;
    })
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
  }

  var signup = function (username, password, displayName) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: {username: username, password: password, displayName: displayName}
    })
  }

  var logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    })
  }

  var checkSession = function() {
    return $http({
      methof: 'GET',
      url: '/checkSession'
    })
  }

  var loggedIn = false;
  var user = '';

  return {
  	login: login,
    signup: signup,
    logout: logout,
    loggedIn: loggedIn,
    user: user,
    checkSession: checkSession
  };
})
