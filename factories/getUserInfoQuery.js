app.factory('getUserInfo', function ($http, $location) {
    function getToken() {
        var token = localStorage.getItem('token');
        if (!token)
            return;
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    function getUser(success) {
        getToken();
        $http.get('http://softuni-ads.azurewebsites.net/api/user/profile')
                .success(function (data) {
                    success(data);
                })
                .error(function () {

                });
    }
    function updateUser(user) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
            data: JSON.stringify(user)
        }).success(function (data) {
            $('<div class="infoMsg">').text('User info updated!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 3000);
            localStorage.link = 1;
            $location.path('/user/home');
        }).error(function () {

        })
    }
    function changePass(pass) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/changepassword',
            data: JSON.stringify(pass)
        }).success(function () {
            $('<div class="infoMsg">').text('User password changed!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 3000);
            localStorage.link = 1;
            $location.path('/user/home');
        }).error(function () {
            $('<div class="errorDivPublish">').text('Password not changed! Please try again!').appendTo('body');
            setTimeout(function () {
                $('.errorDivPublish').remove();
            }, 3000);
        })
    }
    return {
        getUser: getUser,
        updateUser: updateUser,
        changePass: changePass
    }
})