(function () {
  'use strict';

  angular.module(document.app.name).controller('appController', appController);

  appController.$inject = ['$scope', '$location'];

  function appController($scope, $location) {
    var vm = this;
    
    /***/

    (function () {
    
    })();

    /***/
    
    $scope.go = function (path) {
      $location.path(path);
    };
    
  }
  
})();
