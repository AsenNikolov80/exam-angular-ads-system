app.factory('adminGetAds', function ($http, $location) {
    function getToken() {
        var token = localStorage.getItem('token');
        if (!token)
            return;
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    function getAllAds(success) {
        getToken();
        $http.get('http://softuni-ads.azurewebsites.net/api/admin/ads')
                .success(function (data) {
                    success(data);
                })
                .error(function () {

                })
    }
    function approveAd(id) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/approve/' + id
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement #' + id + ' was approved!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
        }).error(function () {

        })
    }
    function deactivateAd(id){
        getToken();
        $http({
            method:'PUT',
            url:'http://softuni-ads.azurewebsites.net/api/admin/ads/reject/'+id
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement #' + id + ' was rejected!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
        }).error(function () {

        })
    }
    return {
        getAllAds: getAllAds,
        approveAd: approveAd
    }
})