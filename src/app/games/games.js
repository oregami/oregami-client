'use strict';

angular.module('oregamiClientApp')
  .controller('GamesCtrl', ['$scope', 'gamesService', '$translate', '$translatePartialLoader', 'Restangular',
    function ($scope, $gamesService, $translate, $translatePartialLoader, Restangular) {

      $translatePartialLoader.addPart('games');

      $scope.getGames = function () {
        $gamesService.getGames().then(function (d) {
          $scope.games = d;
        });
      };

      //load games:
      $scope.getGames();

      $scope.originalTitleFilter = function (gameToGameTitleConnection) {
        return gameToGameTitleConnection.titleType.value == 'ORIGINAL_TITLE';
      };
      $scope.notOriginalTitleFilter = function (gameToGameTitleConnection) {
        return !$scope.originalTitleFilter(gameToGameTitleConnection);
      };

      $scope.game = null;

      /*
       $scope.updateGame = function(game) {
       $scope.game= angular.copy(game);
       console.log($scope.game);
       $gamesService.updateGame(game);
       };
       */


    }]);