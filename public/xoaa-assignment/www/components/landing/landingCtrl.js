app.controller('landingCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    var retryCount = 0;


    $scope.initSwiper = function() {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }

    $scope.loadGanache = function() {


    };

    $timeout(function() {

        $scope.initSwiper();
    });

}]);