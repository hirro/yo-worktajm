'use strict';

describe('Service: worktajm', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));
  beforeEach(module('socketMock'));  

  // instantiate service
  var Worktajm;
  beforeEach(inject(function (_Worktajm_) {
    Worktajm = _Worktajm_;
  }));

  it('should do something', function () {
    expect(!!Worktajm).toBe(true);
  });

});
