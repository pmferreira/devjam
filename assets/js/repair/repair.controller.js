(function () {
  'use strict';

  angular.module(document.app.name).controller('repairController', repairController);

  repairController.$inject = ['$scope'];

  function repairController($scope) {
    var vm = this;
    
    vm.fn = {
      getLocation: getLocation
    };
    
    vm.coord = null;
    
    /***/

    (function () {
      getLocation();
    })();

    /***/
    
    function getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
//          console.log(geolib.isPointInCircle(
//            {latitude: 38.714, longitude: -8.954},
//            {latitude: position.coords.latitude, longitude: position.coords.longitude},
//            5000
//        ));
          
          vm.coord = position.coords;
          $scope.$apply();
          console.log(vm.coord);
        });
      } else {
        return false;
      }
    }
    
    
  }
  
})();
