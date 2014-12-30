'use strict';
app.controller('Login', function ($scope, loginQuery, $location) {
    $('#logout').remove();
    $scope.loginTry = function () {
        loginQuery.login(function (resp) {
            if (resp.access_token != null && resp.access_token != undefined && resp.access_token != '') {
                localStorage.setItem('token', resp.access_token);
                localStorage.setItem('username', resp.username);
                localStorage.link = 1;
                localStorage.link2 = 1;
                $location.path('user/home');
            }
        });
    };
}
);