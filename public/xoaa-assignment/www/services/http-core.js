app.service('auth', ['$http', function($http) {
    var origin = window.location.origin;
    return {

        login: function(params) {
            return $http({
                method: 'POST',
                params: { email: params.email, password: params.password },
                url: origin + "/post/profile/auth"
            })
        },
        register: function(params) {
            return $http({
                method: 'POST',
                params: { profile: params },
                url: origin + "/post/profile/signup"
            })
        }

    }

}])