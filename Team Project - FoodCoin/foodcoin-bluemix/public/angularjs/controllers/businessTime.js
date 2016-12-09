/**
 * Created by Mak on 11/30/16.
 */

index.controller("businessTime",['$scope','$http','$state' ,'$stateParams',function($scope,$http ,$state,$stateParams){


    console.log(" Hello from business Time");

    console.log("$state", $stateParams);



    // var day=[];
    // $scope.buttons = day;
    // $scope.day = function (val){
    //
    //     var index = day.indexOf(val);
    //
    //     if (index === -1) {
    //
    //         console.log(val);
    //
    //
    //         console.log("$scope",$scope.Monday);
    //
    //         $scope.val ="button-selected";
    //         day.push(val);
    //         checkDayClass(val);
    //     } else {
    //
    //         day.splice(index, 1);
    //         checkDayClass(val);
    //         $scope.selected ="";
    //     }
    //
    //     console.log(day);
    //
    // }


    // function checkDayClass(val)
    // {
    //     var index1 = day.indexOf(val);
    //
    //     console.log("v",val,index1);
    //     if(val=="Monday")
    //     {
    //         if(index1==-1)
    //         {
    //             console.log("Monday Selected");
    //             $scope.Monday="";
    //         }
    //         else
    //         {
    //
    //             $scope.Monday="button-selected";
    //         }
    //     }
    //     if(val=="Tuesday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Tuesday="";
    //         }
    //         else
    //         {
    //             $scope.Tuesday="button-selected";
    //         }
    //     }
    //
    //     if(val=="Wednesday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Wednesday="";
    //         }
    //         else
    //         {
    //             $scope.Wednesday="button-selected";
    //         }
    //     }
    //
    //     if(val=="Thursday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Thursday="";
    //         }
    //         else
    //         {
    //
    //             $scope.Thursday="button-selected";
    //         }
    //     }
    //
    //     if(val=="Friday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Friday="";
    //         }
    //         else
    //         {
    //
    //             $scope.Friday="button-selected";
    //         }
    //     }
    //
    //     if(val=="Saturday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Saturday="";
    //         }
    //         else
    //         {
    //
    //             $scope.Saturday="button-selected";
    //         }
    //     }
    //
    //     if(val=="Sunday")
    //     {
    //         if(index1==-1)
    //         {
    //             $scope.Sunday="";
    //         }
    //         else
    //         {
    //
    //             $scope.Sunday="button-selected";
    //         }
    //     }
    //
    // }
    //

    $scope.next = function()
    {

        $stateParams.time= $scope.time;
        console.log("days",$stateParams);
        $state.go("predictCustomer",{"schedule":$stateParams});
    }


}]);
/**
 * Created by Mak on 11/30/16.
 */



