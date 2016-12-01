

index.controller('detailsController', function($scope, $http, $state, $anchorScroll) {

	console.log("In loginPage Controller");
	$scope.error = true;
	$scope.error1 = true;
	
	$scope.closeVerifyModal = function(){
		$scope.code = "";
		$scope.error4 = false;
		//$scope.msg = "Welcome "+$scope.user.fullName + " ! Login to continue. Your Phone is not Verified.";
	};
	
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
				$('#userVerificationModal').modal('hide');
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
					$('#userVerificationModal').modal('hide');
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
					$('#userVerificationModal').modal('show');
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
					$('#userVerificationModal2').modal('show');
					
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
					$('#userVerificationModal2').modal('hide');
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
				$('#userVerificationModal2').modal('hide');
			}
		}).error(function(error) {
			$scope.msg = error;
		});
	};
	
	
	/*$scope.generateGraphs = function(){
		
		$(function () {
		    Highcharts.chart('graph2', {
		    		colors: ['#2f7ed8','#910000'],
		        chart: {
		            type: 'column',
		            options3d: {
		                enabled: true,
		                alpha: 15,
		                beta: 15,
		                viewDistance: 25,
		                depth: 40
		            }
		        },

		        title: {
		            text: 'Food Consumed v/s Food Lost'
		        },

		        xAxis: {
		            categories: ['Grain Products', 'Seafood', 'Fruits & Vegetables', 'Meat', 'Milk']
		        },

		        yAxis: {
		            allowDecimals: false,
		            min: 0,
		            title: {
		                text: 'Percentage Food Loss'
		            }
		        },

		        tooltip: {
		            headerFormat: '<b>{point.key}</b><br>',
		            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		        },

		        plotOptions: {
		            column: {
		                stacking: 'percent',
		                depth: 40
		            }
		        },

		        series: [{
		            name: 'Food Loss',
		            data: [38,50,52,22,20]
		        }, {
		            name: 'Food Consumed',
		            data: [62, 50, 48, 78, 80]
		        }]
		    });
		});
		
		$(function () {
		    Highcharts.chart('graph1', {
		        chart: {
		            type: 'pie',
		            options3d: {
		                enabled: true,
		                alpha: 45
		            }
		        },
		        title: {
		            text: 'Food Loss'
		        },
		        subtitle: {
		            text: '(Click on Category for further classification)'
		        },
		        plotOptions: {
		            pie: {
		            		size: 200,
		                innerSize: 50,
		                depth: 45
		            }
		        },
		        series: [{
		            name: 'Loss Percentage',
		            colorByPoint: true,
		            data: [{
		                name: 'Grain Products',
		                y: 20.87,
		                drilldown: 'Grain Products'
		            }, {
		                name: 'Seafood',
		                y: 27.47,
		                drilldown: 'Seafood'
		            }, {
		                name: 'Fruits & Vegetables',
		                y: 28.57,
		                drilldown: 'Fruits & Vegetables'
		            }, {
		                name: 'Meat',
		                y: 12.08,
		                drilldown: 'Meat'
		            }, {
		                name: 'Milk',
		                y: 10.98,
		                drilldown: 'Milk'
		            }]
		        }],
		        drilldown: {
		        		plotOptions: {
		            pie: {
		            		size: 200,
		                innerSize: 50,
		                depth: 45
		            	}
		        		},
		            series: [{
		                name: 'Grain Products',
		                id: 'Grain Products',
		                data: [
		                    ['Production Losses', 4.65],
		                    ['PostHarvest,Handlind and Storage Losses', 4.65],
		                    ['Processing and Packaging Losses', 23.25],
		                    ['Distribution and Retail Losses', 4.65],
		                    ['Consumer Losses', 62.79]
		                ]
		            }, {
		                name: 'Seafood',
		                id: 'Seafood',
		                data: [
		                    ['Production Losses', 18.64],
		                    ['PostHarvest,Handlind and Storage Losses', 0.84],
		                    ['Processing and Packaging Losses', 8.47],
		                    ['Distribution and Retail Losses', 16.10],
		                    ['Consumer Losses', 55.93]
		                ]
		            }, {
		                name: 'Fruits & Vegetables',
		                id: 'Fruits & Vegetables',
		                data: [
		                    ['Production Losses', 31.25],
		                    ['PostHarvest,Handlind and Storage Losses', 4.68],
		                    ['Processing and Packaging Losses', 1.56],
		                    ['Distribution and Retail Losses', 18.75],
		                    ['Consumer Losses', 43.75]
		                ]
		            }, {
		                name: 'Meat',
		                id: 'Meat',
		                data: [
		                    ['Production Losses', 12],
		                    ['PostHarvest,Handlind and Storage Losses', 8],
		                    ['Processing and Packaging Losses', 16],
		                    ['Distribution and Retail Losses', 16],
		                    ['Consumer Losses', 48]
		                ]
		            }, {
		                name: 'Milk',
		                id: 'Milk',
		                data: [
		                   ['Production Losses', 4],
		                    ['PostHarvest,Handlind and Storage Losses', 33.33],
		                    ['Processing and Packaging Losses', 6.66],
		                    ['Distribution and Retail Losses', 33.33],
		                    ['Consumer Losses', 22.66]
		                ]
		            }]
		        }
		    });
		});
	}
	$scope.generateGraphs();*/
});