/*jshint camelcase:false*/
'use strict';

describe('hop storage service', function() {
  var hopStorage, localStorage, $rootScope;

  beforeEach(module('brewsheetApp'));

  describe('Empty Local Storage Tests', function() {
    beforeEach(function() {
      module(function($provide) {
        localStorage = {};

        $provide.value('localStorage', localStorage);
      });
      inject(function(_hopStorage_, _$rootScope_) {
        hopStorage = _hopStorage_;
        $rootScope = _$rootScope_;
      });
    });

    it('should default to undefined', function() {
      expect(hopStorage.hopBill).toBe(undefined);
    });
//
//  it('should persist to localStorage', function() {
//    $rootScope.$apply(function() {
//      hopStorage.name = 'Jasper';
//      hopStorage.style = 'Sarsaparilla';
//      hopStorage.og = 1.020;
//      hopStorage.ibu = 10;
//      hopStorage.srm = 20;
//    });
//
//    expect(localStorage.beerDesign).toBe('{"name":"Jasper","style":"Sarsaparilla","og":1.02,"ibu":10,"srm":20}');
//  });
//});
//
//it('should use localStorage value if it exists', function() {
//  module(function($provide) {
//    localStorage = {
//      beerDesign: '{"name":"Jasper","style":"Sarsaparilla","og":1.02,"ibu":10,"srm":20}'
//    };
//
//    $provide.value('localStorage', localStorage);
//  });
//
//  inject(function(_hopStorage_) {
//    hopStorage = _hopStorage_;
//  });
//
//  expect(hopStorage.name).toBe('Jasper');
//  expect(hopStorage.style).toBe('Sarsaparilla');
//  expect(hopStorage.og).toBe(1.020);
//  expect(hopStorage.ibu).toBe(10);
//  expect(hopStorage.srm).toBe(20);
  });
});
