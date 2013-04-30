/*global element */
'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Beer Design Page', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/view1');
  });

  it('display BU/GU', function() {
    input('design.og').enter('2');
    input('design.ibu').enter('1000');
    expect(element('#bu_gu').count()).toBe(1);
    expect(element('#bu_gu').html()).toBe('1.00');

  });
  it('should round BU/GU ratio to 2 decimal places ', function() {
    input('design.og').enter('1.070');
    input('design.ibu').enter('60');
    expect(element('#bu_gu').html()).toBe('0.86');
  });

  it('should keep design values after moving to another tab', function() {
    var name = input('design.name'),
        style = input('design.style'),
        og = input('design.og'),
        ibu = input('design.ibu'),
        srm = input('design.srm');

    name.enter('Crab Creek Amber');
    style.enter('American Amber Ale');
    og.enter('1.070');
    ibu.enter('60');
    srm.enter(12);

    browser().navigateTo('#/hopBill');
    browser().navigateTo('#/beerDesign');

    expect(name.val()).toBe('Crab Creek Amber');
    expect(style.val()).toBe('American Amber Ale');
    expect(og.val()).toBe('1.070');
    expect(ibu.val()).toBe('60');
    expect(srm.val()).toBe('12');
  });

});
