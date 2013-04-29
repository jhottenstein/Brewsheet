/*jshint camelcase:false */
/*global HopBill:false */
'use strict';

describe('hop storage service', function () {
  var hopStorage, localStorage, $rootScope;

  beforeEach(module('brewsheetApp'));

  describe('Empty Local Storage Tests', function () {
    beforeEach(function () {
      module(function ($provide) {
        localStorage = {};

        $provide.value('localStorage', localStorage);
      });
      inject(function (_hopStorage_, _$rootScope_) {
        hopStorage = _hopStorage_;
        $rootScope = _$rootScope_;
      });
    });

    it('should default to undefined', function () {
      expect(hopStorage.hopBill).toBe(undefined);
    });

    it('should persist to localStorage', function() {
      $rootScope.$apply(function() {
        hopStorage.hopBill = new HopBill({desiredIBUs:20});
      });

      expect(localStorage.hopStorage).toBe('{"hopBill":{"desiredIBUs":20,"bitteringHop":{},"flavorHops":[]}}');
    });
  });


  it('should use localStorage value if it exists', function () {
    module(function ($provide) {
      localStorage = {
        hopBill: '{"hopBill":{"desiredIBUs":20,"bitteringHop":{},"flavorHops":[]}}' 
      };

      $provide.value('localStorage', localStorage);
    });

    inject(function (_hopStorage_) {
      hopStorage = _hopStorage_;
    });

    expect(hopStorage.hopBill).toBe('Jasper');
    expect(hopStorage.style).toBe('Sarsaparilla');
    expect(hopStorage.og).toBe(1.020);
    expect(hopStorage.ibu).toBe(10);
    expect(hopStorage.srm).toBe(20);
  });

});
