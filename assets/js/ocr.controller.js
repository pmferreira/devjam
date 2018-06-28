(function () {
  'use strict';

  angular.module(document.app.name).controller('ocrController', ocrController);

  ocrController.$inject = ['$scope'];

  function ocrController($scope) {
    var vm = this;

    vm.scannedCode = null;
    vm.equipment = null;
    vm.equipmentError = null;
    vm.scanner = null;
    vm.restart = restart;

    /***/

    (function () {
      //startQrCodeReader();
      startVideoSettings();

    })();

    /***/
    vm.devices = [];
    function startVideoSettings() {

      // use MediaDevices API
      // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      if (navigator.mediaDevices) {

        navigator.mediaDevices.enumerateDevices()
          .then(function (deviceInfos) {           
            
            for (var i = 0; i !== deviceInfos.length; ++i) {
              var deviceInfo = deviceInfos[i];
             
              if (deviceInfo.kind === 'videoinput') {
                vm.devices.push(deviceInfos[i]);
                //document.body.append(deviceInfo.deviceId + "- VALUE:" + deviceInfo.label);
              }             
            }
            var camera = null;
            if (vm.devices.length >1) {
              camera = vm.devices[1]; 
            } else {
              camera = vm.devices[0];
            }
            navigator.mediaDevices.getUserMedia({
              video: {              
                deviceId: { exact:camera.deviceId }
              }
            }).then(function (stream) { 
                video.src = window.URL.createObjectURL(stream);
                video.addEventListener('click', takeSnapshot);
              })
            console.log(vm.devices);
          }
          ).then(
        // access the web cam
        //  navigator.mediaDevices.getUserMedia({ video: true })
                
                  )
          // permission denied:
          .catch(function (error) {
            document.body.textContent = 'Could not access the camera. Error: ' + error.name;
          });
      } else {
        alert('error');
      }
    }

    var video = document.querySelector('video')
      , canvas;

    function takeSnapshot() {
      var img = document.getElementById('myimg');//document.querySelector('img') || document.createElement('img');
      var context;
      var width = video.offsetWidth
        , height = video.offsetHeight;

      canvas = canvas || document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);
      video.style.display = "none";

      img.src = canvas.toDataURL('image/png');
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        //draw background image
        //context.drawImage(img, 0, 0);
        //draw a box over the top
        //context.fillStyle = "rgba(200, 0, 0, 0.5)";
        //context.fillRect(0, 0, 500, 500);
        var content = GOCR(context);
         
        vm.scannedCode = replaceAll(content, " ","");
        vm.scannedCode = vm.scannedCode.replace(/(\r\n\t|\n|\r\t)/gm,"");
        //alert("-'"+vm.scannedCode+"'-");
        var result = $scope.$parent.app.fn.searchEquipment(vm.scannedCode);

        vm.equipmentError = null;
        
        if (result.length==0) {
          vm.equipmentError = "Equipment with id " + vm.scannedCode + " not found";
        } else {
          vm.equipment = result[0];
          console.log(vm.equipment);
          $scope.$parent.app.selectedEquipment = vm.equipment;
        }

        $scope.$apply();

      };
      //document.body.appendChild(img);
    }

    function restart() {
      document.getElementById('myvideo').style.display = "";
      document.getElementById('myimg').style.display = "none";
      startVideoSettings();
      vm.equipment = false;
    }
    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
  }
  }
})();
