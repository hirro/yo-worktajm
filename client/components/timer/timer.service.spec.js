'use strict';

describe('Service: Timer', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));

  // instantiate service
  var Timer;
  beforeEach(inject(function (_Timer_) {
    Timer = _Timer_;
  }));

  it('should do something', function () {
    expect(!!Timer).toBe(true);
  });

});
