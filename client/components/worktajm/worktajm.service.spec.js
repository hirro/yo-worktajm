'use strict';

describe('Service: worktajm', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));

  // instantiate service
  var worktajm;
  beforeEach(inject(function (_worktajm_) {
    worktajm = _worktajm_;
  }));

  it('should do something', function () {
    expect(!!worktajm).toBe(true);
  });

});
