

index.controller('detailsController', function($scope, $http, $state, $anchorScroll) {
	
	$scope.generateGraphs = function(){
		
		$(function () {
			var chart = new Highcharts.Chart({
		    	colors: ['#2f7ed8','#910000'],
		        chart: {
		            renderTo:'graph',
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
			
            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }

            showValues();
		});
	};
	
$scope.generateGraphs2 = function(){
		
		$(function () {
		    var chart = new Highcharts.Chart({
		        chart: {
					renderTo:'graph2',
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
			
			function showValues() {
	            $('#alpha-value').html(chart.options.chart.options3d.alpha);
	            $('#beta-value').html(chart.options.chart.options3d.beta);
	            $('#depth-value').html(chart.options.chart.options3d.depth);
	        }
	
	        showValues();
		});
	};
	
	$scope.generateGraphs();
	$scope.generateGraphs2();
});