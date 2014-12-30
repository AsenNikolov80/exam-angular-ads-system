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
    }).when('/home/logged', {
        templateUrl: 'templates/homeLogged.html',
        controller: 'Secure'
    }).when('/ads/logged',{
        templateUrl: 'templates/adsLogged.html',
        controller: 'Secure'
    }).when('/publish/logged',{
        templateUrl: 'templates/publishLogged.html',
        controller: 'Secure'
    }).when('/edit/logged',{
        templateUrl: 'templates/editLogged.html',
        controller: 'Secure'
    })
            .otherwise('/');
});








