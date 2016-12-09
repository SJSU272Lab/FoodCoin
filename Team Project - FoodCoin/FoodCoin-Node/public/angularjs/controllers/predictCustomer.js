/**
 * Created by Mak on 11/30/16.
 */

index.controller("predictCustomer",['$scope','$http','$state' ,'$stateParams',function($scope,$http ,$state,$stateParams){


    console.log("Hello from Predict Customer");


    console.log($stateParams);

    var data = $stateParams.schedule;
    var days = data.schedule.days;
    var  totalPeople = 0 ;
    $scope.timings =data.time.from +" "+data.time.fromM+ " to "+data.time.till +" "+data.time.tillM;
    console.log("Days", days);
    console.log(data.schedule.schedule[0].totalMonday);

    for(day in days)
    {
        console.log(day);

        if(days[day]=="Monday")
        {
            $scope.monday= true;
            $scope.totalMonday =Math.round(data.schedule.schedule[0].totalMonday);
            totalPeople+=$scope.totalMonday;
        }
        if(days[day]=="Sunday")
        {
            $scope.sunday= true;
            $scope.totalSunday =Math.round(data.schedule.schedule[0].totalSunday);
            totalPeople+=$scope.totalSunday;
        }
        if(days[day]=="Tuesday")
        {
            $scope.tuesday= true;
            $scope.totalTuesday =Math.round(data.schedule.schedule[0].totalTuesday);
            totalPeople+=$scope.totalTuesday;
        }
        if(days[day]=="Wednesday")
        {
            $scope.wednesday= true;
            $scope.totalWednesday =Math.round(data.schedule.schedule[0].totalWednesday);
            totalPeople+=$scope.totalWednesday;
        }
        if(days[day]=="Thursday")
        {
            $scope.thursday= true;
            $scope.totalThursday =Math.round(data.schedule.schedule[0].totalThursday);
            totalPeople+=$scope.totalThursday;
        }
        if(days[day]=="Saturday")
        {
            $scope.saturday= true;
            $scope.totalSaturday =Math.round(data.schedule.schedule[0].totalSaturday);
            totalPeople+=$scope.totalSaturday;
        }
        if(days[day]=="Friday")
        {
            $scope.friday= true;
            $scope.totalFriday =Math.round(data.schedule.schedule[0].totalFriday);
            totalPeople+=$scope.totalFriday;
        }


    }

    $scope.next = function()
    {

        $stateParams.time= $scope.time;
        console.log("days",$stateParams);
        $state.go("getData",{"schedule":$stateParams,"totalPeople":totalPeople});
    }





}]);