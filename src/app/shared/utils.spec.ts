import { Utils } from './utils';

describe('Utils', () => {
  it('should create date from a valid string', () => {
    expect(Utils.convertYYYYMMDDToDate('20210111')).toEqual(new Date(2021, 0, 11));
  });

  it('should create throw error for an invalid length string', () => {
    expect(
      () => {
        Utils.convertYYYYMMDDToDate('2021011');
      }).toThrowError('Invalid date string');
  });

  it('should create throw error for an non numeric string', () => {
    expect(
      () => {
        Utils.convertYYYYMMDDToDate('abcdefgh');
      }).toThrowError('Invalid date string');
  });

  it('should create correct string from a date', () => {
    expect(Utils.convertDateToYYYYMMDD(new Date(2021, 0, 9))).toEqual('20210109');
  });

  it('should create add the right number of preceding zeroes to a small number', () => {
    expect(Utils.precedingZeroes(2, 5)).toEqual('00002');
  });

  it('should create not add preceding zeroes to large numbers', () => {
    expect(Utils.precedingZeroes(123456, 5)).toEqual('123456');
  });

});
