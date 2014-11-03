'use strict';

angular.module('worktajmApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('reports', {
				url: '/reports',
				views: {
					'': {
						templateUrl: 'app/reports/reports.html',
						controller: 'ReportsCtrl'
					},
					'filters@reports': {
						templateUrl: 'app/reports/filters.html',
						controller: 'ReportsCtrl'
					},
					'results@reports': {
						templateUrl: 'app/reports/results.html',
						controller: 'ReportsCtrl'
					}
				},
				controller: 'ReportsCtrl'
			}
		);
	}
);