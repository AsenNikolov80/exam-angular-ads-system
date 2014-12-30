app.factory('GetAds', function ($http) {
    function getCategories(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load categories');
                });
    }
    function getAllAds(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load ads');
                });
    }
    function getTowns(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
                    alert('Can\'t load towns');
                });
    }
    function getAdsOfUser(success) {
        var token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads'
        }).success(function (data) {
            success(data);
        }).error(function () {
            alert("can't load user ads!");
        })
    }
    function deactivateAd(id) {
        var token = localStorage.getItem('token');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id
        }).success(function (data) {
            
        }).error(function () {
            alert("can't deactivate");
        })
    }
    return {
        getCategories: getCategories,
        getAllAds: getAllAds,
        getTowns: getTowns,
        getAdsOfUser: getAdsOfUser,
        deactivateAd: deactivateAd
    };
})