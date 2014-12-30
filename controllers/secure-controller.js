'use strict';
app.controller('Secure', function ($scope, GetAds, $location) {
    var userInfo = $('<div id="userInfo">').text(localStorage.getItem('username'));
    $('#userInfo').remove();
    $('header').append(userInfo);
    var logoutLink = $('#logout');
    $('#logout').remove();
    logoutLink.appendTo($('header'));
    $scope.logout = function () {
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

    $scope.linkClicked = linkClicked;
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
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
});
