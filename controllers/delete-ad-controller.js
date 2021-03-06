app.controller('DeleteAd', function ($scope, GetAds, $routeParams, logoutQuery, $location) {
    if (!localStorage.username || !localStorage.token) {
        $location.path('#/');
    }
    $scope.id = $routeParams.id;
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
    GetAds.getInfoForDeleteAd($scope.id, function (resp) {
        console.log(resp);
        $scope.ad = resp;
    });
    $scope.deleteAdv = function () {
        GetAds.deleteAd($scope.id);
    }
    $scope.cancel = function () {
        $location.path('/user/home');
    }
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;
})