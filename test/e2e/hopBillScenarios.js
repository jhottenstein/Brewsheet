'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Hop Bill Page', function() {

  var og = '2',
      ibu = '35';

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/beer_design');
    input('og').enter(og);
    input('ibu').enter(ibu);

    browser().navigateTo('../../app/index.html#/hop_bill');
  });

  it('should transfer og/ibu from beer design page', function() {
    expect(element('#og').html()).toBe(og);
    expect(element('#ibu').html()).toBe(ibu);

  });

  it('should have a hop bill table header', function() {
    expect(element('thead tr th', 'table headers').count()).toBe(6);
    expect(element('thead tr th:eq(1)', 'Name header').html()).toBe('Name');
    expect(element('thead tr th:eq(2)', 'Amount header').html()).toBe('Amount');
    expect(element('thead tr th:eq(3)', 'Alpha Acid % header').html()).toBe('Alpha Acid %');
    expect(element('thead tr th:eq(4)', 'Boil Time header').html()).toBe('Boil Time');
    expect(element('thead tr th:eq(5)', 'IBUs header').html()).toBe('IBUs');
  });

  it('should calculate bittering hop amount from design and alpha acid %', function() {
    var name = 'hopper';
    input('bitteringHop.name').enter(name);
    var alphaAcidPercent = '6.3';
    input('bitteringHop.alphaAcid').enter(alphaAcidPercent);
    var boilTime = '75';
    input('bitteringHop.boilTime').enter(boilTime);

    expect(element('tbody tr:eq(0) td', 'table columns').count()).toBe(5);
    expect(element('tbody tr td:eq(0) input', 'Name value').val()).toBe(name);
    expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('1.9');
    expect(element('tbody tr td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
    expect(element('tbody tr td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
    expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe(ibu);

  });

  it('should have a flavor hop row', function() {
    var name = 'flavor hopper';
    input('newHop.name').enter(name);
    var amount = '3.0';
    input('newHop.amount').enter(amount);
    var alphaAcidPercent = '2.3';
    input('newHop.alphaAcid').enter(alphaAcidPercent);
    var boilTime = '20';
    input('newHop.boilTime').enter(boilTime);

    element('input[type="Submit"]').click();

    expect(element('tbody tr', 'table rows').count()).toBe(3);

    expect(element('tbody tr:eq(1) td:eq(0) input', 'Name value').val()).toBe(name);
    expect(element('tbody tr:eq(1) td:eq(1) input', 'Amount value').val()).toBe(amount);
    expect(element('tbody tr:eq(1) td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
    expect(element('tbody tr:eq(1) td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
    expect(element('tbody tr:eq(1) td:eq(4)', 'IBUs value').html()).toBe('20');

  });

  it('should have a flavor hop placeholder row', function() {
    expect(element('tbody tr', 'table rows').count()).toBe(2);
  });

  it('should reset the new hop values when the form is submitted', function() {
    input('newHop.name').enter('newbie');

    expect(element('tbody tr:last td:eq(0) input', 'submitted hop name').val()).toBe('newbie');
    element('input[type="Submit"]').click();
    expect(element('tbody tr:last td:eq(0) input', 'new hop name').val()).toBe('');
  });


  it('should adjust bittering hop due to flavor hop addition', function() {
    var name = 'hopper';
    input('bitteringHop.name').enter(name);
    var alphaAcidPercent = '6.3';
    input('bitteringHop.alphaAcid').enter(alphaAcidPercent);
    var boilTime = '75';
    input('bitteringHop.boilTime').enter(boilTime);

    input('newHop.name').enter('flavor hopper');
    input('newHop.amount').enter('3.0');
    input('newHop.alphaAcid').enter('2.3');
    input('newHop.boilTime').enter('20');

    element('input[type="Submit"]').click();

    expect(element('tbody tr td:eq(0) input', 'Name value').val()).toBe(name);
    expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('0.8');
    expect(element('tbody tr td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
    expect(element('tbody tr td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
    expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe('15');


  });

});
