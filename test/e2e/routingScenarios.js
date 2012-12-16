'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Brewsheet Routing', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to /beer_design when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe('/beer_design');
  });

  it('should render Beer Design when user navigates to /beer_design', function() {
    browser().navigateTo('#/beer_design');
    expect(element('[ng-view] legend').text()).toMatch(/Beer Design/);
  });

  it('should render Hop Bill when user navigates to /hop_bill', function() {
    browser().navigateTo('#/hop_bill');
    expect(element('[ng-view] legend').text()).toMatch(/Hop Bill/);
  });

});
