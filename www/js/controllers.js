angular.module('ticketCloudApp.controllers', [])
  .controller('HomeCtrl',function() {})

  .controller('LoginCtrl',function(authFactory,$scope,$state,$ionicLoading) {
  	
  	$scope.form=[];

  	$scope.login=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.form;
  		console.log(user)
        authFactory.login(user).then(
        	function(authData) {
        		console.log(authData)
        		$state.go('tab.home')
        	},
        	function(error) {
        		$ionicLoading.hide();
        		$scope.error=true;
        		console.log(error)
        	})

  	};


  	$scope.registro=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.form;
  		console.log(user)
        authFactory.login(user).then(
        	function(authData) {
        		console.log(authData)
        		$state.go('tab.home')
        	},
        	function(error) {
        		$ionicLoading.hide();
        		$scope.error=true;
        		console.log(error)
        	})

  	};

  })

