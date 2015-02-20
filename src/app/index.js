'use strict';

var app = angular.module('oregamiClientApp',
  [
    'ngAnimate',
    'ngSanitize',
    'restangular',
    'ngRoute',
    'mgcrea.ngStrap',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/games', {
        templateUrl: 'app/games/games.html',
        controller: 'GamesCtrl'
      })
      .when('/persons', {
        templateUrl: 'views/persons.html',
        controller: 'PersonsCtrl'
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl'
      })
      .when('/publications', {
        templateUrl: 'views/publications.html',
        controller: 'PublicationsCtrl'
      })
      .when('/publications/:publicationsId', {
        templateUrl: 'views/publications.html',
        controller: 'PublicationsCtrl'
      })
      .when('/publications/edit/:publicationsId', {
        templateUrl: 'views/publicationsEdit.html',
        controller: 'PublicationeditCtrl as ctrl'
      })
      .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl'
      })
      .when('/languages', {
        templateUrl: 'views/languages.html',
        controller: 'LanguagesCtrl'
      })
      .when('/regions', {
        templateUrl: 'views/regions.html',
        controller: 'RegionsCtrl'
      })
      .when('/gameTitles', {
        templateUrl: 'views/gameTitles.html',
        controller: 'GameTitlesCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/websites', {
        templateUrl: 'views/website.html',
        controller: 'WebsiteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
;

app.run(function($rootScope, Restangular) {
  //$rootScope.API = "http://test.server.oregami.org";
  $rootScope.API = "http://localhost:8080";
  //$rootScope.API = "http://192.168.59.103:8080";
  Restangular.setBaseUrl($rootScope.API);
  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    $rootScope.errordata = response.data;
    $rootScope.isLoading--;
    return response;
  });
  $rootScope.isLoading = 0;
  Restangular.addRequestInterceptor(function(element) {
    $rootScope.isLoading++;
    return element;
  });
  Restangular.addResponseInterceptor(function(data) {
    $rootScope.isLoading--;
    $rootScope.errordata = null;
    return data;
  });
});

app.config(function ($translateProvider, $translatePartialLoaderProvider) {

  $translatePartialLoaderProvider.addPart('main');
  $translatePartialLoaderProvider.addPart('navigation');
  $translatePartialLoaderProvider.addPart('games');
  $translatePartialLoaderProvider.addPart('regions');
  $translatePartialLoaderProvider.addPart('gameTitles');
  $translatePartialLoaderProvider.addPart('publications');
  $translatePartialLoaderProvider.addPart('languages');
  $translatePartialLoaderProvider.addPart('websites');
  $translatePartialLoaderProvider.addPart('register');

  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/assets/language/{part}_{lang}.json'
  });

  $translateProvider.preferredLanguage('en');
});
