

index.controller('indexController', function($scope, $http, $state, $anchorScroll) {
	console.log("In landingPage Controller");
	$scope.error = true;
	$scope.error1 = true;
	$scope.error6 = true;
	
	/*$scope.closeVerifyModal = function(){
		$scope.code = "";
		$scope.error4 = false;
		//$scope.msg = "Welcome "+$scope.user.fullName + " ! Login to continue. Your Phone is not Verified.";
	};*/
	
	$scope.subscribeForDeals = function(){
		if($scope.mobileNo == undefined ){
			$scope.error1 = false;
			$scope.msg = "Mobile Number is required ";
		}
		else if(String($scope.mobileNo).length != 10 ){
			$scope.error1 = false;
			$scope.msg = "Mobile Number is Invalid ";
		}
		else{
			$http({
				method : "POST",
				url : 'http://foodcoin.mybluemix.net/subscribeUser',
				data : {
						"PhoneNumber":"+1"+$scope.mobileNo
				}
			}).success(function() {
				$scope.error6 = false;
				$scope.msg = "Congrats! You have subscribed successfully. Wait for super deals and enjoy !!!";
			}).error(function(error) {
				$scope.msg = error;
			});

		}
	}
	
	$scope.resendCode = function(){
		$scope.error3 = true;
		
		$http({
			method : "POST",
			url : '/users/resend',
			data : {
				"id" : $scope.userId,
				"code" : $scope.code
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 404) {
				$scope.error3 = false;
				$scope.msg = data.error;
				$scope.userId = data.id;
			}
			else{
				$scope.disableVerifyUser = true;
				console.log("Verification Successful.");
				$scope.user = data.user;
				$scope.error4 = false;
				$scope.msg = "Welcome "+ $scope.user.fName + " ! Login to continue.";
				$scope.error3 = true;
				$('#userVerificationModal3').modal('hide');
			}
		}).error(function(error) {
			$scope.msg = error;
		});
	};
	
	$scope.verifyUser = function(){
		$scope.error3 = true;
		if($scope.code == undefined ){
			$scope.error3 = false;
			$scope.msg = "Code is required ";
		}
		else{
			$http({
				method : "POST",
				url : '/users/verify',
				data : {
					"id" : $scope.userId,
					"code" : $scope.code
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 404) {
					$scope.error3 = false;
					$scope.msg = data.error;
					$scope.userId = data.id;
				}
				else{
					$scope.disableVerifyUser = true;
					console.log("Verification Successful.");
					$scope.user = data.user;
					$scope.error4 = false;
					$scope.msg = "Welcome "+$scope.user.fName + " ! Login to continue.";
					$scope.error3 = true;
					$('#userVerificationModal3').modal('hide');
				}
			}).error(function(error) {
				$scope.msg = error;
			});

		}
	}
	
	$scope.registerUser = function(){
		$scope.error = true;
		$scope.error1 = true;
		$scope.error4 = true;
		if($scope.email != $scope.emailCopy){
			$scope.error1 = false;
			$scope.msg = "You have entered different emails ";
			return;
		}
		else if($scope.password == undefined ){
			$scope.error1 = false;
			$scope.msg = "Password is required ";
		}
		else if($scope.fname == undefined ){
			$scope.error1 = false;
			$scope.msg = "First Name is required ";
		}
		else if($scope.lname == undefined ){
			$scope.error1 = false;
			$scope.msg = "Last Name is required ";
		}
		else if($scope.phone == undefined ){
			$scope.error1 = false;
			$scope.msg = "Mobile Number is required ";
		}
		else if(String($scope.phone).length != 10 ){
			$scope.error1 = false;
			$scope.msg = "Mobile Number is Invalid ";
		}
		else{
			$http({
				method : "POST",
				url : '/signup',
				data : {
					"email" : $scope.email,
					"password" : $scope.password,
					"fname" : $scope.fname,
					"lname" : $scope.lname,
					"phone" : $scope.phone
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 404) {
					$scope.error1 = false;
					$scope.msg = data.error;
				}
				else{
					$scope.error1 = true;
					console.log("Verification Code Sent.");
					$scope.userId = data.id;
					$('#userVerificationModal3').modal('show');
				}
			}).error(function(error) {
				$scope.msg = error;
			});

		}
	};
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// 			Sign IN
	//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.signin = function(){
	
		console.log("In Signin");
		if($scope.email == undefined || $scope.password == undefined){
			$scope.msg = "Email or Password is empty";
			$scope.error = false;
		}
		
		else{
			$http({
				method : "POST",
				url : '/signin',
				data : {
					"email" : $scope.email,
					"password" : $scope.password
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 404) {
					$scope.error = false;
					$scope.msg = data.statusMsg;
				}
				else{
					$scope.error = false;
					$scope.msg = "Waiting for Code Verification";
					$scope.userId2 = data.id;
					$('#userVerificationModal4').modal('show');
					
				}
			}).error(function(error) {
				$scope.error = false;
				$scope.msg = data.statusMsg;
			});
		}
	};
	
	
	$scope.verifyUserLogin = function(){
		$scope.error5 = true;
		if($scope.code2 == undefined ){
			$scope.error5 = false;
			$scope.msg = "Code is required ";
		}
		else{
			$http({
				method : "POST",
				url : '/users/verify',
				data : {
					"id" : $scope.userId2,
					"code" : $scope.code2
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 404) {
					$scope.error5 = false;
					$scope.msg = data.error;
					$scope.userId = data.id;
				}
				else{
					$scope.disableVerifyUser = true;
					console.log("Verification Successful.");
					$scope.user = data.user;
					$scope.error5 = false;
					$scope.msg = "Welcome "+$scope.user.fName + " ! You are Looged In.";
					$scope.error3 = false;
					$('#userVerificationModal4').modal('hide');
					$state.go("userHome");
				}
			}).error(function(error) {
				$scope.msg = error;
			});

		}
	};
	
	
	$scope.resendLoginCode = function(){
		$scope.error3 = true;
		
		$http({
			method : "POST",
			url : '/users/resend',
			data : {
				"id" : $scope.userId2,
				"code" : $scope.code2
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 404) {
				$scope.error3 = false;
				$scope.msg = data.error;
				$scope.userId = data.id;
			}
			else{
				$scope.disableVerifyUser = true;
				console.log("Verification Successful.");
				$scope.user = data.user;
				$scope.error5 = false;
				$scope.msg = "Welcome "+$scope.user.fName + " ! You are Looged In.";
				$scope.error3 = false;
				$('#userVerificationModal4').modal('hide');
			}
		}).error(function(error) {
			$scope.msg = error;
		});
	};
});