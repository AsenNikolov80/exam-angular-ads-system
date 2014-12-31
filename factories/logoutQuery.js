'use strict';
app.factory('logoutQuery', function ($http) {
    function logout() {
        var token = localStorage.token;
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/logout',
            headers: {
                "Authorization": "Bearer " + token
            }})
                .success(function (data, status, headers, config) {
                    console.log(data);
                })
                .error(function (data, status, headers, config) {
                    alert('unsuccessfull logout!');
                });
    }
    return {
        logout: logout
    }
})