(function () {
  'use strict';

  angular.module(document.app.name).controller('appController', appController);

  appController.$inject = ['$scope', '$location', '$filter'];

  function appController($scope, $location, $filter) {
    var vm = this;
    
    vm.selectedEquipment = null;
    
    vm.fn = {
      searchEquipment : searchEquipment
    };
    
    /***/

    (function () {
    })();

    /***/
    
    $scope.go = function (path) {
      $location.path(path);
    };
    
    function searchEquipment(id) {
      return $filter('filter')(equipments, function(eq) {
        return eq.id === id; 
      })[0];
    }
  }
  
})();
