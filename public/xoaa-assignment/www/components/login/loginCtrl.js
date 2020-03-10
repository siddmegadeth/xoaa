app.controller('loginCtrl', ['$scope', '$timeout', 'auth','local', function($scope, $timeout, auth,local) {


    $scope.signUp = function() {

        $scope.myNavigator.pushPage('sign-up.html', { animation: "slide-md" })
    }

    $scope.performLogin = function(login) {

        if ("email" in login && "password" in login) {
            log(login);
            auth.login(login).then(function(resp) {

                log(resp);
                if (resp.data.isAuth) {
                    ons.notification.toast('Account Verified. ' + resp.data.message, { timeout: 3000 });
                    local.saveAccessToken(resp.data.token);
                    local.saveProfile(resp.data.profile);

                    $scope.myNavigator.resetToPage('landing.html', {
                        animation: 'lift-md'
                    })
                } else {
                    ons.notification.toast('Create Your Profile.Account Does Not Exist', { timeout: 3000 });

                }
            });
        }

    }


    $scope.performRegistration = function(register) {

        if (register) {
            log(register);
            auth.register(register).then(function(resp) {

                log(resp);
                if (resp.data.isProfileExist) {
                    ons.notification.toast('Account Already Exist', { timeout: 3000 });

                } else {
                    ons.notification.toast('New Account Created . Kindly login', { timeout: 3000 });
                    $scope.myNavigator.resetToPage('login.html', {
                        animation: 'lift-md'
                    })

                }
            });
        }

    }


}])