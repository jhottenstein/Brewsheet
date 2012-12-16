'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Hop Bill Page', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/beer_design');
  });

  it('transfer og/ibu from beer design page', function() {
    input('og').enter('2');
    input('ibu').enter('1000');
    browser().navigateTo('../../app/index.html#/hop_bill');

    expect(element('#og').html()).toBe('2');
    expect(element('#ibu').html()).toBe('1000');

  });

});
