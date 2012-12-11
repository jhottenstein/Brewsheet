'use strict';

/* jasmine specs for services go here */

describe('design service', function() {
  var design, localStorage;

  beforeEach(module('brewsheetApp'));

  it('should default to undefined', function() {
    module(function($provide) {
      localStorage = {
      };
  
      $provide.value('localStorage', localStorage);
    });
  
    inject(function(_design_) {
      design = _design_;
    });

    expect(design.og).toBe(undefined);
    expect(design.ibu).toBe(undefined);
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
