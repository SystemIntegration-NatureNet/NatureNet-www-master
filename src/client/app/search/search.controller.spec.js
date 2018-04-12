/* jshint -W117, -W030 */
describe('searchController', function () {
  var controller;
  var scope;

  beforeEach(function () {
    bard.appModule('app.search');
    bard.inject('$controller', '$q', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('searchController', {
      $scope: scope,
    });
  });

  describe('search controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of search', function () {
        expect(controller.title).to.be.equal('Search');
      });

      it('should have a map', function () {
        expect(controller.map).to.be.defined;
      });

      it('map view should be hidden', function () {
        expect(scope.$parent.hasMap).to.be.false;
      });

      it('sidebar should be hidden', function () {
        expect(controller.hasSidebar).to.be.false;
      });
    });

    describe('map functions', function () {
      it('should toggle the map view', function () {
        controller.toggleMap();
        expect(scope.$parent.hasMap).to.be.true;
      });
    });

    describe('sidebar functions', function () {
      it('should show the sidebar', function () {
        controller.showSidebar();
        expect(controller.hasSidebar).to.be.true;
      });

      it('should hide the sidebar', function () {
        controller.hideSidebar();
        expect(controller.hasSidebar).to.be.false;
      });
    });
  });

});
