'use strict';
app.controller('Main', function ($scope, GetAds, $location) {
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