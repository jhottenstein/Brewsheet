/*jshint camelcase:false */
/*global HopBill:false, Hop*/
'use strict';

describe('Hop Bill service', function () {
  var HopBillStore, localStorage;

  beforeEach(module('brewsheetApp'));

  describe('with empty local storage', function () {
    beforeEach(function () {
      module(function ($provide) {
        localStorage = {};
        $provide.value('localStorage', localStorage);
        $provide.value('design', {ibu: 20});
      });
      inject(function (_HopBillStore_) {
        HopBillStore = _HopBillStore_;
      });
    });

    it('should default to an empty HopBill with the design ibus', function () {
      expect(HopBillStore.get()).toEqual(new HopBill({desiredIBUs:20}));
    });



    it('should persist changes to localStorage', function() {
      var hopBill = HopBillStore.get();
      expect(hopBill).toEqual(new HopBill({desiredIBUs:20}));

      hopBill.flavorHops.push(new Hop({name: 'happy'}));
      HopBillStore.store();
      var expectedJSON = '{"desiredIBUs":20,"bitteringHop":{},"flavorHops":[{"name":"happy"}]}';
      expect(localStorage.hopStorage).toBe(expectedJSON);
    });
  });


  it('should use localStorage value with design ibu', function () {
    module(function ($provide) {
      localStorage = {
        hopStorage: '{"desiredIBUs":50,"bitteringHop":{},"flavorHops":[{"name":"happy"}]}'
      };

      $provide.value('localStorage', localStorage);
      $provide.value('design', {ibu: 20});
    });

    inject(function (_HopBillStore_) {
      HopBillStore = _HopBillStore_;
    });

    var expectedHopBill = new HopBill({desiredIBUs: 20,
                                        flavorHops: [new Hop({name: 'happy'})]
                                      });
    expect(HopBillStore.get()).toEqual(expectedHopBill);
  });

});
