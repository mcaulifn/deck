'use strict';

let angular = require('angular');

require('./quickPatchAsgStage.html');
require('./quickPatchAsgExecutionDetails.html');

module.exports = angular.module('spinnaker.pipelines.stage.quickPatchAsgStage', [])
  .config(function(pipelineConfigProvider) {
    pipelineConfigProvider.registerStage({
      label: 'Quick Patch Server Group',
      description: 'Quick Patches a server group',
      key: 'quickPatch',
      controller: 'QuickPatchAsgStageCtrl',
      controllerAs: 'QuickPatchAsgStageCtrl',
      templateUrl: require('./quickPatchAsgStage.html'),
      executionDetailsUrl: require('./quickPatchAsgExecutionDetails.html')
    });
  }).controller('QuickPatchAsgStageCtrl', function($scope, stage, bakeryService, accountService) {
    $scope.stage = stage;
    $scope.baseOsOptions = ['ubuntu', 'centos'];
    $scope.stage.application = $scope.application.name;
    $scope.stage.healthProviders = ['Discovery'];

    $scope.state = {
      accounts: false,
      regionsLoaded: false
    };

    accountService.listAccounts().then(function (accounts) {
      $scope.accounts = accounts;
      $scope.state.accounts = true;
    });

    $scope.accountUpdated = function() {
      accountService.getRegionsForAccount($scope.stage.credentials).then(function(regions) {
        $scope.regions = regions;
        $scope.regionsLoaded = true;
        $scope.stage.account = $scope.stage.credentials;
      });
    };

    (function() {
      if ($scope.stage.credentials) {
        $scope.accountUpdated();
      }
    })();

    $scope.$watch('stage.credentials', $scope.accountUpdated);
  })
  .name;

