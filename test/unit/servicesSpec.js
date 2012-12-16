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

      expect(design.og).toBe(undefined);
      expect(design.ibu).toBe(undefined);
    });

    it('should persist to localStorage', function() {
      $rootScope.$apply(function() {
        design.og = 1.020;
        design.ibu = 40;
      });

      expect(localStorage.beerDesign).toBe('{"og":1.02,"ibu":40}');

    });
  });

  it('should use localStorage value if it exists', function() {
    module(function($provide) {
      localStorage = {
        beerDesign: '{"og":1.020,"ibu":40}'
      };

      $provide.value('localStorage', localStorage);
    });

    inject(function(_design_) {
      design = _design_;
    });

    expect(design.og).toBe(1.020);
    expect(design.ibu).toBe(40);
  });



});
