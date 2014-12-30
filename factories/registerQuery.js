app.factory('registerQuery', function ($http) {
    function register(success) {
        var username = $('#user').val();
        var password = $('#pass').val();
        $http({
            url: 'http://softuni-ads.azurewebsites.net/api/user/login',
            method: 'POST',
            data: JSON.stringify({
                username: username,
                password: password
            })
        })
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    
                })
    }
    return {
        login: login
    }
})