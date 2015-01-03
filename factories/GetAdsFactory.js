app.factory('GetAds', function ($http, $location) {
    function getToken() {
        var token = localStorage.getItem('token');
        if (!token)
            return;
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    function getCategories(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
//                    alert('Can\'t load categories');
                });
    }
    function getAllAds(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
//                    alert('Can\'t load ads');
                });
    }
    function getTowns(success) {
        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
                .success(function (data) {
                    success(data);
                })
                .error(function () {
//                    alert('Can\'t load towns');
                });
    }
    function getAdsOfUser(success) {
        getToken();
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads'
        }).success(function (data) {
            success(data);
        }).error(function () {
//            alert("can't load user ads!");
        })
    }
    function deactivateAd(id) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement was deactivated!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
        }).error(function () {
//            alert("can't deactivate");
        })
    }
    function rePublish(id) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/' + id
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement submitted for approval! Once approved, it will be published! ').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
        }).error(function () {
//            alert("can't re-publish!");
        })
    }
    function deleteAd(id) {
        getToken();
        $http({
            method: 'DELETE',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement was deleted!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
            localStorage.link2 = 1;
            $location.path('/user/ads');
        }).error(function () {
//            alert("can't delete!");
        })
    }
    function editAd(id, editedAd) {
        getToken();
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id,
            data: {
                title: editedAd.title,
                text: editedAd.text,
                changeimage: true, // TODO
                ImageDataURL: editedAd.imageDataUrl,
                categoryid: editedAd.categoryId,
                townid: editedAd.townId
            }
        }).success(function (data) {
            $('<div class="infoMsg">').text('Advertisement was edited!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
            localStorage.link2 = 1;
            $location.path('/user/ads');
        }).error(function () {
//            alert("can't edit!");
        })
    }
    function getInfoForDeleteAd(id, success) {
        getToken();
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id
        }).success(function (data) {
//            console.log(data);
            success(data);
        }).error(function () {

        })
    }
    function createAd(ad) {
        getToken();
        $http({
            method:'POST',
            url:'http://softuni-ads.azurewebsites.net/api/user/ads',
            data:JSON.stringify(ad)
        }).success(function (data){
            $('<div class="infoMsg">').text('Advertisement was created!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 2000);
            localStorage.link2 = 1;
            localStorage.link = 2;
            $location.path('/user/ads');
        }).error(function (){            
            $('<div class="errorDivPublish">').text('Advertisement has NOT created! Please try again!').appendTo('body');
            setTimeout(function () {
                $('.errorDivPublish').remove();
            }, 3000);
        })
    }
    return {
        getCategories: getCategories,
        getAllAds: getAllAds,
        getTowns: getTowns,
        getAdsOfUser: getAdsOfUser,
        deactivateAd: deactivateAd,
        rePublish: rePublish,
        deleteAd: deleteAd,
        getInfoForDeleteAd: getInfoForDeleteAd,
        editAd: editAd,
        createAd: createAd
    };
})