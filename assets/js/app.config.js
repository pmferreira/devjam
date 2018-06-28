(function() {
  'use strict';

  document.app = {
    name: 'devjam',
    module: undefined
  };

  document.app.module = angular.module(document.app.name, ['ngRoute', 'ngMaterial', 'ngMessages']);

  document.app.module.config(function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "assets/pages/home.html",
      controller: 'homeController',
      controllerAs: 'homeCtrl'
        
    }).when("/start-repair", {
      templateUrl: "assets/pages/repair.html",
      
    }).when("/qr-code", {
      templateUrl: "assets/pages/qrcode.html",
      controller: 'qrcodeController',
      controllerAs: 'qrcodeCtrl',
      
    }).when("/manual", {
      templateUrl: "assets/pages/manual.html",
      controller: 'manualController',
      controllerAs: 'manualCtrl',
      
    }).when("/geoloc", {
      templateUrl: "assets/pages/geoloc.html",
      controller: 'geolocController',
      controllerAs: 'geolocCtrl',
    
    }).when("/technician", {
      templateUrl: "assets/pages/technician.html",
      controller: 'technicianController',
      controllerAs: 'technicianCtrl',
    });
  });

})();
