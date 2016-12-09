

index.controller('publishMessagesController', function($scope, $http, $state, $anchorScroll,NgMap) {
	$scope.successPublish = false;
	$scope.failurePublish = false;
	$scope.publishMessage = function(){
		$http({
			method: "POST",
			url: "http://foodcoin.mybluemix.net/publishMsssage",
			data : {
				"Message": $scope.message
			}
		}).success(function() {
			$scope.successPublish = true;
			$scope.failurePublish = false;
			$scope.msg = "Congrats! You have subscribed successfully. Wait for super deals and enjoy !!!";
	    
		}).error(function(error) {
			$scope.successPublish = false;
			$scope.failurePublish = true;
			$scope.msg = "There was some error. Please try again after some time.";
		});
	}
});