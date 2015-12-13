(function() {
	'use strict';

	angular
		.module('spaFramework')
		.directive('spaUserProfileSmall', spaUserProfileSmall);

	function spaUserProfileSmall() {
		
		return {
			templateUrl: 'modules/framework/userprofile/userprofilesmalltemplate.html'
		};		
	}

})();