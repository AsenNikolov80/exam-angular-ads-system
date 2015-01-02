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
        controller: 'PublishAd'
    }).when('/user/profile', {
        templateUrl: 'templates/editLogged.html',
        controller: 'GetUserInfo'
    }).when('/user/ads/reload',{
        redirectTo:'/user/ads'
    }).when('/user/ads/delete/:id',{
        templateUrl: 'templates/deleteAd.html',
        controller: 'DeleteAd'
    }).when('/user/ads/edit/:id',{
        templateUrl: 'templates/editAd.html',
        controller: 'EditAd'
    })
            .otherwise('/');
});








