app.controller('Main', function ($scope, GetAds) {
    GetAds.getCategories(function (resp) {
        $scope.categories = resp;
    });
    GetAds.getAllAds(function (resp) {
        $scope.ads = resp.ads;
        console.log($scope.ads);
    });
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })

})