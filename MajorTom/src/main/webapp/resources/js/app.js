/**
 * 
 */
var app = angular.module("airline", ["ngRoute"]);

app.controller('mainCtrl', function($scope, dataService){
	$scope.selectedTicket = null;
	$scope.selectedFlight = null;
	$scope.currentUser = null;
	$scope.selectTicket = function(ticket) {
		$scope.selectedTicket=ticket;
	};
	$scope.selectFlight = function(flight) {
		$scope.selectedFlight=flight;
	};
	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
	};
	$scope.isAdmin = function() {
		if(!$scope.currentUser){return false;}
		return !!$scope.currentUser.authenticated;
	}
	$scope.findFlight = function(flightId) {
		$scope.flightInfo = "Loading...";
		console.log('About To Get '+flightId);
		console.log(flightId);
		dataService.findFlight(flightId, function(response){$scope.flightInfo = response.data.flightId;});
	};
	$scope.findTicketBySeat = function(seatId) {
		$scope.ticketInfo = "Loading...";
		console.log('Getting ticket, using seat id: ' + seatId);
		dataService.findTicketBySeat(seatId, function(response){$scope.ticketInfo = JSON.stringify(response);});
	};
	$scope.findSeatByFlight = function(flightId) {
		$scope.seatInfo = "Loading...";
		console.log('Getting seat, using flight id: ' + flightId);
		dataService.findSeatsByFlight(flightId, function(response){$scope.seatInfo = JSON.stringify(response);});
	};
});
	
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "pages/landing.html"
	});
	
	$routeProvider.when("/flight", {
		templateUrl : "pages/flightInfo.html"
	});
});

app.service('dataService', function($http){
	this.findFlight = function(flightId, callback) {
		$http.get('rest/findFlight/'+flightId, flightId).then(callback);
	}
	this.findFlightByTicket = function(ticketId, callback) {
		$http.get('rest/findFlightByTicket/'+ticketId,ticketId).then(callback);
	}
	this.findTicket = function(ticketId, callback){
		$http.get('rest/findTicket/'+ticketId, ticketId).then(callback);
	}
	this.findTicketBySeat = function(seatId, callback) {
		$http.get('rest/findTicketBySeat/'+seatId, seatId).then(callback);
	}
	this.findSeatsByFlight = function(flightId, callback) {
		$http.get('rest/findSeatsByFlight/'+flightId, flightId).then(callback);
	}
	this.authenticate = function(username, password, callback, failure) {
		var data = JSON.stringify({"username": username, "password": password});
		$http.post('rest/authenticate', data).then(callback, failure);
	}
});