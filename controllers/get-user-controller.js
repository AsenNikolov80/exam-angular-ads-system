'use strict';
app.controller('GetUserInfo', function ($scope, GetAds, getUserInfo, logoutQuery, $location) {
    if (!localStorage.username || !localStorage.token) {
        $location.path('#/');
    }
    var logoutLink = $('#logout');
//    console.log(logoutLink);
//    $('header ').empty();
    $('#logo').html('<h1>Ads - Edit User Profile</h1>');
    var userInfo = $('<div id="userInfo">').text(localStorage.getItem('username'));
    $('#userInfo').remove();
    $('header').append(userInfo);
//    var logoutLink = $('#logout');
    
    $('#logout').remove();
    logoutLink.appendTo($('header'));
    $scope.logout = function () {
        logoutQuery.logout();
        localStorage.clear();
//        $('#logout').remove();
//        $('#userInfo').remove();
//        $('#logout').remove();
//        $('#userInfo').remove();
        $location.path('#/');
    }
    getUserInfo.getUser(function (resp) {
        $scope.user = resp;
//        console.log(resp);
    })
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })
    $scope.cancel = function () {
        $location.path('/user/home');
        localStorage.link = 1;
    }
    $scope.update = function (user) {
        user.townId = Number(user.townId);
//        console.log(user);
        getUserInfo.updateUser(user);
    }
    $scope.updatePassword = function (pass) {
        pass.confirmPassword = Number(pass.confirmPassword);
        pass.newPassword = Number(pass.newPassword);
        pass.oldPassword = Number(pass.oldPassword);
        getUserInfo.changePass(pass);
    }

});