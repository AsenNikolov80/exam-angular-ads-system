app.factory('registerQuery', function ($http) {
    function register(user,success) {
        $http({
            url: 'http://softuni-ads.azurewebsites.net/api/user/register',
            method: 'POST',
            data: JSON.stringify(user)
        })
                .success(function (data) {
                    $('<div class="infoMsg">').text('You have registered to our site!').appendTo('body');
                    setTimeout(function () {
                        $('.infoMsg').remove();
                    }, 2000);
                    success(data);
                })
                .error(function () {
                    $('<div class="errorDivPublish">').text('Registration canceled! Please try again!').appendTo('body');
                    setTimeout(function () {
                        $('.errorDivPublish').remove();
                    }, 3000);
                })
    }
    return {
        register: register
    }
})