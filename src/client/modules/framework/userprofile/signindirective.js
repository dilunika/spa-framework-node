(function() {
	'use strict';

	angular
		.module('spaFramework')
		.directive('spaSignIn', spaSignIn);

	spaSignIn.$inject = ['$rootScope'];
	function spaSignIn($rootScope) {
		
		return {
			templateUrl: 'modules/framework/userprofile/signintemplate.html',
			link: link,
			
		};
		
		function link(scope, element, attrs) {
			
			scope.signIn = function(){
				var data = {
					username: scope.username,
					password: scope.password
				};
				$rootScope.$broadcast('spa-menu-signin',data);
			}
		}
	}
	
})();