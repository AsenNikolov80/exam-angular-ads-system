app.factory('loginQuery', function ($http) {
    function login(success) {
        var username = $('#user').val();
        var password = $('#pass').val();
        if (!username || !password) {
            return;
        }
//        console.log(username);
        $http({
            url: 'http://softuni-ads.azurewebsites.net/api/user/login',
            method: 'POST',
            data: JSON.stringify({
                username: username,
                password: password
            })
        }).success(function (data) {
            success(data);
        }).error(function () {
            var errorDiv = $('<div class="errorDiv">').text('Invalid data!');
            $('.form').prepend(errorDiv);
            var time = setTimeout(function () {
                $('.errorDiv').remove();
            }, 2000)
        })
    }

    return {
        login: login,
    }
})