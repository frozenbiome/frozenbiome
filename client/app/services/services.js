angular.module('waffle.services', [])


.factory('Edit', function ($http, $location, $window, $rootScope) {
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
      data: { title: title, content: content, username: $rootScope.user, postID: postID }
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
      return res.data;
    })
  }

  var deletePost = function (postID) {
    return $http({
      method: 'DELETE',
      url: '/deletePost/'+ postID,
      data: {postID: postID}
    })
  }

  var loadUserBlog = function(username) {
    return $http({
      method: 'GET',
      url: '/users/' + username,
    })
    .then(function(res) {
      return res.data;
    })
  }

  return {
    getAllPosts: getAllPosts,
    deletePost: deletePost,
    loadUserBlog: loadUserBlog
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
      method: 'GET',
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
