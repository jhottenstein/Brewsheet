/*global BeerDesign*/
'use strict';

describe('BeerDesign', function(){
  var beerDesign, props;
  beforeEach(function(){
    props = {name: 'Rye', style: 'Pale Ale', og: 1.055, ibu: 35, srm: 50};
  });

  it('constructor should assign and expose some properties', function() {
    beerDesign = new BeerDesign(props);
    expect(beerDesign.name).toEqual(props.name);
    expect(beerDesign.ibu).toEqual(props.ibu);
  });
  it('constructor should not fail if not given any arguments', function() {
    beerDesign = new BeerDesign();
    expect(beerDesign.name).toEqual(undefined);
    expect(beerDesign.ibu).toEqual(undefined);
  });
  it('should be able to calculate BU/GU', function() {
    beerDesign = new BeerDesign(props);
    expect(beerDesign.buGu()).toBeCloseTo(0.64,2);
  });
});