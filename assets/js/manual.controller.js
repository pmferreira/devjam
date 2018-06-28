(function () {
  'use strict';

  angular.module(document.app.name).controller('manualController', manualController);

  manualController.$inject = ['$scope'];

  function manualController($scope) {
    var vm = this;
    
    vm.equipment = null;
    vm.eqSearch = null;

    vm.manualRequest = false;
    vm.artyom = null;
    $scope.descriptionRequirements = '';

    /***/

    (function () {
      vm.equipment = $scope.$parent.app.selectedEquipment;
      startManualRequest();
      
      $scope.$watch(function() {
        return vm.eqSearch;
      }, function(vNew, vOld) {
        if(!!vNew) {
          console.log($scope.$parent.app.fn.searchEquipment(vNew));
          vm.allEquipments = $scope.$parent.app.fn.searchEquipment(vNew);
          $scope.$apply();
        } else {
          // clear results
        }
      })

      vm.allEquipments = $scope.$parent.app.fn.getAllEquipment();
    })();

    /***/

    function startManualRequest() {
      vm.manualRequest = true;

      vm.artyom = new Artyom();
      vm.artyom.addCommands([{
          description: "Artyom can talk too, lets say something if we say hello",
          indexes: ["hello", "hey"],
          action: function (i) {
            if (i == 0) {
              // vm.artyom.say("Hello! How are you?");
            }
          }
        },
        {
          indexes: ["goodbye"],
          action: function () {
            // vm.artyom.say("bye");
          }
        }
      ]);

      vm.artyom.redirectRecognizedTextOutput(function (text, isFinal) {


        // if (isFinal) {
        //   span.innerHTML = '';
        // } else {
        //   span.innerHTML = text;
        // }

        $scope.descriptionRequirements = text;
        $scope.$apply();
      });

    }

    $scope.startArtyom = function () {
      vm.artyom.initialize({
        lang: "en-US",
        continuous: true, // Listen forever
        soundex: true, // Use the soundex algorithm to increase accuracy
        debug: true,
        listen: true
      }).then(() => {
        console.log("Artyom has been succesfully initialized");
      }).catch((err) => {
        console.error("Artyom couldn't be initialized: ", err);
      });
    }

    $scope.stopArtyom = function () {
      vm.artyom.fatality();
    }

    $scope.selectCard = function (equipmentSelected) {
      vm.equipment = equipmentSelected;
      $scope.$parent.app.selectedEquipment = vm.equipment;
    }

    /***/    

    // $scope.$on('$destroy', function() {
    //   vm.artyom.fatality();
    // });  
    
  }



})();