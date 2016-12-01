//loading the 'login' angularJS module
var index = angular.module('index', ['ui.router']);

index.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
	$urlMatcherFactoryProvider.caseInsensitive(true);
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	
	.state('foodcoinDetails',{
		url : '/foodcoinDetails',
		templateUrl : 'templates/foodcoinDetails.html',
		controller : 'detailsController'
	})
	
	.state('index', {	
		url : '/',
		templateUrl : 'templates/landingPage.html',
		controller : 'indexController'
	});
});