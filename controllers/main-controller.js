'use strict';
app.controller('Main', function ($scope, GetAds, $location) {
//    $('header').empty();
    if (localStorage.username && localStorage.token) {
        $location.path('/user/home');
    }
    if ($location.path() == '/') {
        $('header').empty();
        $('<div id="logo">').html('<h1>Ads - Home</h1>').appendTo($('header'));
    }

    $scope.choise = {};
    GetAds.getCategories(function (resp) {
        $scope.categories = resp;
    });
    if ($location.path() != '/user/home') {
        GetAds.getAllAds(1, function (resp) {
            $scope.ads = resp.ads;
            $scope.pages = resp.numPages;
            getPages();
            localStorage.currentPage = 1;
            $scope.currentPage = localStorage.currentPage;
        });
    }
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


//    $scope.collection = ["idle", "active"];

    $scope.selectedIndex = -1; // Whatever the default selected index is, use -1 for no selection
    $scope.selectedIndexCategory = -1; // Whatever the default selected index is, use -1 for no selection

    $scope.itemClicked = function ($index) {
        $scope.selectedIndex = $index;
    };
    $scope.categoryClicked = function ($index) {
        $scope.selectedIndexCategory = $index;
    };

    $scope.changeView = function (view) {
        $location.path(view);
    };


});