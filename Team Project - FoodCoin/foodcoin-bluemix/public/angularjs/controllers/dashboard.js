/**
 * Created by Mak on 12/5/16.
 */
index.controller("dashboard",['$scope','$http','$state' ,'$stateParams',function($scope,$http ,$state,$stateParams){


	console.log($stateParams);
	$scope.publishMessages = function(){
		$state.go("publishMessages");
	}
	
	$(function () {

	    var gaugeOptions = {

	        chart: {
	            type: 'solidgauge'
	        },

	        title: "Quantity of Food to be Prepared",

	        pane: {
	            center: ['50%', '85%'],
	            size: '140%',
	            startAngle: -90,
	            endAngle: 90,
	            background: {
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	                innerRadius: '60%',
	                outerRadius: '100%',
	                shape: 'arc'
	            }
	        },

	        tooltip: {
	            enabled: false
	        },

	        // the value axis
	        yAxis: {
	            stops: [
	                [0.1, '#55BF3B'], // green
	                [0.5, '#DDDF0D'], // yellow
	                [0.9, '#DF5353'] // red
	            ],
	            lineWidth: 0,
	            minorTickInterval: null,
	            tickAmount: 2,
	            title: {
	                y: -175
	            },
	            labels: {
	                y: 16
	            }
	        },

	        plotOptions: {
	            solidgauge: {
	                dataLabels: {
	                    y: 5,
	                    borderWidth: 0,
	                    useHTML: true
	                }
	            }
	        }
	    };

	    // The speed gauge
	    var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
	        yAxis: {
	            min: 0,
	            max: 200,
	            title: {
	                text: 'Quantity of Food Wasted'
	            }
	        },

	        credits: {
	            enabled: false
	        },

	        series: [{
	            name: 'Food Wasted',
	            data: [$stateParams.schedule.calcQuantity[0]],
	            dataLabels: {
	                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
	                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
	                       '<span style="font-size:12px;color:silver">Kgs</span></div>'
	            },
	            tooltip: {
	                valueSuffix: 'Kgs'
	            }
	        }]

	    }));

	});
	
	
	/////////////////////////////////////////////
	// Dashboard
	////////////////////////////////////////////
	$(function () {
			color:['#FF5733'],
	    Highcharts.chart('revenue', {
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Revenue Comparison'
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['Week 1'],
	            title: {
	                text: "Weeks"
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Revenue in USD',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valuePrefix: '$'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -40,
	            y: 80,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow: true
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Week 1',
	            data: [1500],
	            color: Highcharts.getOptions().colors[2]
	        }, {
	            name: 'Week 2',
	            data: [1600],
	            color: Highcharts.getOptions().colors[0]
	        }]
	    });
	});

	$(function () {

	    // Uncomment to style it like Apple Watch
	    
	    if (!Highcharts.theme) {
	        Highcharts.setOptions({
	            chart: {
	                backgroundColor: 'black'
	            },
	            colors: ['#F62366', '#9DFF02', '#0CCDD6'],
	            title: {
	                style: {
	                    color: 'silver'
	                }
	            },
	            tooltip: {
	                style: {
	                    color: 'silver'
	                }
	            }
	        });
	    }
	    // 

	    Highcharts.chart('feedback', {

	        chart: {
	            type: 'solidgauge',
	            marginTop: 50
	        },

	        title: {
	            text: 'Feedback',
	            style: {
	                fontSize: '24px'
	            }
	        },

	        tooltip: {
	            borderWidth: 0,
	            backgroundColor: 'none',
	            shadow: false,
	            style: {
	                fontSize: '16px'
	            },
	            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
	            positioner: function (labelWidth) {
	                return {
	                    x: 350 - labelWidth / 2,
	                    y: 180
	                };
	            }
	        },

	        pane: {
	            startAngle: 0,
	            endAngle: 360,
	            background: [{ // Track for Move
	                outerRadius: '112%',
	                innerRadius: '88%',
	                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
	                borderWidth: 0
	            }, { // Track for Exercise
	                outerRadius: '87%',
	                innerRadius: '63%',
	                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
	                borderWidth: 0
	            }]
	        },

	        yAxis: {
	            min: 0,
	            max: 100,
	            lineWidth: 0,
	            tickPositions: []
	        },

	        plotOptions: {
	            solidgauge: {
	                borderWidth: '34px',
	                dataLabels: {
	                    enabled: false
	                },
	                linecap: 'round',
	                stickyTracking: false
	            }
	        },

	        series: [{
	            name: 'Positive',
	            borderColor: Highcharts.getOptions().colors[2],
	            data: [{
	                color: Highcharts.getOptions().colors[2],
	                radius: '100%',
	                innerRadius: '100%',
	                y: Math.ceil($stateParams.sentiment.PositivePercent)
	            }]
	        }, {
	            name: 'Negative',
	            borderColor: Highcharts.getOptions().colors[0],
	            data: [{
	                color: Highcharts.getOptions().colors[0],
	                radius: '75%',
	                innerRadius: '75%',
	                y: Math.ceil($stateParams.sentiment.NegativePercent)
	            }]
	        }]
	    },

	    /**
	     * In the chart load callback, add icons on top of the circular shapes
	     */
	    function callback() {

	        // Move icon
	        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
	            .attr({
	                'stroke': '#303030',
	                'stroke-linecap': 'round',
	                'stroke-linejoin': 'round',
	                'stroke-width': 2,
	                'zIndex': 10
	            })
	            .translate(190, 26)
	            //.add(this.series[2].group);

	        // Exercise icon
	        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
	            .attr({
	                'stroke': '#303030',
	                'stroke-linecap': 'round',
	                'stroke-linejoin': 'round',
	                'stroke-width': 2,
	                'zIndex': 10
	            })
	            .translate(190, 61)
	            //.add(this.series[2].group);

	        // Stand icon
	        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
	            .attr({
	                'stroke': '#303030',
	                'stroke-linecap': 'round',
	                'stroke-linejoin': 'round',
	                'stroke-width': 2,
	                'zIndex': 10
	            })
	            .translate(190, 96)
	           // .add(this.series[2].group);
	    });


	});
	
	$(function () {

	    Highcharts.chart('noOfGuests', {

	        chart: {
	            type: 'gauge',
	            plotBackgroundColor: null,
	            plotBackgroundImage: null,
	            plotBorderWidth: 0,
	            plotShadow: false
	        },

	        title: {
	            text: 'Guest-o-meter'
	        },

	        pane: {
	            startAngle: -150,
	            endAngle: 150,
	            background: [{
	                backgroundColor: {
	                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                    stops: [
	                        [0, '#FFF'],
	                        [1, '#333']
	                    ]
	                },
	                borderWidth: 0,
	                outerRadius: '109%'
	            }, {
	                backgroundColor: {
	                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                    stops: [
	                        [0, '#333'],
	                        [1, '#FFF']
	                    ]
	                },
	                borderWidth: 1,
	                outerRadius: '107%'
	            }, {
	                // default background
	            }, {
	                backgroundColor: '#DDD',
	                borderWidth: 0,
	                outerRadius: '105%',
	                innerRadius: '103%'
	            }]
	        },

	        // the value axis
	        yAxis: {
	            min: 0,
	            max: 200,

	            minorTickInterval: 'auto',
	            minorTickWidth: 1,
	            minorTickLength: 10,
	            minorTickPosition: 'inside',
	            minorTickColor: '#666',

	            tickPixelInterval: 30,
	            tickWidth: 2,
	            tickPosition: 'inside',
	            tickLength: 10,
	            tickColor: '#666',
	            labels: {
	                step: 2,
	                rotation: 'auto'
	            },
	            title: {
	                text: 'No of Guests'
	            },
	            plotBands: [{
	                from: 0,
	                to: 120,
	                color: '#55BF3B' // green
	            }, {
	                from: 120,
	                to: 160,
	                color: '#DDDF0D' // yellow
	            }, {
	                from: 160,
	                to: 200,
	                color: '#DF5353' // red
	            }]
	        },

	        series: [{
	            name: 'Guests Count',
	            data: [$stateParams.schedule.schedule.totalPeople],
	            tooltip: {
	                valueSuffix: ' '
	            }
	        }]

	    });
	});
}]);