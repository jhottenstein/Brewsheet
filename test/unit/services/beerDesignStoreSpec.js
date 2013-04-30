/*jshint camelcase:false*/
/*global BeerDesign */
'use strict';

describe('design service', function () {
  var BeerDesignStore, design, localStorage, $rootScope;

  beforeEach(module('brewsheetApp'));

  describe('with empty local storage', function () {
    beforeEach(function () {
      module(function ($provide) {
        localStorage = {};
        $provide.value('localStorage', localStorage);
      });
      inject(function (_BeerDesignStore_) {
        BeerDesignStore = _BeerDesignStore_;
      });
    });

    it('should default to an empty HopBill with the design ibus', function () {
      expect(BeerDesignStore.get()).toEqual(new BeerDesign());
    });


    it('should persist changes to localStorage', function () {
      var beerDesign = BeerDesignStore.get();
      expect(beerDesign).toEqual(new BeerDesign());

      beerDesign.og = 1.050;
      BeerDesignStore.store();
      var expectedJSON = '{"og":1.05}';
      expect(localStorage.beerDesign).toBe(expectedJSON);
    });
  });
  describe('with populated local storage', function () {

    beforeEach(function () {
      module(function ($provide) {
        localStorage = {
          beerDesign: '{"name":"Jasper","style":"Sarsaparilla","og":1.020,"ibu":10,"srm":20}'
        };
        $provide.value('localStorage', localStorage);
      });
      inject(function (_BeerDesignStore_) {
        BeerDesignStore = _BeerDesignStore_;
      });
    });
    it('should use localStorage value if it exists', function () {
      var design = BeerDesignStore.get();
      expect(design.name).toBe('Jasper');
      expect(design.style).toBe('Sarsaparilla');
      expect(design.og).toBe(1.02);
      expect(design.ibu).toBe(10);
      expect(design.srm).toBe(20);
      expect(design.buGu()).toBeCloseTo(0.5, 2);
    });

    it('should persist values and overwrite localStorage', function () {
      var design = BeerDesignStore.get();
      design.name = 'Tap';
      design.style = 'Water';
      design.og = 1.000;
      design.ibu = 0;
      design.srm = 0;
      BeerDesignStore.store();
      expect(localStorage.beerDesign).toBe('{"name":"Tap","style":"Water","og":1,"ibu":0,"srm":0}');
    });
  });
});
