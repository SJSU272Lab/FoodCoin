/**
 * Created by Mak on 11/29/16.
 */
/**
 * Created by Mak on 11/29/16.
 */
index.controller("userHome",['$scope','$http','$state' ,'NgMap' ,function($scope,$http ,$state,NgMap){


    console.log("Hello from  userHome page controller");
    $scope.onload = true;

    $scope.showData = function()
    {

        // $http.post('/data',$scope.res).success(function(res){


            //console.log("Got the response",res);
            $http.post('/getResData',$scope.res).success(function(result){

                console.log(result);
                $scope.count = result.length;
                $scope.showMap= true;
                $scope.step1hide=true;
                $scope.mapLatitude = result[20].latitude;
                $scope.mapLongitude = result[20].longitude;
                $scope.properties = result;


                $scope.$on('mapInitialized', function(event, map) {
                    $scope.map = map;
                });
                NgMap.getMap().then(function(map) {
                    console.log(map.getCenter());
                    console.log('markers', map.markers);
                    console.log('shapes', map.shapes);
                });


            });


        // }).error(function(err){
        //
        // })

    }

    $scope.predictData  = function(d,c)

    {

        $http.post('/result',{"type":d,"city":c}).success(function(result){

            console.log(result);

           $state.go("businessHour",{"schedule":result});

        });


    }




  /*  $scope.showproperty = function(e,p){
        $scope.p = p;
        $scope.showInfoWindow('bar', p._id);
        $scope.limage = p.listingImages[0][0];
        console.log("Image URL:"+$scope.limage);
    };*/


}]);