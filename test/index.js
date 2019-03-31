const should = require('should');

describe('template', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  const objKeys = ['a', 'b', 'c'];
  const objValues = [1, 2, 3];

  describe('Object.keys()', () => {
    it('遍历对象 返回对象所有的key数组', () => {
      Object.keys(obj).should.be.eql(objKeys);
    });
  });

  describe('Object.values()', () => {
    it('遍历对象 返回对象所有的value 数组', () => {
      Object.values(obj).should.be.eql(objValues);
    });
  });
});
