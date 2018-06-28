(function () {
  'use strict';

  angular.module(document.app.name).controller('appController', appController);

  appController.$inject = ['$scope', '$location', '$filter'];

  function appController($scope, $location, $filter) {
    var vm = this;
    
    vm.selectedEquipment = null;
    vm.techn = null;
    
    vm.fn = {
      searchEquipment: searchEquipment,
      searchEquipmentById: searchEquipmentById,
      searchEquipmentByGeoloc: searchEquipmentByGeoloc,
      getAllEquipment: getAllEquipment
    };
    
    /***/

    (function () {
    })();

    /***/
    
    $scope.go = function (path) {
      $location.path(path);
    };
    
    function searchEquipmentById(id) {
      return $filter('filter')(equipments, function(eq) {
        return eq.id === id; 
      })[0];
    }
    
    function searchEquipmentByGeoloc(lat, lng, radius) {
      return $filter('filter')(equipments, function(eq) {        
        return geolib.isPointInCircle(
          {latitude: eq.location.lat, longitude: eq.location.lng},
          {latitude: lat, longitude: lng},
          radius
        );
      });
    }
    
    function searchEquipment(text) {
      var lText = text.toLowerCase();
      
      return $filter('filter')(equipments, function(eq) {        
        return eq.name.toLowerCase().indexOf(lText) !== -1 
          || eq.description.toLowerCase().indexOf(lText) !== -1
          || eq.id.toLowerCase().indexOf(lText) !== -1;
      });
    }

    function getAllEquipment() {      
      return equipments;
    }
  }
  
})();
