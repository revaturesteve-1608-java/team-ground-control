/*
 * For the speech bubble that appears when you click on a seat
 */

var infoApp = angular.module("airline");

infoApp.controller("infoController", function($scope, $rootScope, dataService) {
	$scope.infoVisible = false;
	
	// This event is triggered when a seat is clicked
    $rootScope.$on('seatClick', function(event, data) {
        //console.log("Hello from info controller" + JSON.stringify(data));
        var str = data.seatType.seatTypeName + " (Seat #" + data.seatId + ")\r\n\r\nFlight " + data.flight.flightId + "\r\nTo " + data.flight.destination.destinationName + " (" + data.flight.destination.destinationCode + 
        	")\r\n\r\n" + data.flight.airline.name + "\r\n" + data.flight.airplane.airplaneName;
        $scope.infoVisible = true;
        $scope.infoContents = str;
    })
});