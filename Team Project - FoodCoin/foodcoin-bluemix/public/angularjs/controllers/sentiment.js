index.controller("sentiment",['$scope','$http','$state' ,'$stateParams','Upload',function($scope,$http ,$state,$stateParams,Upload){

    console.log("Sentiment controller");


    console.log("sate",$stateParams);

    $scope.uploadImage = function(file){

        Upload.upload({
            // url: 'http://localhost:3000/uploadCSV', //webAPI exposed to upload the file
            url: '/uploadCSV', //webAPI exposed to upload the file
            data:{file:file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            // console.log("Response of the server  after upload",resp);
            if(resp.status === 200){ //validate success

                $http.post("http://foodcoin.mybluemix.net/inputReviews",resp.data).success(function(res){
                    console.log(res);
                    $state.go("dashboard",{"schedule":$stateParams,"sentiment":res})
                })

                $scope.trained = true;

                console.log(JSON.stringify(resp.data));

            } else {
                alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });

        console.log("I am hit");
    }

}]);