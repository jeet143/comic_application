var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $location) {
	 var url = $location.absUrl().split('/');
 var characterID = url[url.length - 1];
   var mainID = url[url.length - 3];
  var challengerID = url[url.length - 1];
  console.log()
  var factory = {};

  factory.routes = {
   characterAPI: $resource('/movies/:action', {}, {
      fetch: {method: 'GET', params: {title: '@title', action: 'search'}, isArray: false },
	  details: {method: 'GET', params: {id: characterID, action: 'details'}, isArray: false },
	  versus: {method: 'GET', params: {main: mainID, challenger: challengerID, action: 'versus'}, isArray: false }
    })
  };

  return factory;
});

app.controller('characterController', function($scope, resources) {
	 $scope.comparisons = [];
  $scope.addToCompare = function(movie) {
    if ($scope.comparisons.length === 2) {
      $scope.maxComparisons = true;
    }
    else {
      $scope.comparisons.push(movie);
    }
  };
  $scope.removeFromCompare = function(index) {
    $scope.comparisons.splice(index, 1);  };
$scope.subcharacter=function(subcar){	
	console.log("subcar"+subcar);
	
	
resources.routes.characterAPI.fetch({title: subcar}, function done(response) {
			var flag=1;
			console.log(response.results);	
		if(response.number_of_total_results==0 ){
			
	flag=0;
	
						
		if(flag==0){
$scope.character ="";			
		
			document.getElementById("not_found").innerHTML="nothing found";              
			console.log("no results ="+flag);
			
	} }
		else {
			flag=1;
			if(flag==1){
			 document.getElementById("not_found").innerHTML="";
			console.log("results found="+flag);
			
			if (response.results.length > 0)
			{
			        $scope.character = {  main: response.results[0], alternatives: response.results };	
			}
			else {
      $scope.character = response;
			}
			}
	  }
	  
    });
	
}
  $scope.searchCharacter = function() {
    resources.routes.characterAPI.fetch({title: $scope.title}, function done(response) {
			var flag=1;
			console.log(response.results);	
		if(response.number_of_total_results==0 ){
			
	flag=0;
						
		if(flag==0){
$scope.character ="";			
		
			document.getElementById("not_found").innerHTML="results not found";
              
			console.log("no results ="+flag);
			
	} }
		else {
			flag=1;
			if(flag==1){
			 document.getElementById("not_found").innerHTML="";
			console.log("results found="+flag);
			//console.log(response);
			if (response.results.length > 0)
			{
			        $scope.character = {  main: response.results[0], alternatives: response.results };	
			}
			else {
      $scope.character = response;
			}
			}
	  }
	  
    });
  };

});


  
  app.controller('characterVersusController', function($scope, resources) {

  function init() {
    resources.routes.characterAPI.versus(function done(response) {
        $scope.character = response;
		console.log("response");
		console.log(response);
		
    });
  }

  init();

});

app.controller('characterDetailController', function($scope, resources) {
	

  $scope.toggleEnemies = function() {
	  
    if ($scope.displayCast) {
      $scope.castBtnText = '+ Demonstrate Enemies Toggle';
      $scope.displayCast = false;
    }
    else {
      $scope.castBtnText = '- Conceal Enemies Toggle';
      $scope.displayCast = true;
    }
  };
  
  $scope.toggleFriends = function() {
    if ($scope.displayFriends) {
      $scope.castBtnText0 = '+ Demonstrate Friends Toggle';
      $scope.displayFriends = false;
    }
    else {
      $scope.castBtnText0 = '- Conceal Friends Toggle';
      $scope.displayFriends = true;
    }
  };
  
  $scope.togglePowers = function() {
    if ($scope.displayPowers) {
      $scope.castBtnText1 = '+ Demonstrate Powers Toggle';
      $scope.displayPowers = false;
    }
    else {
      $scope.castBtnText1 = '-  Conceal Powers Toggle';
      $scope.displayPowers = true;
    }
  };

  function init() {
    resources.routes.characterAPI.details(function done(response) {
        if(response.results.name==null){
			
			document.getElementById("not_found").innerHTML("no results found");
		}
			        $scope.character = response.results;
					console.log(response.results.name);
 console.log("inside init")
 
			
			
			
		
    });
  }
  init();

});