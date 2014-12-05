angular.module('waffle.dashboard', [])


.controller('DashboardController', function ($scope, Dashboard, $timeout) {
  $scope.posts = [{url: 'www.google.com', title: 'Waffle House Printing Blog', content: 'asdjf ajsdljfasdlkfh ahsfjasdfjklasjdflaj asdlfjaksdfjasdflj laksdjflajdsf;l ja;sdkfjasdffjksadjfk lasdjfklasdjf ljsdf'}];
  //$scope.posts = [];
  $scope.getAllPosts = function () {
    console.log("GETTING POSTS")
/*    Dashboard.getAllPosts()*/
      //.then(function (data) {
         //data.forEach(function(post) {
          //$scope.posts.push(post);
        //});
      //})
      //.catch(function (error) {
        //console.error(error);
      /*});*/
  };
})
