//loading the 'login' angularJS module
var index = angular.module('index', ['ui.router','ngMap','ngFileUpload']);

index.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
	$urlMatcherFactoryProvider.caseInsensitive(true);
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	
	.state('sampleDisplay',{
		url : '/sampleDisplay',
		templateUrl : 'templates/sampleDisplay.html',
		controller : 'sampleDisplayController'
	})
	
	.state('foodcoinDetails',{
		url : '/foodcoinDetails',
		templateUrl : 'templates/foodcoinDetails.html',
		controller : 'detailsController'
	})
	
	.state('index', {	
		url : '/',
		templateUrl : 'templates/landingPage.html',
		controller : 'indexController'
	}).state('userHome', {
        url:'/userHome',
        templateUrl: 'templates/userHome.html',
        controller: 'userHome'

    })
        .state('businessHour', {
            url:'/businessHour',
            templateUrl: '/templates/businessHour.html',
            controller: 'businessHour',
            params:{"schedule":null}

        })
        .state('businessTime', {
            url:'/businessTime',
            templateUrl: '/templates/businessTime.html',
            controller: 'businessTime',
            params:{"schedule":null}

        })
        .state('predictCustomer', {
            url:'/predictCustomer',
            templateUrl: '/templates/predictCustomer.html',
            controller: 'predictCustomer',
            params:{"schedule":null}

        })
        .state('getData', {
            url:'/getData',
            templateUrl: '/templates/getData.html',
            controller: 'getData',
            params:{"schedule":null,"totalPeople":null}

        })
        
		.state('sentiment', {
            url:'/sentiment',
            templateUrl: '/templates/sentiment.html',

            controller: 'sentiment',
            params:{"schedule":null,"calcQuantity":null}


        }).state('dashboard', {
        url:'/dashboard',
        templateUrl: '/templates/dashboard.html',
        controller: 'dashboard',
        params:{"schedule":null,"sentiment":null}

    })
		
        .state('publishMessages', {
            url:'/publishMessages',
            templateUrl: '/templates/publishMessagesToCustomers.html',
            controller: 'publishMessagesController'
        });







});

index.directive('fileReader', function() {
    return {
        scope: {
            fileReader:"="
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function () {
                            scope.fileReader = contents;

                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});