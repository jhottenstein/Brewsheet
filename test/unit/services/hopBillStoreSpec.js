/*jshint camelcase:false */
/*global HopBill:false, Hop, BeerDesign*/
'use strict';

describe('Hop Bill service', function () {
  var LOCAL_STORAGE_KEY = 'hopBill';
  var HopBillStore, localStorage;
  var mockBeerDesign, mockStore;
  var designIbu = 20;

  beforeEach(module('brewsheetApp'));

  describe('with empty local storage', function () {
    beforeEach(function () {
      module(function ($provide) {
        localStorage = {};
        $provide.value('localStorage', localStorage);

        mockBeerDesign = new BeerDesign({ibu: designIbu});
        mockStore = {
          get: function () {
            return mockBeerDesign;
          }
        };
        $provide.value('BeerDesignStore', mockStore);
      });
      inject(function (_HopBillStore_) {
        HopBillStore = _HopBillStore_;
      });
    });

    it('should default to an empty HopBill with the design ibus', function () {
      expect(HopBillStore.get()).toEqual(new HopBill({desiredIBUs: designIbu}));
    });


    it('should persist changes to localStorage', function () {
      var hopBill = HopBillStore.get();
      expect(hopBill).toEqual(new HopBill({desiredIBUs: designIbu}));

      hopBill.flavorHops.push(new Hop({name: 'happy'}));
      HopBillStore.store();
      var expectedJSON = '{"desiredIBUs":' + designIbu + ',"bitteringHop":{},"flavorHops":[{"name":"happy"}]}';

      expect(localStorage[LOCAL_STORAGE_KEY]).toBe(expectedJSON);
    });
  });


  it('should use localStorage value with design ibu', function () {
    module(function ($provide) {
      localStorage = {};

      localStorage[LOCAL_STORAGE_KEY] = '{"desiredIBUs":50,"bitteringHop":{},"flavorHops":[{"name":"happy"}]}';


      $provide.value('localStorage', localStorage);
      mockBeerDesign = new BeerDesign({ibu: designIbu});
      mockStore = {
        get: function () {
          return mockBeerDesign;
        }
      };
      $provide.value('BeerDesignStore', mockStore);
    });

    inject(function (_HopBillStore_) {
      HopBillStore = _HopBillStore_;
    });

    var expectedHopBill = new HopBill({desiredIBUs: designIbu,
                                        flavorHops: [new Hop({name: 'happy'})]
                                      });
    expect(HopBillStore.get()).toEqual(expectedHopBill);
  });

});
