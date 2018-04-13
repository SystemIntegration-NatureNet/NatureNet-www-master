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
    // vm.projects = [];
    // vm.users = [];
    // vm.groups = [];
    // vm.sites = [];
    // vm.tags = [];
    // vm.obs = [];
    // vm.ideas = [];


     activate();

    /* Activate function
       ================================================== */

     function activate() {
       console.log("below query");
       console.log($rootScope.query);
      }
  }
})();
