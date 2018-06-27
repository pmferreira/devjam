(function () {
  'use strict';

  angular.module(document.app.name).controller('qrcodeController', qrcodeController);

  qrcodeController.$inject = ['$scope'];

  function qrcodeController($scope) {
    var vm = this;
    
    vm.qrCodeOn = false;
    
    /***/

    (function () {
      startQrCodeReader();
    })();

    /***/
    
    function startQrCodeReader() {
      vm.qrCodeOn = true;
      
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(content);
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
