/*jshint camelcase:false*/
'use strict';

describe('design service', function() {
  var design, localStorage, $rootScope;

  beforeEach(module('brewsheetApp'));

  describe('Empty Local Storage Tests', function() {
    beforeEach(function() {
      module(function($provide) {
        localStorage = {
        };

        $provide.value('localStorage', localStorage);
      });
      inject(function(_design_, _$rootScope_) {
        design = _design_;
        $rootScope = _$rootScope_;
      });
    });
  
    it('should default to undefined', function() {

      expect(design.name).toBe(undefined);
      expect(design.style).toBe(undefined);
      expect(design.og).toBe(undefined);
      expect(design.ibu).toBe(undefined);
      expect(design.srm).toBe(undefined);
    });

    it('should persist to localStorage', function() {
      $rootScope.$apply(function() {
        design.name = 'Jasper';
        design.style = 'Sarsaparilla';
        design.og = 1.020;
        design.ibu = 10;
        design.srm = 20;
      });

      expect(localStorage.beerDesign).toBe('{"name":"Jasper","style":"Sarsaparilla","og":1.02,"ibu":10,"srm":20}');
    });
  });

  describe('Full Local Storage Tests', function() {
    beforeEach(function() {
      module(function($provide) {
        localStorage = {
          beerDesign: '{"name":"Jasper","style":"Sarsaparilla","og":1.020,"ibu":10,"srm":20}'
        };

        $provide.value('localStorage', localStorage);
      });

      inject(function(_design_, _$rootScope_) {
        design = _design_;
        $rootScope = _$rootScope_;
      });
    });
    it('should use localStorage value if it exists', function() {

      expect(design.name).toBe('Jasper');
      expect(design.style).toBe('Sarsaparilla');
      expect(design.og).toBe(1.02);
      expect(design.ibu).toBe(10);
      expect(design.srm).toBe(20);
    });
    it('should persist values and overwrite localStorage', function() {
      $rootScope.$apply(function() {
        design.name = 'Tap';
        design.style = 'Water';
        design.og = 1.000;
        design.ibu = 0;
        design.srm = 0;
      });

      expect(localStorage.beerDesign).toBe('{"name":"Tap","style":"Water","og":1,"ibu":0,"srm":0}');
    });
  });
});
