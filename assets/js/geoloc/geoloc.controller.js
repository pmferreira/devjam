(function () {
  'use strict';

  angular.module(document.app.name).controller('geolocController', geolocController);

  geolocController.$inject = ['$scope'];

  function geolocController($scope) {
    var vm = this;
    
    vm.fn = {
      getLocation: getLocation
    };
    
    vm.coord = null;
    vm.coordError = null;
    vm.coordRadius = 50000;
    
    /***/

    (function () {
      getLocation();
    })();

    /***/
    
    function getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(geolib.isPointInCircle(
            {latitude: 38.7, longitude: -8.9},
            {latitude: position.coords.latitude, longitude: position.coords.longitude},
            vm.coordRadius
          ));
          
          vm.coord = position.coords;
          $scope.$apply();
        });
      } else {
        vm.coordError = "Your device doesn't support geolocation.";
      }
    }
  }
  
})();
