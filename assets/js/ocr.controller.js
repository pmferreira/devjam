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

    /***/

    (function () {
      //startQrCodeReader();

      // use MediaDevices API
      // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      if (navigator.mediaDevices) {
        // access the web cam
        navigator.mediaDevices.getUserMedia({ video: true })
          // permission granted:
          .then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.addEventListener('click', takeSnapshot);
          })
          // permission denied:
          .catch(function (error) {
            document.body.textContent = 'Could not access the camera. Error: ' + error.name;
          });
      }
    })();

    /***/


    var video = document.querySelector('video')
      , canvas;

    /**
     *  generates a still frame image from the stream in the <video>
     *  appends the image to the <body>
     */
    function takeSnapshot() {
      var img = document.querySelector('img') || document.createElement('img');
      var context;
      var width = video.offsetWidth
        , height = video.offsetHeight;

      canvas = canvas || document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);

      img.src = canvas.toDataURL('image/png');
      img.id = "img1";
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        //draw background image
        //context.drawImage(img, 0, 0);
        //draw a box over the top
        //context.fillStyle = "rgba(200, 0, 0, 0.5)";
        //context.fillRect(0, 0, 500, 500);
        var string = GOCR(context);
        alert(string);

      };
      document.body.appendChild(img);
    }


    function ocr() {
      var ctx = document.getElementById('canvas');
      if (ctx.getContext) {

        ctx = ctx.getContext('2d');

        //Loading of the home test image - img1
        var img1 = new Image();

        //drawing of the test image - img1
        img1.crossOrigin = "Anonymous";
        img1.onload = function () {
          //draw background image
          ctx.drawImage(img1, 0, 0);
          //draw a box over the top
          ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
          ctx.fillRect(0, 0, 500, 500);
          var string = GOCR(ctx);
          alert(string);

        };

        img1.src = 'img1.jpg';
      }
    }

  }

})();
