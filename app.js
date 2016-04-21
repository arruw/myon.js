var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
           templateUrl: './views/main/view.html',
           controller: 'mainCtrl' 
        }).
        otherwise({
           redirectTo: '/' 
        });
}]);