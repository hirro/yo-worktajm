'use strict';

describe('Service: TpsConstants', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // instantiate service
  var TpsConstants;
  beforeEach(inject(function (_TpsConstants_) {
    TpsConstants = _TpsConstants_;
  }));

  it('should do something', function () {
    expect(!!TpsConstants).toBe(true);
  });

});
