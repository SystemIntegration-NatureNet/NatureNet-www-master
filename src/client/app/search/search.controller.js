(function () {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

  /* Search controller
     ======================================================================== */

  SearchController.$inject = [
    '$rootScope',
    '$state',
    '$filter',
    'routerHelper',
    'logger',
    'dataservice',
  ];

  /* @ngInject */
  function SearchController(
    $rootScope,
    $state,
    $filter,
    routerHelper,
    logger,
    dataservice
  ) {
    var vm = this;
    var states = routerHelper.getStates();

    /* Variables
       ================================================== */

    // Data
    vm.userUid = void 0;
    vm.query = '';

    // States
    vm.isMapActive = false;
    vm.isAuthenticated = false;
    vm.showPopup = false;

    // Function assignments
    // vm.getClasses = getClasses;
    // vm.toggleMap = toggleMap;
    // vm.showRegister = showRegister;
    // vm.showSignin = showSignin;
    // vm.signOut = signOut;
    // vm.showEdit = showEdit;
    // vm.search = search;
    vm.projects = [];
    vm.users = [];
    // vm.groups = [];
    vm.sites = [];
    // vm.tags = [];
    vm.obs = [];
    vm.ideas = [];


    activate();



    function getSitesByName() {
      vm.sites = [];
      return dataservice.getArray('sites')
        .then(function (data) {
          angular.forEach(data, function (site) {
            if (site.name.startsWith(vm.query)) {
              vm.sites.push(site);
            }
          })
          return vm.sites;
        })
    }
    function showIdea(i) {
    }
    function getObservationByName() {
      vm.obs = [];
      return dataservice.getArray('observations')
        .then(function (data) {
          angular.forEach(data, function (ob) {
            if (ob.data.text.startsWith(vm.query)) {
              vm.obs.push(ob);
            }
          })
          return vm.obs;
        })
    }

    function getUsersByName() {
      vm.users = [];
      return dataservice.getArray('users')
        .then(function (data) {
          angular.forEach(data, function (user) {
            if (user.display_name.startsWith(vm.query)) {
              vm.users.push(user);
            }
          })
          return vm.users;
        })
    }

    function getProjectsByName() {
      vm.projects = [];
      return dataservice.getArray('activities')
        .then(function (data) {
          //console.log(vm.query);
          angular.forEach(data, function (project) {
            if (project.name.startsWith(vm.query)) {
              vm.projects.push(project);
            }
          })
          return vm.projects;
        })
    }

    function getIdeasByName() {
      vm.ideas = [];
      return dataservice.getArray('ideas')
        .then(function (data) {
          angular.forEach(data, function (idea) {
            if (idea.content.startsWith(vm.query)) {
              vm.ideas.push(idea);
            }
          })
          return vm.ideas;
        })
    }
    /* Activate function
       ================================================== */

    function activate() {
      console.log("below query");
      console.log($rootScope.query);
      console.log(getSitesByName());

      console.log(getUsersByName());
      console.log(getProjectsByName());
      console.log(getIdeasByName());
    }


  }
})();
