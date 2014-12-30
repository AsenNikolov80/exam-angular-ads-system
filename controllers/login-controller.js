'use strict';
app.controller('Login', function ($scope, loginQuery, $location) {
    $scope.loginTry = function () {
        loginQuery.login(function (resp) {
            if (resp.access_token) {
                localStorage.setItem('token', resp.access_token);
//                var errorDiv = $('<div class="errorDiv">').text('good data!');
//                        $('.form').prepend(errorDiv);
//                    var time = setTimeout(function () {
//                        $('.errorDiv').remove();
//                    }, 2000)
                $location.path('secure');
            }
        });
    };
}
);