(function () {
  'use strict';

  angular.module(document.app.name).controller('geolocController', geolocController);

  geolocController.$inject = ['$scope'];

  function geolocController($scope) {
    var vm = this;
    
    vm.fn = {
      getLocation: getLocation
    };
    
    vm.equipment = null;
    
    vm.map = null;
    vm.circle = null;
    
    vm.coord = null;
    vm.coordError = null;
    vm.coordRadius = 2; // 2km
    
    vm.markers = [];
    
    vm.iconPink = L.icon({
          iconUrl: 'assets/images/marker-red.png',
          iconSize: [32, 32],
          iconAnchor: [0, 32]
        });
    
    vm.iconGreen = L.icon({
          iconUrl: 'assets/images/marker-green.png',
          iconSize: [32, 32],
          iconAnchor: [0, 32],
          popupAnchor: [16, -32]
        });
    
    /***/

    (function () {
      getLocation();
      
      $scope.$watch(function() {
        return vm.coordRadius;
      }, function() {
        if(!!vm.circle) {
          vm.circle.setRadius(vm.coordRadius * 1000);
          
          for (var i = 0; i < vm.markers.length; i++) {
            vm.map.removeLayer(vm.markers[i]);
          }
          vm.markers = [];
          
          
          var eqs = $scope.$parent.app.fn.searchEquipmentByGeoloc(vm.coord.latitude, vm.coord.longitude, vm.coordRadius * 1000);
          for (var i = 0; i < eqs.length; i++) {
            var content = L.DomUtil.create('div'), popup, eq = eqs[i];
            
            content.innerHTML = '<img style="vertical-align:top;width:70px;display:inline-block;" src="' + eqs[i].picture + '" /><div style="display:inline-block;vertical-align:top;"><b>' + eqs[i].name + '</b><br/>' + eqs[i].description + '<br/><em>Click to select</em></div>'; 
            popup = L.popup().setContent(content);

            L.DomEvent.addListener(content, 'click', function(event){
              vm.equipment = eq;
              $scope.$parent.app.selectedEquipment = eq;
              $scope.$apply();
            });
            
            
            vm.markers.push(
              L.marker([eqs[i].location.lat, eqs[i].location.lng], {
              'icon': eqs[i].under_repair ? vm.iconPink : vm.iconGreen
              }).addTo(vm.map).bindPopup(popup)
            );
          }
        }
      })
    })();

    /***/
    
    function getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          vm.coord = position.coords;
          $scope.$apply();
          
          vm.map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 12);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(vm.map);
          
          L.marker([position.coords.latitude, position.coords.longitude]).addTo(vm.map);
          
          vm.circle = L.circle([position.coords.latitude, position.coords.longitude], {
            color: '#4B5F83',
            fillColor: '#4B5F83',
            fillOpacity: 0.2,
            radius: vm.coordRadius * 1000
          }).addTo(vm.map);
        });
      } else {
        vm.coordError = "Your device doesn't support geolocation.";
      }
    }
  }
  
})();
