'use strict';
app.controller('Register', function ($scope, registerQuery, $location, GetAds) {
    if (localStorage.username && localStorage.token){
        $location.path('/user/home');
    }
    $('#logo').html('<h1>Ads - Register</h1>');

    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    });
    $scope.register = function (user) {
        if (!user.name || !user.email || !user.password || !user.phone) {
            $('<div class="errorDivPublish">').text('All data except town is required!').appendTo('body');
            setTimeout(function () {
                $('.errorDivPublish').remove();
            }, 3000);
            return;
        }
        registerQuery.register(user, function (resp) {
            localStorage.setItem('token', resp.access_token);
            localStorage.setItem('username', resp.username);
            localStorage.link = 1;
            localStorage.link2 = 1;
            $location.path('user/home');
        });
    }
});