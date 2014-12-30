'use strict';
app.controller('Login', function ($scope, loginQuery, $location) {
    $('#logout').remove();
    $scope.loginTry = function () {
        loginQuery.login(function (resp) {
            if (resp.access_token) {
                localStorage.setItem('token', resp.access_token);
                localStorage.setItem('username', resp.username);
                localStorage.link = 1;
                $location.path('home/logged');
            }
        });
    };
}
);