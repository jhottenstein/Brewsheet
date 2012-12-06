'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Beer Design Page', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/view1');
  });

  it('display BU/GU', function() {
    input('og').enter('2');
    input('ibu').enter('1000');
    expect(element('#bu_gu').count()).toBe(1);
    expect(element('#bu_gu').html()).toBe('1');

  });

});
