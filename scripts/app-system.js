var app = angular.module('AdsSystem', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/indexTemplate.html',
        controller: 'Main'
    }).when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'Login'
    }).when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'Register'
    }).when('/secure', {
        templateUrl: 'templates/secure.html',
        controller: 'Secure'
    })
            .otherwise('/');
});








