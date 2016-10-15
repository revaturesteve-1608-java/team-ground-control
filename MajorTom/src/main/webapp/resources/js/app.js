/**
 * 
 */
var app = angular.module("airline", ["ngRoute"]);

app.controller('mainCtrl', function($scope, $rootScope, dataService){
	this.recieptIsLogin = false;
	
	$scope.selectedTicket = null;
	$scope.selectedFlight = 1402;
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
		if($rootScope.authenticated){
			return false
		;}
		return !!$rootScope.authenticated;
	};
	$scope.testAdminStatus = function() {  /* REMOVE THIS METHOD WHEN DEBUGGING IS FINISHED. */
		$scope.admintest=$scope.isAdmin();
	};
	$scope.findFlight = function(flightId) {
		$scope.flightInfo = "Loading...";
		dataService.findFlight(flightId, function(response){$scope.flightInfo = response.data.flightId;});
	};
	$scope.findTicketBySeat = function(seatId) {
		$scope.ticketInfo = "Loading...";
		dataService.findTicketBySeat(seatId, function(response){$scope.ticketInfo = JSON.stringify(response);});
	};
	$scope.findSeatByFlight = function(flightId) {
		$scope.seatInfo = "Loading...";
		dataService.findSeatsByFlight(flightId, function(response){$scope.seatInfo = JSON.stringify(response);});
	};
	$rootScope.$on('seatClick', function(event, data) {
		$scope.selectedSeat=data;
	});
	$scope.setSeat = function(ticketId, seatId) {
		$scope.newSeatInfo = "Loading...";
		dataService.setSeat(ticketId, seatId, function(response){$scope.newSeatInfo = JSON.stringify(response);});
	};
	$scope.reassignSeat = function(ticketId, seatId, seat2Id) {
		$scope.newSeatInfo2 = "Loading...";
		dataService.reassignSeat(ticketId, seatId.seatId, seat2Id.seatId, function(response){$scope.newSeatInfo2 =  "Seat #"+JSON.stringify(seatId.seatId)+" has been reassigned to ticket #"+JSON.stringify(response.data.ticketId);});
		setTimeout($('#seat'+seat2Id.seatId).addClass('seat-taken'), 2500);
		setTimeout($('#seat'+seatId.seatId).removeClass('seat-taken'), 2500);
		$scope.$root.firstSelect = null;
		$scope.$root.secondSelect = null;
	};
	$scope.findFlightByTicket = function(ticketId) {
		$scope.flightByTicket = "Loading...";
		dataService.findFlightByTicket(ticketId, function(response){$scope.flightByTicket = JSON.stringify(response);});
	};
	
	dataService.findAllFlights(function(response) {
		// Only do it for the first item (that's where the flights are)
		// To get the first item, just use a for-each and take the first item
		$scope.flightList = response.data;
	})
	
	this.viewResize = function() {
		var content = $(".plane");
		var height = $(window).height();
		var width = $(window).width();
		var scale;
		scale = Math.min(width / 1920, height / 971);
		content.css({
			transform : "scale(" + scale + ")" 
		});
	}
	var me = this;
	window.onresize = function() {
		me.viewResize();
	};
	
	/* MUST BE IN app.js TO ACCESS ROUTE CHANGE EVENT PROPERLY
	 * A bit of a hack to get the view to resize automatically on page load.
	 * After the view is received from the server, it waits a short time for it to change
	 * then resizes the view. it repeats at scaling intervals to account for slow hardware
	 */
	$rootScope.$on("$routeChangeSuccess", function() {
		setTimeout(function(){
			me.viewResize();
		}, 5);
		setTimeout(function(){
			me.viewResize();
		}, 20);
		setTimeout(function(){
			me.viewResize();
		}, 100);
		setTimeout(function(){
			me.viewResize();
		}, 500);
		setTimeout(function(){
			me.viewResize();
		}, 2500);
	});
});
	
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "pages/b737-800-plane.html"
	});
	
	$routeProvider.when("/flight", {
		templateUrl : "pages/flightInfo.html"
	});
});

app.service('dataService', function($http, $rootScope){
	this.findFlight = function(flightId, callback) {
		$http.get('rest/findFlight/'+flightId, flightId).then(callback);
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
	this.findAllFlights = function(callback) {
		$http.get('rest/findAllFlights').then(callback);
	}
	this.authenticate = function(username, password, callback, failure) {
		var data = JSON.stringify({"username": username, "password": password});
		$http.post('rest/authenticate', data).then(callback, failure);
	}
	this.setSeat = function(ticketId, seatId, callback, failure) {
		// Set the seat for the ticket
		var data = JSON.stringify({"ticketId": ticketId, "seatId": seatId});
		$http.post('rest/setSeat', data).then(callback, failure);
	}
	this.reassignSeat = function(ticketId, seatId, seat2Id, callback, failure) {
		// Reassign the seat for the ticket
		var data = JSON.stringify({"ticketId": ticketId, "seatId": seatId, "seat2Id": seat2Id, "loginToken": $rootScope.loginToken});
		$http.post('rest/reassignSeat/', data).then(callback, failure);
	}
	
});
