'use strict';

var app = angular.module('oregamiClientApp',
  [
    'ngAnimate',
    'ngSanitize',
    'restangular',
    'ngRoute',
    'mgcrea.ngStrap',
    'pascalprecht.translate',
    'LocalStorageModule',
    'http-auth-interceptor'
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
      .when('/games/new', {
        templateUrl: 'app/games/gamesEdit.html',
        controller: 'GamesEditCtrl as ctrl'
      })
      .when('/games/:gamesId', {
        templateUrl: 'app/games/games.html',
        controller: 'GamesCtrl'
      })
      .when('/games/edit/:gamesId', {
        templateUrl: 'app/games/gamesEdit.html',
        controller: 'GamesEditCtrl as ctrl'
      })
      .when('/persons', {
        templateUrl: 'app/persons/persons.html',
        controller: 'PersonsCtrl'
      })
      .when('/companies', {
        templateUrl: 'app/companies/companies.html',
        controller: 'CompaniesCtrl'
      })
      .when('/publications', {
        templateUrl: 'app/publications/publications.html',
        controller: 'PublicationsCtrl'
      })
      .when('/publications/new', {
        templateUrl: 'app/publications/publicationsEdit.html',
        controller: 'PublicationeditCtrl as ctrl'
      })
      .when('/publications/:publicationsId', {
        templateUrl: 'app/publications/publications.html',
        controller: 'PublicationsCtrl'
      })
      .when('/publications/edit/:publicationsId', {
        templateUrl: 'app/publications/publicationsEdit.html',
        controller: 'PublicationeditCtrl as ctrl'
      })
      .when('/config', {
        templateUrl: 'app/config.html',
        controller: 'ConfigCtrl'
      })
      .when('/languages', {
        templateUrl: 'app/languages/languages.html',
        controller: 'LanguagesCtrl'
      })
      .when('/regions', {
        templateUrl: 'app/regions/regions.html',
        controller: 'RegionsCtrl'
      })
      .when('/gameTitles', {
        templateUrl: 'app/gameTitles/gameTitles.html',
        controller: 'GameTitlesCtrl'
      })
      .when('/gameTitles/:gameTitleId', {
        templateUrl: 'app/gameTitles/gameTitles.html',
        controller: 'GameTitlesCtrl'
      })
      .when('/gamingEnvironments', {
        templateUrl: 'app/gamingEnvironments/gamingEnvironments.html',
        controller: 'GamingEnvironmentsCtrl'
      })
      .when('/gamingEnvironments/:gamingEnvironmentId', {
        templateUrl: 'app/gamingEnvironments/gamingEnvironments.html',
        controller: 'GamingEnvironmentsCtrl'
      })
      .when('/register', {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/websites', {
        templateUrl: 'app/website/website.html',
        controller: 'WebsiteCtrl'
      })
      .when('/revisions', {
        templateUrl: 'app/revisions/revisions.html',
        controller: 'RevisionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
;

app.factory('RestFulResponse', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setFullResponse(true);
  });
});

app.run(function($rootScope, Restangular, localStorageService, $log) {

    $rootScope.API = "http://test.server.oregami.org";
    //$rootScope.API = "http://localhost:8080";

  Restangular.setBaseUrl($rootScope.API);
  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    $rootScope.errordata = response.data;
    $rootScope.isLoading--;
    return response;
  });

  Restangular.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
    if (localStorageService.get("token") != null) {
      $log.info('auth-header is set: \n' + JSON.stringify(localStorageService.get("token")));
      headers.authorization = "bearer " + localStorageService.get("token").token;
    }
    return {
      element: element,
      headers: headers,
      params: params,
      httpConfig: httpConfig
    };

  });

  Restangular.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
    if (localStorageService.get('token') != null) {
      $log.info('auth-header is set: \n' + JSON.stringify(localStorageService.get('token')));
      headers.authorization = 'bearer ' + localStorageService.get('token').token;
    }
    return {
      element: element,
      headers: headers,
      params: params,
      httpConfig: httpConfig
    };

  });
  Restangular.addResponseInterceptor(function(response) {
    $rootScope.isLoading--;
    $rootScope.errordata = null;
    return response;
  });
  Restangular.setDefaultHeaders({'Content-Type': 'application/json'});
  $rootScope.loggedIn = false;
  if (localStorageService.get('token') != null) {
    $rootScope.loggedIn = true;
  }
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
  $translatePartialLoaderProvider.addPart('gamingEnvironments');
  //$translatePartialLoaderProvider.addPart('login');

  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/assets/language/{part}_{lang}.json'
  });

  $translateProvider.preferredLanguage('en');
});


app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('oregami');
});
