'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/beer_design");
  });


  describe('Beer Design view', function() {

    beforeEach(function() {
      browser().navigateTo('#/beer_design');
    });


    it('should render beer design when user navigates to /beer_design', function() {
      expect(element('[ng-view] legend').text()).
        toMatch(/Beer Design/);
    });

  });


  describe('Hop Bill view', function() {

    beforeEach(function() {
      browser().navigateTo('#/hop_bill');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] legend').text()).
        toMatch(/Hop Bill/);
    });

  });
});
