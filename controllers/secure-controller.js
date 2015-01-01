'use strict';
app.controller('Secure', function ($scope, GetAds, logoutQuery, $location) {

    if (!localStorage.username || !localStorage.token) {
        $location.path('#/');
    }

    var userInfo = $('<div id="userInfo">').text(localStorage.getItem('username'));
    $('#userInfo').remove();
    $('header').append(userInfo);
    var logoutLink = $('#logout');
    $('#logout').remove();
    logoutLink.appendTo($('header'));
    $scope.logout = function () {
        logoutQuery.logout();
        localStorage.clear();
        $('#logout').remove();
        $('#userInfo').remove();
        $('#logout').remove();
        $('#userInfo').remove();
        $location.path('#/');
    }
    $scope.selectedIndex = -1;
    $scope.selectedIndexCategory = -1;
    $scope.link = localStorage.link;
    $scope.link2 = localStorage.link2;
    $scope.linkClicked = linkClicked;
    $scope.changeClass = changeClass;
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    function changeClass(id) {
        localStorage.link2 = id;
        $scope.link2 = id;
    }
//        $.get("templates/homeLogged.html", function (data) {
//            $("main").append(data);
//        });

    $scope.itemClicked = function (index) {
        $scope.selectedIndex = index;
    };
    $scope.categoryClicked = function ($index) {
        $scope.selectedIndexCategory = $index;
    };
    $scope.changeView = changeView;
    function changeView(view) {
        $location.path(view);
    }

    $scope.choise = {};
    GetAds.getCategories(function (resp) {
        $scope.categories = resp;
    });
    GetAds.getAllAds(function (resp) {
        $scope.ads = resp.ads;
    });
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })
    GetAds.getAdsOfUser(function (resp) {
        $scope.adsByUser = resp.ads;
//        console.log($scope.adsByUser);
    });
    $scope.getFilterByTownID = function (name) {
        if (name) {
            $scope.choise.townId = name;
        }
        else {
            delete($scope.choise.townId);
        }
        console.log($scope.choise);
    }
    $scope.getFilterByCatID = function (name) {
        if (name) {
            $scope.choise.categoryId = name;
        }
        else {
            delete($scope.choise.categoryId);
        }
        console.log($scope.choise);
    }
    $scope.choiseTypeAd = {};
    function choiseType(id) {
        if (id == 'all') {
            $scope.choiseTypeAd = {};
            return;
        }
        $scope.choiseTypeAd.status = id;
        console.log($scope.choiseTypeAd);
    }
    $scope.choiseType = choiseType;

    $scope.deactivateAd = deactivateAd;
    function deactivateAd(id) {
        GetAds.deactivateAd(id);
    }
    $scope.rePublishAd = rePublishAd;
    function rePublishAd(id) {
        GetAds.rePublish(id);
    }
    $scope.confirmDeleteAd = confirmDeleteAd;
    function confirmDeleteAd(id) {
        $location.path('/user/ads/delete/'+id);
    }
    $scope.confirmEditAd = confirmEditAd;
    function confirmEditAd(id) {
        $location.path('/user/ads/edit/'+id);
    }

});
