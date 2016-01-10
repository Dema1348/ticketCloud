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
        		$scope.error=true;
        		console.log(error)
        	}).then(function() {
        		$ionicLoading.hide();
        	})

  	};



  })

  .controller('SignupCtrl',function(authFactory,$scope,$state,$ionicLoading) {
  	$scope.form=[];
  	$scope.registro=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.form;
  		console.log(user)
        authFactory.registro(user).then(
        	function(authData) {		
        		console.log("User creado con exito "+authData.uid)
        		authFactory.login(user).then(
        			function(authData) {
        				$state.go('tab.home')
        			},
        			function(error) {
        				console.log(error)
        			})
        	},
        	function(error) {
        		$scope.error=true;
        		
        		console.log(error)
        	}).then(function() {
        		$ionicLoading.hide();
        	})

  	};

  });

