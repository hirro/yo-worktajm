/*globals expect, beforeEach, describe, it, inject */

'use strict';

describe('Service: worktajm.util', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));

  var WorktajmUtil;
  beforeEach(inject(function (_WorktajmUtil_) {
    WorktajmUtil = _WorktajmUtil_;
  }));

  describe('', function () {
    it('should calculate time difference correctly 1', function () {
      expect(
        WorktajmUtil.duration({
          startTime: '2014-10-19T22:40:46.000Z',
          endTime: '2014-10-19T22:40:47.613Z'
        })
      ).toBe('0:00:01');
    });

    it('should calculate time difference correctly 2', function () {
      expect(
        WorktajmUtil.duration({
          startTime: '2014-10-19T22:59:40.770Z',
          endTime: '2014-10-19T23:00:47.499Z'
        })
      ).toBe('0:01:06');
    });

    it('should calculate time difference in milliseconds correctly', function () {
      expect(
        WorktajmUtil.durationInMs({
          startTime: '2014-10-19T22:59:40.770Z',
          endTime: '2014-10-19T23:00:47.499Z'
        })
      ).toBe(66729);
    });

    it('should build a 2 (rows) x 3 (columns) matrix with 0 values', function () {
      expect(WorktajmUtil.buildMatrix(2, 3)).toEqual([[0, 0, 0], [0, 0, 0]]);
    });

  });
});
