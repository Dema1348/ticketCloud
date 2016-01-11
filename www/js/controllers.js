angular.module('ticketCloudApp.controllers', [])
  .controller('HomeCtrl',function() {})

  .controller('LoginCtrl',function(authFactory,$scope,$state,$ionicLoading,$timeout) {
  	
  	$scope.form=[];

  	$scope.login=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.form;
        authFactory.login(user).then(
        	function(authData) {
        		$state.go('tab.home')
        	},
        	function(error) {
        		$scope.error=true;
        		$timeout(function() {
        			$scope.error=false
        		},3000)
        		console.log(error)
        	}).then(function() {
        		$scope.form=[];
        		$ionicLoading.hide();
        	})

  	};



  })

  .controller('SignupCtrl',function(authFactory,$scope,$state,$ionicLoading,$timeout) {
  	$scope.form=[];
  	$scope.registro=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.form;
        authFactory.registro(user).then(
        	function(authData) {		
        		$scope.exito=true;
        		$timeout(function() {
        			$scope.exito=false;
              $state.go('auth.login');
        		},3000)
        		// authFactory.login(user).then(
        		// 	function(authData) {
        		// 		$state.go('tab.home')
        		// 	},
        		// 	function(error) {
        		// 		console.log(error)
        		// 	})
        	},
        	function(error) {
        		$scope.error=true;
        		$timeout(function() {
        			$scope.error=false
        		},3000)
        		console.log(error)
        		
        	}).then(function() {
        		$scope.form=[];
        		$ionicLoading.hide();
        		


        	})

  	};




  })

  .controller('ResetCtrl',function(authFactory,$scope,$state,$ionicLoading,$timeout) {
  	$scope.form=[];

  	$scope.reset=function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
	    var user= $scope.form;
  		authFactory.reset(user).then(
  			function() {
  				$scope.exito=true;
  				$timeout(function() {
        			$scope.exito=false
        		},3000)
  			},
  			function(error) {
  				$scope.error=true;
  				$timeout(function() {
        			$scope.error=false
        		},3000)
  				console.log(error);
  			}).then(function() {
  				$scope.form=[];
  				$ionicLoading.hide();
  			})
  	}
  })

  .controller('TabCtrl',function(authFactory,$scope,$state) {

    if(authFactory.isLogin())
    $scope.user=authFactory.getUser();


     $scope.cerrarSesion=function() {
      console.log("Session cerrada");
        authFactory.cerrarSesion();
        $state.go('auth.login');


     }

  });
 

