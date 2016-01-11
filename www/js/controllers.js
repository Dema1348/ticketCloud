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
           
            if (error) {
                switch (error.code) {
                  case "INVALID_EMAIL":
                    $scope.mensaje="El correo electrónico especificado para el usuario es inválido."
                    break;
                  case "INVALID_PASSWORD":
                   $scope.mensaje="La contraseña especificada para el usuario es incorrecta."
                    break;
                  case "INVALID_USER":
                     $scope.mensaje="El correo electrónico especificado no existe."
                    break;
                  default:
                    console.log("Error desconocido al iniciar sesion");
                }

               $timeout(function() {
               $scope.error=false
               },3000)  

              }

        		
        
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
        	function() {		
        		$scope.exito=true;
        		$state.go('tab.home')
        	},
        	function(error) {
            $scope.error=true;
             if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    $scope.mensaje="El correo electrónico especificado ya se encuentra registrado."
                    break;
                  case "INVALID_PASSWORD":
                   $scope.mensaje="La contraseña especificada para el usuario es incorrecta."
                    break;
                  default:
                    console.log("Error desconocido al crear cuenta de usuario");
                }

        	
        		$timeout(function() {
        			$scope.error=false
        		},3000)
        		console.log(error.code)
            }
        		
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
          if (error) {
                switch (error.code) {
                  case "INVALID_USER":
                    $scope.mensaje="El correo electrónico especificado no existe."
                    break;
                  default:
                    console.log("Error desconocido al reiniciar cuenta de usuario");
                }

  				$scope.error=true;
  				$timeout(function() {
        			$scope.error=false
        		},3000)
          }
  				console.log(error.code);
  			}).then(function() {
  				$scope.form=[];
  				$ionicLoading.hide();
  			})
  	}
  })

  .controller('TabCtrl',function(authFactory,$scope,$state) {

    $scope.user=authFactory.getUser();
     $scope.cerrarSesion=function() {
      console.log("Session cerrada");
        authFactory.cerrarSesion();
        $state.go('auth.login');


     }

  });
 

