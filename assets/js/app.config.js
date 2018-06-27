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
      templateUrl: "assets/pages/orders/repair.html",
      controller: 'repairController',
      controllerAs: 'repairCtrl',
    }).when("/qr-code", {
      templateUrl: "assets/pages/qrcode.html",
      controller: 'qrcodeController',
      controllerAs: 'qrcodeCtrl',
    }).when("/manual", {
      templateUrl: "assets/pages/manual.html",
      controller: 'manualController',
      controllerAs: 'manualCtrl',
    });;
  });

})();
