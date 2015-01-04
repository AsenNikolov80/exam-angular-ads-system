app.controller('AdminHome', function ($scope, logoutQuery, adminGetAds, $location) {
    if (!localStorage.username || !localStorage.token || !localStorage.admin) {
        localStorage.clear();
        $location.path('/');
    }
    $('body').addClass('admin');
    $('#logo').html('<h1>Ads - Admin Home</h1>');
    var userInfo = $('<div id="userInfo">').text(localStorage.getItem('username'));
    $('#userInfo').remove();
    $('header').append(userInfo);
    var logoutLink = $('#logout');
    $('#logout').remove();
    logoutLink.appendTo($('header'));
    $scope.link = localStorage.link;
    $scope.link2 = localStorage.link2;

    $scope.logout = function () {
        logoutQuery.logout();
        localStorage.clear();
        $('#logout').remove();
        $('#userInfo').remove();
        $('#logout').remove();
        $('#userInfo').remove();
        $('body').removeClass('admin');
        $location.path('#/');
    };
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;
    $scope.changeView = changeView;
    function changeView(view) {
        $location.path(view);
    }

    adminGetAds.getAllAds(function (resp) {
        $scope.allAds = resp.ads;
        console.log($scope.allAds);
    });
    $scope.approveAd = function (id) {
        adminGetAds.approveAd(id);
    }
    $scope.deactivateAd = function (id) {
        adminGetAds.deactivateAd(id);
    }

});