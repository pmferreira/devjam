(function () {
  'use strict';

  angular.module(document.app.name).controller('qrcodeController', qrcodeController);

  qrcodeController.$inject = ['$scope'];

  function qrcodeController($scope) {
    var vm = this;
    
    vm.scannedCode = null;
    vm.equipment = null;
    vm.equipmentError = null;
    vm.scanner = null;
    
    /***/

    (function () {
      startQrCodeReader();
    })();

    /***/
    
    function startQrCodeReader() {      
      vm.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      vm.scanner.addListener('scan', function (content) {
        vm.scannedCode = content;
        vm.equipment = $scope.$parent.app.fn.searchEquipmentById(content);
        
        vm.equipmentError = null;
        if(!vm.equipment) {
          vm.equipmentError = "Equipment with id <b>" + content + "</b> not found";
        } else {
          $scope.$parent.app.selectedEquipment = vm.equipment;
          console.log($scope.$parent.app.selectedEquipment);
        }
        
        $scope.$apply();
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          vm.scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }
    
    /***/    
    
    $scope.$on('$destroy', function() {
      vm.scanner.stop();
    });    
  }
  
})();
