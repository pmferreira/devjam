(function () {
  'use strict';

  angular.module(document.app.name).controller('manualController', manualController);

  manualController.$inject = ['$scope'];

  function manualController($scope) {
    var vm = this;

    vm.manualRequest = false;
    vm.artyom = null;

    /***/

    (function () {
      startManualRequest();
    })();

    /***/

    function startManualRequest() {
      vm.manualRequest = true;

      artyom = new Artyom();
      artyom.addCommands([{
          description: "Artyom can talk too, lets say something if we say hello",
          indexes: ["hello", "hey"],
          action: function (i) {
            if (i == 0) {
              artyom.say("Hello! How are you?");
            }
          }
        },
        {
          description: "Artyom can talk too, lets say something if we say hello",
          indexes: ["coco"],
          action: function (i) {
            if (i == 0) {
              artyom.say("coco! para ti?");
            }
          }
        },
        {
          description: "Artyom can talk too, lets say something if we say hello",
          indexes: ["next"],
          action: function (i) {
            if (i == 0) {
              artyom.say("you are beautiful");

              
              angular.element('#next').triggerHandler('click');
            }
          }
        },
        {
          description: "Artyom can talk too, lets say something if we say hello",
          indexes: ["previous"],
          action: function (i) {
            if (i == 0) {
              artyom.say("you are ugly");

              angular.element('#previous').triggerHandler('click');
            }
          }
        },
        {
          indexes: ["goodbye"],
          action: function () {
            artyom.say("i will miss you");
            alert("Now all is over.");
          }
        }
      ]);

      artyom.redirectRecognizedTextOutput(function (text, isFinal) {
        var span = document.getElementById('output');

        if (isFinal) {
          span.innerHTML = '';
        } else {
          span.innerHTML = text;
        }
      });

    }

    $scope.startArtyom = function() {
      artyom.initialize({
        lang: "en-GB",
        continuous: false,
        debug: true,
        listen: true
      });
    }

    $scope.stopArtyom = function() {
      artyom.fatality();
    }

    $scope.showText = function() {
      angular.element('#textToShow').show();
    }

    $scope.hideText = function() {
      angular.element('#textToShow').hide();
    }
  }



})();