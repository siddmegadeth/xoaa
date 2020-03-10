var DI = ['onsen'];
var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
var app = win.device(); // init App
win.enable(true);
win.info();

ons.platform.select('android');
app.config([ function() {

}])


app.run(['$rootScope', '$location', function($rootScope, $location) {

}]);