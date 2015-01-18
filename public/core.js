// public/core.js
var cleanBlog = angular.module('cleanBlog', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.errorMessages = {};

    $http.get('/api/version')
        .success(function(data) {
            $scope.api_version = data;
            console.log('version' + data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });


    $http.get('/api/posts')
        .success(function(data){
            $scope.posts = data;
            console.log(data);
        })
        .error(function(data){
            $scope.errorMessages.push(data);
        });

}