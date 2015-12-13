(function(){
	
	'use strict';
	
	angular.module('app').controller('appController', 
	
		['$scope','$sessionStorage',
			function($scope, $sessionStorage){
			
				$scope.state = $sessionStorage.authState || 'unauthorized';
				
				$scope.$on('spa-menu-signout',function(event, data){
					$scope.state = 'unauthorized';
				});
				
				$scope.$on('spa-menu-signin',function(event, data){
					console.info('Signing In');
					$scope.state = 'authorized';
				});
				
				$scope.$watch('state', function(){
					$sessionStorage.authState = $scope.state;
				});
			}
		]
	);
	
})();