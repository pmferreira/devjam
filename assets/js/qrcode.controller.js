(function () {
  'use strict';

  angular.module(document.app.name).controller('qrcodeController', qrcodeController);

  qrcodeController.$inject = ['$scope'];

  function qrcodeController($scope) {
    var vm = this;
    
    vm.scannedCode = null;
    vm.equipment = null;
    
    /***/

    (function () {
      startQrCodeReader();
    })();

    /***/
    
    function startQrCodeReader() {      
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        vm.scannedCode = content;
        vm.equipment = $scope.$parent.app.fn.searchEquipment(content);
        
        console.log([content,vm.equipment])
        
        if(!vm.equipment) {
          console.log("Equipment " + content + " not found");
        }
        
        $scope.$apply();
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }
    
    
  }
  
})();
