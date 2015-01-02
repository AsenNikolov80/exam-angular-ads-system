'use strict';
app.controller('Register', function ($scope, registerQuery, $location, GetAds) {
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    });
    $scope.register = function (user) {
//        if (!user.name || !user.email || !user.password || !user.phone) {
//        
//            return;
//        }
        registerQuery.register(user, function (resp) {
            localStorage.setItem('token', resp.access_token);
            localStorage.setItem('username', resp.username);
            localStorage.link = 1;
            localStorage.link2 = 1;
            $location.path('user/home');
        });
    }
});