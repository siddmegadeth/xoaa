app.controller('verifyCtrl', ['$scope', '$timeout', 'local', function($scope, $timeout, local) {


    $timeout(function() {

        $scope.initSwiper();
        $scope.validateToken();

    })

    $scope.validateToken = function() {

        if (local.getAccessToken() != undefined) {
            var profile = local.getProfile();
            ons.notification.toast('Welcome Back ' + profile.fullName, { timeout: 2000 });
            $scope.myNavigator.resetToPage('landing.html', { animation: 'lift-md' });

        } else {
            ons.notification.toast('Token InValid. Kindly login', { timeout: 2000 });
            $scope.myNavigator.resetToPage('login.html', { animation: 'lift-md' });
        }
    };



    $scope.initSwiper = function() {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }

}]);