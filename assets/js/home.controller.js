(function () {
  'use strict';

  angular.module(document.app.name).controller('homeController', homeController);

  homeController.$inject = ['$scope'];

  function homeController($scope) {
    var vm = this;

    vm.homePage = false;
    vm.artyom = null;

    /***/

    (function () {
      starthomePage();
    })();

    /***/

    function starthomePage() {
      vm.homePage = true;

      vm.artyom = new Artyom();
      vm.artyom.addCommands([{
          indexes: ["repair"],
          action: function () {
            angular.element('#repair').triggerHandler('click');
          }
        }
      ]);

      startArtyom();
    }

    function startArtyom() {
      vm.artyom.initialize({
        lang: "en-GB",
        continuous: false,
        soundex: true, // Use the soundex algorithm to increase accuracy
        debug: true,
        listen: true
      }).then(() => {
        console.log("Artyom has been succesfully initialized");
      }).catch((err) => {
        console.error("Artyom couldn't be initialized: ", err);
      });
    }
  }



})();