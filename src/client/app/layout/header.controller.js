(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('HeaderController', HeaderController);

  /* Header controller
     ======================================================================== */

  HeaderController.$inject = [
    '$rootScope',
    '$state',
    '$filter',
    '$location',
    'routerHelper',
    'logger',
    'dataservice',
    // '$window',
    // '$location',

  ];

  /* @ngInject */
  function HeaderController(
    $rootScope,
    $state,
    $filter,
    $location,
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
    vm.getClasses = getClasses;
    vm.toggleMap = toggleMap;
    vm.showRegister = showRegister;
    vm.showSignin = showSignin;
    vm.signOut = signOut;
    vm.showEdit = showEdit;
    vm.search = search;
    vm.projects = [];
    vm.users = [];
    vm.groups = [];
    vm.sites = [];
    vm.tags = [];
    vm.obs = [];
    vm.ideas = [];


    activate();

    /* Activate function
       ================================================== */

    function activate() {
      getAuth();
      getNavRoutes();
    }

    /* Data functions
       ================================================== */
    function search(){

      $rootScope.query = vm.query;


      console.log('query: '+vm.query);
      
      //console.log(lvm.sites);
      //console.log(vm.obs);
      $location.path('search');
      //console.log('query: '+vm.query);
      //vm.query = '';
    }

    


    function getAuth() {
      return dataservice.onAuthStateChanged(onAuthChanged);
    }

    function onAuthChanged(user) {
      $rootScope.$apply(function () {
        if (user) {
          vm.isAuthenticated = true;
          vm.userUid = user.uid;
          $rootScope.currentUser = user.uid;
          $rootScope.userRank = void 0;
          dataservice.getActiveUserRank().then(function (data) {
            $rootScope.userRank = data;
          });
        } else {
          vm.isAuthenticated = false;
          vm.userUid = void 0;
          $rootScope.currentUser = void 0;
          $rootScope.userRank = void 0;
        }

        return vm.userUid;
      });
    }

    function unAuth() {
      logger.success('You are now logged out.');
    }

    /* Route function
       ================================================== */

    function getNavRoutes() {
      vm.navRoutes = states.filter(function (r) {
        return r.settings && r.settings.nav;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    /* Css class function
       ================================================== */

    function getClasses(route) {
      return getRouteName(route) + ' ' + isCurrent(route);
    }

    function getRouteName(route) {
      return 'item-' + route.name;
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }

      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName
        ? 'is-current'
        : '';
    }

    /* Map function
       ================================================== */

    function toggleMap(isActive) {
      vm.showPopup = false;
      if (typeof (isActive) === 'boolean' && isActive) {
        $rootScope.$broadcast('map:show');
        vm.isMapActive = isActive;
      } else if (typeof (isActive) === 'boolean' && !isActive) {
        $rootScope.$broadcast('map:hide');
        vm.isMapActive = isActive;
      } else if (typeof (isActive) !== 'boolean') {
        $rootScope.$broadcast('map:toggle');
        vm.isMapActive = !vm.isMapActive;
      }
    }

    /* Click function
       ================================================== */

    function showRegister() {
      $rootScope.$broadcast('register:show');
      vm.showPopup = false;
    }

    function showEdit() {
      $rootScope.$broadcast('account:edit');
      vm.showPopup = false;
    }

    function showSignin() {
      $rootScope.$broadcast('signin:show');
      vm.showPopup = false;
    }

    function signOut() {
      $rootScope.$broadcast('signout');
      vm.showPopup = false;
      unAuth();
    }

    /* Listener Functions
       ================================================== */

    $rootScope.$on('auth:success', showUserInfo);
    $rootScope.$on('map:show', showMap);

    function showUserInfo() {
      vm.showPopup = false;
    }

    function showMap() {
      vm.isMapActive = true;
      vm.showPopup = false;
    }
  }
})();
