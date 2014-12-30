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
    }).when('/user/home', {
        templateUrl: 'templates/homeLogged.html',
        controller: 'Secure'
    }).when('/user/ads', {
        templateUrl: 'templates/adsLogged.html',
        controller: 'Secure'
    }).when('/user/ads/publish', {
        templateUrl: 'templates/publishLogged.html',
        controller: 'Secure'
    }).when('/user/profile', {
        templateUrl: 'templates/editLogged.html',
        controller: 'Secure'
    })
            .otherwise('/');
});








