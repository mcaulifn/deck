'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.deploymentStrategy.highlander', [])
  .config(function(deploymentStrategyConfigProvider) {
    deploymentStrategyConfigProvider.registerStrategy({
      label: 'Highlander',
      description: 'Destroys previous server group as soon as new server group passes health checks',
      key: 'highlander',
    });
  }).name;
