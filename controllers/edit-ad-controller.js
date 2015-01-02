app.controller('EditAd', function ($scope, GetAds, $routeParams, $location) {
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

    GetAds.getInfoForDeleteAd($scope.id, function (resp) {
        console.log(resp);
        $scope.ad = resp;
        $scope.test = resp;
    });

    $scope.cancel = function () {
        $location.path('/user/home');
    }
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;

    $scope.editAdv = function (editedAd) {
        console.log(editedAd);
        GetAds.editAd(editedAd.id, editedAd);
    }
    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })
    GetAds.getCategories(function (resp) {
        $scope.categories = resp;
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImg').attr('src', e.target.result);
                $scope.ad.imageDataUrl = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            var filePath = $('#imgInp').val();
            $('#showPath').val(filePath);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });
    $scope.deleteImage = function () {
        $('<div class="infoMsg">').text('Image was deleted! Please submit for change!').appendTo('body');
            setTimeout(function () {
                $('.infoMsg').remove();
            }, 5000);
        $scope.ad.imageDataUrl = '';
    }
})