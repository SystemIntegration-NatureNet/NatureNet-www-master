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
    '$q',
    '$scope'
  ];

  /* @ngInject */
  function SearchController(
    $rootScope,
    $state,
    $filter,
    routerHelper,
    logger,
    dataservice,
    $q,
    $scope
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
    vm.updateProjectId = updateProjectId;


    vm.showMoreIdeas = showMoreIdeas;
    vm.showMoreProjects = showMoreProjects;
    vm.showMoreSites = showMoreSites;
    vm.showMoreUsers = showMoreUsers;


    vm.projectObservations = [];
    vm.projects = [];
    vm.users = [];
    vm.showDetail = false;
    vm.userDisplayLimit = 5;
    vm.projectDisplayLimit = 5;
    vm.siteDisplayLimit = 5;
    vm.ideaDisplayLimit = 5;
  
    // vm.groups = [];
    vm.sites = [];
    // vm.tags = [];
    vm.selectIdea = selectIdea;
    vm.obs = [];
    vm.ideas = [];
   vm.show = false;

    activate();

    function showMoreIdeas(){
      vm.ideaDisplayLimit = vm.ideaDisplayLimit + 5;
    }

    function showMoreProjects(){
      vm.projectDisplayLimit = vm.projectDisplayLimit + 5;
    }

    function showMoreSites(){
      vm.siteDisplayLimit = vm.siteDisplayLimit + 5;
    }

    function showMoreUsers(){
      vm.userDisplayLimit = vm.userDisplayLimit + 5;
    }

    $rootScope.$on('map:show', showObservation);
    $scope.$watch('vm.selectedIdea', loadComments);

    function selectIdea(idea) {
      vm.selectedIdea = idea;
      vm.showDetail = true;
      //closeDrawer();
    }


    function getSitesByName() {
      vm.sites = [];
      return dataservice.getArray('sites')
        .then(function (data) {
          angular.forEach(data, function (site) {
            var names = site.name.replace(',','').replace('.','').replace('\'','').toLowerCase().split(' ');
            if ((names.indexOf(vm.query) > -1) || vm.query === '') {
              vm.sites.push(site);
            }
          })
          return vm.sites;
        })
    }
    function showObservation (event, o) {

      if (!!o) {
        loadComments(o);
        vm.projectObservation = o;
      }
    }
    function loadComments(currentObservation) {
      vm.comments = void 0;
      if (!!currentObservation) {
        return dataservice.getCommentsForRecord(currentObservation)
          .then(function (data) {
            vm.comments = data;
            return vm.comments;
          });
      }
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
            var name = user.display_name.toLowerCase();
            if (name.startsWith(vm.query)) {
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
            var desc = project.description.replace(',','').replace('.','').replace('\'','').toLowerCase().split(' ');
            if (project.name.startsWith(vm.query) || desc.indexOf(vm.query) > -1) {
              vm.projects.push(project);
            }
          })
          return vm.projects;
        })
    }
    function getObservationsByProjectId(id) {
      return dataservice.getObservationsByProjectId(id)
        .then(function (data) {
          vm.projectObservations = data;
          return vm.projectObservations;
        });
    }
    function updateProjectId(id) {
      var promises = [getObservationsByProjectId(id)];
      return $q.all(promises)
        .then(function () {
          vm.projectId = id;
          vm.show = true;
          //closeDrawer();
          logger.info('Updated Projects View based on new projectId');
        });
    }

    function getIdeasByName() {
      vm.ideas = [];
      return dataservice.getArray('ideas')
        .then(function (data) {
          angular.forEach(data, function (idea) {
            var contents = idea.content.replace(',','').replace('.','').replace('\'','').toLowerCase().split(' ');
            if (contents.indexOf(vm.query) > -1) {
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
      vm.query = $rootScope.query;
      vm.showDetail = false;  
      vm.show = false;
      if(vm.query && vm.query !== "undefined" && typeof vm.query === "string" && vm.query.length > 0){
        vm.query = vm.query.toLowerCase();
      }
      console.log(vm.query);

      
      console.log(getSitesByName());

      console.log(getUsersByName());
      console.log(getProjectsByName());
      console.log(getIdeasByName());
    }


  }
})();
