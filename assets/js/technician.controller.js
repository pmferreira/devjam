(function () {
  'use strict';

  angular.module(document.app.name).controller('technicianController', technicianController);

  technicianController.$inject = ['$scope'];

  function technicianController($scope) {
    var vm = this;
    
    vm.equipment = null;
    vm.techMatches = null;
        
    /***/

    (function () {
      if(!$scope.$parent.app.selectedEquipment) {
        $scope.$parent.go("/");
      }
      
      vm.equipment = $scope.$parent.app.selectedEquipment;
      vm.techMatches = getBestMatch([vm.equipment.location.lat,vm.equipment.location.lng].join(','), new Date ().toTimeString().split(" ")[0]);
      
      console.log(vm.techMatches);
    })();

    /***/
   
    function getDistanceBetweenGpsPoints (point1, point2) {
        var point1Data = point1.split (",");
        var lat1 = parseFloat (point1Data[0]);
        var lon1 = parseFloat (point1Data[1]);
        var point2Data = point2.split (",");
        var lat2 = parseFloat (point2Data[0]);
        var lon2 = parseFloat (point2Data[1]);

        var R = 6371e3; // metres
        var p1 = lat1.toRadians();
        var p2 = lat2.toRadians();
        var l1 = (lat2-lat1).toRadians();
        var l2 = (lon2-lon1).toRadians();

        var a = Math.sin(l1/2) * Math.sin(l1/2) +
                Math.cos(p1) * Math.cos(p2) *
                Math.sin(l2/2) * Math.sin(l2/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;                
    }

    function getBestMatch (point, time, maximumRangeMts) {
        var maximumRangeMts = maximumRangeMts || 50000;
        var otherAvailableInRangeMatches = [];

        var currentDistance = 0;
        var nearestDistance = 0;
        var nearestAvailableDistance = 0;
        var nearestTime = 0;
        var nearestAndAvailable;
        var nearest;
        var nearests = [];
        technicians.forEach (function (value) {
            currentDistance = getDistanceBetweenGpsPoints (point, value.pos);
            if (currentDistance < nearestDistance || nearestDistance === 0) {
                nearest = value;
            }
            if (time <= value.nextAvail && currentDistance < maximumRangeMts) {
                if (!nearestAndAvailable) {
                    nearestAndAvailable = value;
                    nearests.push (value);
                    nearestAvailableDistance = getDistanceBetweenGpsPoints (point, value.pos);
                    nearestTime = value.nextAvail;
                } else {
                    if (currentDistance < nearestAvailableDistance) {
                        nearestAvailableDistance = currentDistance;
                        nearestAndAvailable = value;
                        nearests.push (value);
                        nearestTime = value.nextAvail;
                    }
                    otherAvailableInRangeMatches.push (value);
                }
            }
        });
        return {"bestMatch": nearestAndAvailable, "nearestsAndAvailabe": nearests, "nearest": nearest, "otherAvailableInRangeMatches": otherAvailableInRangeMatches};
    };
  }
  
})();
