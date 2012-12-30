'use strict';

describe('localStorage service', function() {
  beforeEach(module('brewsheetApp'));


  it('should default to undefined', function() {
    inject(function(localStorage) {
      expect(localStorage).toBe(window.localStorage);
    });
  });

});
