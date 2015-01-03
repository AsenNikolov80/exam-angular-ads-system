app.controller('PublishAd', function ($scope, GetAds, logoutQuery, $routeParams, $location) {
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
    $scope.cancel = function () {
        $location.path('/user/home');
    }
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;

    GetAds.getTowns(function (resp) {
        $scope.towns = resp;
    })
    GetAds.getCategories(function (resp) {
        $scope.categories = resp;
    });
    $scope.createAdv = function (newAd) {
        console.log(newAd);
        if (!newAd || !newAd.title || !newAd.text) {
            var errorDiv = $('<div class="errorDivPublish">').text('Title and text are required!');
            errorDiv.appendTo('body');
            setTimeout(function () {
                $('.errorDivPublish').remove();
            }, 3000);
            return;
        }
        GetAds.createAd(newAd);
    }

    $scope.changeView = changeView;
    function changeView(view) {
        $location.path(view);
    }
    function linkClicked(index) {
        $scope.link = index;
        localStorage.link = index;
    }
    $scope.linkClicked = linkClicked;

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImg').attr('src', e.target.result);
                $scope.newAd.imageDataUrl = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            var filePath = $('#imgInp').val();
            $('#showPath').val(filePath);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });
});