'use strict';
app.controller('getAdsByUser', function ($scope, GetAds, $location) {
    GetAds.getAdsOfUser(function (resp) {
        var ads = resp.ads;
        $scope.adsByUser = ads;
    });
});