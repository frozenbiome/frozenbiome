angular.module('waffle.services', [])

.factory('Post', function ($http, $location, $window) {
  var getPost = function () { // Get clicked??
  	return $http({
  	  method: 'GET'
  	  // url???
    }) 
    .then(function (res) {
      return res.data;
    });
  };
  
})

// .factory('Main', function ($http, $location, $window) {
//   var getAllPosts = function () {
//   	method: 'GET'
//   }
//   .then(function (res) {
//   	return res.data;
//   });
  
// })

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