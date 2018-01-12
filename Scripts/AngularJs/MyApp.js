var app = angular.module('MyApp', ['angularjs-dropdown-multiselect']);
app.controller('multiselectdropdown', ['$scope', '$http', function ($scope, $http) {
    //define object 
    $scope.ActorsSelected = [];
    $scope.Actors = [];
    $scope.names = [];
    $scope.namesSelected = [];
    $scope.DirectorsSelected = [];
    $scope.Directors = [];
    $scope.MusicDirectorsSelected = [];
    $scope.MusicDirectors = [];
    $scope.dropdownSetting = {
        scrollable: false,
        scrollableHeight: 'auto'        
    }    
    //fetch data from database for show in multiselect dropdown
    $http.get('/iMDb/GetCaseAndCrew?type=1').then(function (data) {
        angular.forEach(data.data, function (value, index) {
            $scope.Actors.push({ id: value.ID, label: value.Name });            
        });
    })
    $http.get('/iMDb/GetCaseAndCrew?type=2').then(function (data) {
        angular.forEach(data.data, function (value, index) {
            $scope.Directors.push({ id: value.ID, label: value.Name });
        });
    })    
    $http.get('/iMDb/GetCaseAndCrew?type=3').then(function (data) {
        angular.forEach(data.data, function (value, index) {
            $scope.MusicDirectors.push({ id: value.ID, label: value.Name });
        });
    })
    var listProducers = new Array();
    $http.get("/iMDb/GetCaseAndCrew?type=4").success(function (data) {

        $.map(data, function (item) {
            listProducers.push(item.Name);
        });

        $scope.Producers = listProducers;
    }).error(function (status) {
        alert(status);
    });
    $scope.refreshProducerList = function () {
        var listProducers = new Array();
        $http.get("/iMDb/GetCaseAndCrew?type=4").success(function (data) {

            $.map(data, function (item) {
                listProducers.push(item.Name);
            });

            $scope.Producers = listProducers;
        }).error(function (status) {
            alert(status);
        });
    }
    $scope.GetSelectedItem = function (selected) {        
        $scope.hdnProducerText = selected;        
    }
    $scope.refreshActorList = function () {        
        $http.get('/iMDb/GetCaseAndCrew?type=1').then(function (data) {
            angular.forEach(data.data, function (value, index) {
                $scope.Actors.push({ id: value.ID, label: value.Name });
            });
        })
    }
    $scope.refreshDirectorList = function () {
        $http.get('/iMDb/GetCaseAndCrew?type=2').then(function (data) {
            angular.forEach(data.data, function (value, index) {
                $scope.Directors.push({ id: value.ID, label: value.Name });
            });
        })
    }
    $scope.refreshMCList = function () {
        $http.get('/iMDb/GetCaseAndCrew?type=3').then(function (data) {
            angular.forEach(data.data, function (value, index) {
                $scope.MusicDirectors.push({ id: value.ID, label: value.Name });
            });
        })
    }
    //post or submit selected items from multiselect dropdown to server
    $scope.SubmittedActors = [];
    $scope.SubmitData = function () {
        var actorIds = [];
        var musicDirectorsIds = [];
        var directorsIDs = [];
        var appendActorIds = '';
        var appendMCIds = '';
        var appendDirectorIds = '';
        angular.forEach($scope.ActorsSelected, function (value, index) {
            //actorIds.push(value.id);
            appendActorIds = appendActorIds + value.id + ',';
        });
        angular.forEach($scope.MusicDirectorsSelected, function (value, index) {
            //musicDirectorsIds.push(value.id);
            appendMCIds = appendMCIds + value.id + ',';
        });
        angular.forEach($scope.DirectorsSelected, function (value, index) {
            //directorsIDs.push(value.id);
            appendDirectorIds = appendDirectorIds + value.id + ',';
        });        
        $scope.hdnActorText = appendActorIds;
        $scope.hdnMCText = appendMCIds;
        $scope.hdnDirectorText = appendDirectorIds;
        //var data = {
        //    actorIds: actorIds,
        //    musicDirectorsIds: musicDirectorsIds,
        //    directorsIDs: directorsIDs,
        //    movieName: Name,
        //    plot: plot
        //};

        //$http({
        //    method: "POST",
        //    url: "/iMDb/savedata",
        //    data:JSON.stringify(data)
        //}).then(function (data) {
        //    $scope.SubmittedActors = data.data;
        //}, function (error) {
        //    alert('Error');
        //})
    }

}])