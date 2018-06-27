(function () {
  'use strict';

  angular.module(document.app.name).controller('manualController', manualController);

  manualController.$inject = ['$scope'];

  function manualController($scope) {
    var vm = this;

    vm.manualRequest = false;
    vm.artyom = null;
    vm.description = '';

    /***/

    (function () {
      startManualRequest();
    })();

    /***/

    function startManualRequest() {
      vm.manualRequest = true;

      vm.artyom = new Artyom();
      // vm.artyom.addCommands([{
      //     description: "Artyom can talk too, lets say something if we say hello",
      //     indexes: ["hello", "hey"],
      //     action: function (i) {
      //       if (i == 0) {
      //         vm.artyom.say("Hello! How are you?");
      //       }
      //     }
      //   },
      //   {
      //     indexes: ["goodbye"],
      //     action: function () {
      //       vm.artyom.say("bye");
      //     }
      //   }
      // ]);

      vm.artyom.redirectRecognizedTextOutput(function (text, isFinal) {
        

        // if (isFinal) {
        //   span.innerHTML = '';
        // } else {
        //   span.innerHTML = text;
        // }

        vm.description = text;
      });

    }

    $scope.startArtyom = function() {
      vm.artyom.initialize({
        lang: "en-GB",
        continuous: false,
        debug: true,
        listen: true
      });
    }

    $scope.stopArtyom = function() {
      vm.artyom.fatality();
    }
  }



})();