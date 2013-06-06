/*global element,  xit */
'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Grain Bill Page', function () {

  var og = '1.050',
    ibu = '35';

  describe('with populated beer design', function () {
    beforeEach(function () {
      window.localStorage.clear();
      browser().navigateTo('/app/index.html#/beer_design');
      expect(element('#og').html()).toBe('');
      input('design.og').enter(og);
      browser().navigateTo('/app/index.html#/grain_bill');
    });

    it('should transfer og from beer design', function () {
      expect(element('#og').html()).toBe(og);

    });

    xit('should calculate base malt from design and stats', function () {
      var name = 'hopper';
      input('hopBill.bitteringHop.name').enter(name);
      var alphaAcidPercent = '6.3';
      input('hopBill.bitteringHop.alphaAcid').enter(alphaAcidPercent);
      var boilTime = '75';
      input('hopBill.bitteringHop.boilTime').enter(boilTime);

      expect(element('tbody tr:eq(0) td', 'table columns').count()).toBe(5);
      expect(element('tbody tr td:eq(0) input', 'Name value').val()).toBe(name);
      expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('1.5');
      expect(element('tbody tr td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
      expect(element('tbody tr td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
      expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe(ibu);

    });

    xit('should be able to add a flavor hop', function () {
      var name = 'flavor hopper';
      var amount = '3.0';
      var alphaAcidPercent = '2.3';
      var boilTime = '20';

      input('newHop.name').enter(name);
      input('newHop.amount').enter(amount);
      input('newHop.alphaAcid').enter(alphaAcidPercent);
      input('newHop.boilTime').enter(boilTime);

      expect(element('tbody tr', 'table rows').count()).toBe(2);
      element('input[type="Submit"]').click();
      expect(element('tbody tr', 'table rows').count()).toBe(3);

      expect(element('tbody tr:eq(1) td:eq(0) input', 'Name value').val()).toBe(name);
      expect(element('tbody tr:eq(1) td:eq(1) input', 'Amount value').val()).toBe(amount);
      expect(element('tbody tr:eq(1) td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
      expect(element('tbody tr:eq(1) td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
      expect(element('tbody tr:eq(1) td:eq(4)', 'IBUs value').html()).toBe('15');

    });


    it('should have a grain bill table header', function () {
      expect(element('thead tr th', 'table headers').count()).toBe(7);
      expect(element('thead tr th:eq(1)', 'Name header').html()).toBe('Name');
      expect(element('thead tr th:eq(2)', 'Amount header').html()).toBe('Amount');
      expect(element('thead tr th:eq(3)', 'SRM header').html()).toBe('SRM');
      expect(element('thead tr th:eq(4)', 'PPG header').html()).toBe('PPG');
      expect(element('thead tr th:eq(5)', 'Efficiency header').html()).toBe('Efficiency');
      expect(element('thead tr th:eq(6)', 'GUs header').html()).toBe('Gravity Units');
    });

    xit('should be able to remove a flavor hop', function () {
      var hopName = 'flavor hopper';
      var hopName2 = 'hop #2';

      input('newHop.name').enter(hopName);
      element('input[type="Submit"]').click();
      input('newHop.name').enter(hopName2);
      element('input[type="Submit"]').click();

      expect(element('tbody tr', 'table rows').count()).toBe(4);
      expect(element('tbody tr:eq(1) td:eq(0) input', 'Name value').val()).toBe(hopName);
      expect(element('tbody tr:eq(2) td:eq(0) input', 'Name value').val()).toBe(hopName2);
      element('tbody tr:eq(1) input[type="button"]').click();
      expect(element('tbody tr', 'table rows').count()).toBe(3);
      expect(element('tbody tr:eq(1) td:eq(0) input', 'Name value').val()).toBe(hopName2);

    });

    xit('should have a flavor hop placeholder row', function () {
      expect(element('tbody tr', 'table rows').count()).toBe(2);
    });

    xit('should reset the new hop values when the form is submitted', function () {
      input('newHop.name').enter('newbie');

      expect(element('tbody tr:last td:eq(0) input', 'submitted hop name').val()).toBe('newbie');
      element('input[type="Submit"]').click();
      expect(element('tbody tr:last td:eq(0) input', 'new hop name').val()).toBe('');
    });


    xit('should adjust bittering hop due to flavor hop addition', function () {
      var name = 'hopper';
      input('hopBill.bitteringHop.name').enter(name);
      var alphaAcidPercent = '6.3';
      input('hopBill.bitteringHop.alphaAcid').enter(alphaAcidPercent);
      var boilTime = '75';
      input('hopBill.bitteringHop.boilTime').enter(boilTime);

      input('newHop.name').enter('flavor hopper');
      input('newHop.amount').enter('3.0');
      input('newHop.alphaAcid').enter('2.3');
      input('newHop.boilTime').enter('20');

      element('input[type="Submit"]').click();

      expect(element('tbody tr td:eq(0) input', 'Name value').val()).toBe(name);
      expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('0.9');
      expect(element('tbody tr td:eq(2) input', 'Alpha Acid % value').val()).toBe(alphaAcidPercent);
      expect(element('tbody tr td:eq(3) input', 'Boil Time value').val()).toBe(boilTime);
      expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe('20');
    });

    xit('should adjust bittering hop due to changes in design IBUs', function () {
      browser().navigateTo('/app/index.html#/hop_bill');
      var name = 'hopper';
      input('hopBill.bitteringHop.name').enter(name);
      var alphaAcidPercent = '6.3';
      input('hopBill.bitteringHop.alphaAcid').enter(alphaAcidPercent);
      var boilTime = '75';
      input('hopBill.bitteringHop.boilTime').enter(boilTime);

      expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('1.5');
      expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe('35');

      browser().navigateTo('/app/index.html#/beer_design');
      input('design.ibu').enter('70');
      browser().navigateTo('/app/index.html#/hop_bill');

      expect(element('tbody tr td:eq(1)', 'Amount value').html()).toBe('3.0');
      expect(element('tbody tr td:eq(4)', 'IBUs value').html()).toBe('70');
    });
  });
});
