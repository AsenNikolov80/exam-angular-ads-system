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
    $scope.currentPage = 1;
    localStorage.currentPage = $scope.currentPage;
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;
    $scope.changeView = changeView;
    function changeView(view) {
        $location.path(view);
    }

    adminGetAds.getPublishedAds(1, function (resp) {
        if ($location.path() == '/admin/home') {
            $scope.allAds = resp.ads;
            $scope.pages = resp.numPages;
            $scope.currentPage = 1;
            localStorage.currentPage = $scope.currentPage;
            getPages();
            console.log($scope.allAds);
        }
    });
    adminGetAds.getWaitingApprovalAds(1, function (resp) {
        if ($location.path() == '/admin/waitingAds') {
            $scope.allAds = resp.ads;
            $scope.pages = resp.numPages;
            $scope.currentPage = 1;
            localStorage.currentPage = $scope.currentPage;
            getPages();
            console.log($scope.allAds);
        }
    })
    function getPages() {
        $scope.pageArray = [];
        for (var i = 1; i <= $scope.pages; i++) {
            $scope.pageArray.push(i);
        }
    }
    $scope.goToPage = function (page) {
        if ($location.path() == '/admin/home') {
            adminGetAds.getPublishedAds(page, function (resp) {
                $scope.allAds = resp.ads;
                $scope.pages = resp.numPages;
                $scope.currentPage = page;
                localStorage.currentPage = $scope.currentPage;
                getPages();
            })
        }
        else if($location.path() == '/admin/waitingAds'){
            adminGetAds.getWaitingApprovalAds(page, function (resp) {
                $scope.allAds = resp.ads;
                $scope.pages = resp.numPages;
                $scope.currentPage = page;
                localStorage.currentPage = $scope.currentPage;
                getPages();
            })
        }
    }
    $scope.approveAd = function (id) {
        adminGetAds.approveAd(id);
    }
    $scope.deactivateAd = function (id) {
        adminGetAds.deactivateAd(id);
    }

});