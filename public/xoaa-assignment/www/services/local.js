app.service('local', [function() {

    return {
        saveAccessToken: function(token) {
            window.localStorage.setItem("accessToken", token);
        },
        getAccessToken: function(token) {
            return window.localStorage.accessToken;
        },
        saveProfile: function(profile) {
            window.localStorage.setItem("profile", JSON.stringify(profile));
        },
        getProfile: function(token) {
            return JSON.parse(window.localStorage.profile);
        },

    }
}])