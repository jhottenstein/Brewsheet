'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Hop Bill Page', function() {

  beforeEach(function() {
  });

  it('should transfer og/ibu from beer design page', function() {
    browser().navigateTo('../../app/index.html#/beer_design');
    input('og').enter('2');
    input('ibu').enter('1000');
    browser().navigateTo('../../app/index.html#/hop_bill');

    expect(element('#og').html()).toBe('2');
    expect(element('#ibu').html()).toBe('1000');

  });

  it('should have a hop bill table header', function() {
    browser().navigateTo('../../app/index.html#/hop_bill');
    expect(element('thead tr th', 'table headers').count()).toBe(5);
    expect(element('thead tr th:eq(0)', 'Name header').html()).toBe('Name');
    expect(element('thead tr th:eq(1)', 'Amount header').html()).toBe('Amount');
    expect(element('thead tr th:eq(2)', 'Alpha Acid % header').html()).toBe('Alpha Acid %');
    expect(element('thead tr th:eq(3)', 'Boil Time header').html()).toBe('Boil Time');
    expect(element('thead tr th:eq(4)', 'IBUs header').html()).toBe('IBUs');
  });

  it('should bittering hop amount from design and alpha acid %', function() {
    browser().navigateTo('../../app/index.html#/beer_design');
    input('ibu').enter('35');

    browser().navigateTo('../../app/index.html#/hop_bill');
    var name = 'hopper';
    input('hopName').enter(name);
    var alphaAcidPercent = '6.3';
    input('alphaAcid').enter(alphaAcidPercent);
    var boilTime = '75';
    input('boilTime').enter(boilTime);

    expect(element('tbody tr td', 'table columns').count()).toBe(5);
    expect(element('tbody tr td:eq(0) input', 'Name value').val()).toBe(name);
    expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('1.9');
    expect(element('tbody tr td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
    expect(element('tbody tr td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
    expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe('35');

  });

});
