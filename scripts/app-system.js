var app = angular.module('AdsSystem', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/indexTemplate.html',
        controller: 'Main'
    })
            .otherwise('/');
});



