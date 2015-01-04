'use strict';
app.controller('Secure', function ($scope, GetAds, logoutQuery, $location) {

    if (!localStorage.username || !localStorage.token) {
        $location.path('/');
    }
    if (localStorage.admin) {
        $location.path('/admin/home');
    }


    if ($location.path() == '/user/home') {
        $('#logo').html('<h1>Ads - Home</h1>');
    } else if ($location.path() == '/user/ads/publish') {

        $('#logo').html('<h1>Ads - Publish New Ad</h1>');
    } else if ($location.path() == '/user/ads') {
        $('#logo').html('<h1>Ads - My Ads</h1>');
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
    GetAds.getAdsOfUser(1, function (resp) {
        console.log(resp);
        $scope.adsByUser = resp.ads;
        $scope.pages = resp.numPages;
        getPages();
        if (!localStorage.currentPage) {
            localStorage.currentPage = 1;
        }
        $scope.currentPage = localStorage.currentPage;
//        console.log($scope.adsByUser);
    });

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
    GetAds.getAllAds(1, function (resp) {
        if ($location.path() == '/user/ads') {
            return;
        } else {
            $scope.pages = resp.numPages;
            $scope.ads = resp.ads;
            getPages();
            localStorage.currentPage = 1;
            $scope.currentPage = localStorage.currentPage;
        }
    });
    function getPages() {
        $scope.pageArray = [];
        for (var i = 1; i <= $scope.pages; i++) {
            $scope.pageArray.push(i);
        }
        console.log($scope.pageArray);
    }
    $scope.goToPage = function (page) {
        GetAds.getAllAds(page, function (resp) {
            $scope.ads = resp.ads;
            localStorage.currentPage = page;
            $scope.currentPage = localStorage.currentPage;
            $location.path('/user/home');

        })
    }
    $scope.goToPageUserAds = function (page) {
        GetAds.getAdsOfUser(page, function (resp) {
            $scope.pages = resp.numPages;
            $scope.adsByUser = resp.ads;
            localStorage.currentPage = page;
            getPages();
            $scope.currentPage = localStorage.currentPage;
        })
    }
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })

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
        $location.path('/user/ads/delete/' + id);
    }
    $scope.confirmEditAd = confirmEditAd;
    function confirmEditAd(id) {
        $location.path('/user/ads/edit/' + id);
    }

});
