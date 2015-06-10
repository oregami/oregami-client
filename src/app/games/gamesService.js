'use strict';

angular.module('oregamiClientApp')
  .service('gamesService', ['Restangular',

     function gamesService(Restangular) {

         var url = 'games';

         return {
             getAll: function() {
                 return Restangular.all(url).getList().$object;
             },
             updateOne: function(task) {
                 var ret = task.put();
                 return ret;
             }
             ,
             getOne: function(id) {
               console.log("id: " + JSON.stringify(id));
               return Restangular.one(url, id).get();
             }
             ,
             getOneRevisionNumbers: function(taskId) {
                 return Restangular.all(url + '/' +  taskId + "/revisions").getList().$object;
             }
             ,
             getOneWithRevision: function(taskId, revision) {
                 return Restangular.one(url + '/' +  taskId + "/revisions/" + revision).get();
             }

         }

  }]);
