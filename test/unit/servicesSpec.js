'use strict';

/* jasmine specs for services go here */

describe('design service', function() {
  var design;

  it('should get initial value from design service', function() {

//  module(function($provide) {
//    $provide.value('design', design);
//  };

    module('brewsheetApp');

    inject(function(_design_) {
      design = _design_;
    });

    expect(design.og).toBeUndefined;
  });

});
