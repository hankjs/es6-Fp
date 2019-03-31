const sinon = require('sinon')
const should = require('should')
require('should-sinon');

const _ = require('../lib/es6-functional.js')

describe('es6-functional', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  const letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const objArr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}, {f: 6}, {g: 7}, {h: 8}]
  const nestArr = [[1], [2], [3], [4], [5], [6], [7], [8]]
  const strArr = ['1', '2', '3', '4', '5', '6', '7', '8']
  const arrEven = [2, 4, 6, 8]
  const arrDouble = [2, 4, 6, 8, 10, 12, 14, 16]
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8
  }
  const NaN2Arr = [1, 3, NaN, NaN]
  const NaN3Arr = [NaN, NaN, NaN, 1, 3]
  const apressBooks = [
    {
      "id": 111,
      "title": "C# 6.0",
      "author": "ANDREW TROELSEN",
      "rating": [4.7],
      "reviews": [{ good: 4, excellent: 12 }]
    },
    {
      "id": 222,
      "title": "Efficient Learning Machines",
      "author": "Rahul Khanna",
      "rating": [4.5],
      "reviews": []
    },
    {
      "id": 333,
      "title": "Pro AngularJS",
      "author": "Adam Freeman",
      "rating": [4.0],
      "reviews": []
    },
    {
      "id": 444,
      "title": "Pro ASP.NET",
      "author": "Adam Freeman",
      "rating": [4.2],
      "reviews": [{ good: 14, excellent: 12 }]
    }
  ];

  describe('_.forEach(arr, fn)', () => {
    it('callCount 3 for arr has 3 item', () => {
      const cb = sinon.spy()

      _.forEach(arr, cb)

      cb.should.have.callCount(8)
    });
  });

  describe('_.forEachObject(obj, fn)', () => {
    it('callCount 3 for obj has 3 item', () => {
      const cb = sinon.spy()

      _.forEachObject(obj, cb)

      cb.should.have.callCount(8)
    });
  });

  describe('_.unless(bool, fn)', () => {
    it('only run trueCb for [1 % 2, 2 % 2]', () => {
      const trueCb = sinon.spy()
      const falseCb = sinon.spy()

      _.unless(true, trueCb)
      _.unless(false, falseCb)

      trueCb.should.have.callCount(0)
      falseCb.should.have.callCount(1)
    });
  });

  describe('_.times(times, fn)', () => {
    it('callCount 100 for 100', () => {
      const cb = sinon.spy()

      _.times(100, cb)

      cb.should.have.callCount(100)
    });
  });

  describe('_.every(arr, fn)', () => {
    it('callCount 1 for NaNArr2, callCount 4 for NaNArr3', () => {
      const cb2 = sinon.spy(isNaN)
      const cb3 = sinon.spy(isNaN)

      _.every(NaN2Arr, cb2)
      _.every(NaN3Arr, cb3)

      cb2.should.have.callCount(1)
      cb3.should.have.callCount(4)
    });
  });

  describe('_.some(arr, fn)', () => {
    it('callCount 3 for NaNArr2, callCount 1 for NaNArr3', () => {
      const cb2 = sinon.spy(isNaN)
      const cb3 = sinon.spy(isNaN)

      _.some(NaN2Arr, cb2)
      _.some(NaN3Arr, cb3)

      cb2.should.have.callCount(3)
      cb3.should.have.callCount(1)
    });
  });

  describe('_.unary(fn)', () => {
    it('函数传多个参数，最后调用时只传入一个', () => {
      const arg = (x, y) => {
        if (y) return y
        return x
      }
      const cb = _.unary(arg)

      cb.length.should.be.eql(1)
      cb(1).should.be.eql(1)
      cb(1, 2).should.be.eql(1)
    });
  });

  describe('_.once(fn)', () => {
    it('生成只能调用一次的函数', () => {
      const cb = sinon.spy(x => x)
      const onceCb = _.once(cb)

      onceCb(1)
      onceCb(2)

      cb.should.have.callCount(1)
    });
  });

  describe('_.memorized(fn)', () => {
    it('生成缓存函数调用结果', () => {
      const add10 = x => x + 10
      const cb = sinon.spy(add10)
      const fastAdd10 = _.memorized(cb)

      fastAdd10(1).should.be.eql(11)
      fastAdd10(1).should.be.eql(11)
      fastAdd10(2).should.be.eql(12)
      fastAdd10(2).should.be.eql(12)
      cb.should.have.callCount(2)
    });
  });

  describe('_.memorized(fn)', () => {
    it('计算 800! 对比测试缓存优化', () => {
      // 递归计算乘阶
      const factorial = (n) => {
        if (n === 0) return 1
        return n * factorial(n - 1)
      }
      const fastFactorial = _.memorized(factorial)

      console.time('origin')
      factorial(800)
      console.timeEnd('origin')

      console.time('fast')
      fastFactorial(800)
      console.timeEnd('fast')
    });
  });

  describe('_.map(arr, fn)', () => {
    it('遍历arr 返回 arrDouble', () => {
      _.map(arr, x => x * 2).should.be.eql(arrDouble)
    });
  });

  describe('_.filter(arr, fn)', () => {
    it('筛选数组 留下 双数', () => {
      _.filter(arr, x => !(x % 2)).should.be.eql(arrEven)
    });
  });

  describe('_.concatAll(arr)', () => {
    it('浅层 摊平数组', () => {
      _.concatAll(nestArr).should.be.eql(arr)
    });
  });

  describe('_.reduce(arr)', () => {
    it('累加', () => {
      _.reduce(arr, (x, y) => x + y).should.be.eql(36)
      _.reduce(arr, (x, y) => x + y, 10).should.be.eql(46)
    });
  });

  describe('_.zip(arr)', () => {
    it('合并', () => {
      _.zip(letterArr, arr, (x, y) => ({[x]: y})).should.be.eql(objArr)
    });
  });

  describe('_.curry(arr)', () => {
    it('curry 化', () => {
      const add = (x, y) => x + y
      const multiply = (x, y, z) => x * y * z
      const addCurry = _.curry(add)
      const increment = addCurry(1)
      const add10 = addCurry(10)

      increment(2).should.be.eql(3)
      add10(2).should.be.eql(12)
      _.curry(multiply)(11)(12)(13).should.be.eql(1716)
    });
  });

  describe('_.curryRight(arr)', () => {
    it('curryRight 数学运算', () => {
      const addAndMul = (x, y, z) => x + y * z
      const curryAddAndMul = _.curryRight(addAndMul)
      const mul10ThenAdd = curryAddAndMul(10)
      const mul10ThenAdd10 = mul10ThenAdd(10)
      
      mul10ThenAdd10(2).should.be.eql(2 + 10 * 10)
    });

    it('curryFilter 函数测试', () => {
      const curryFilter = _.curryRight(_.filter)
      const filterEven = curryFilter(x => !(x % 2))
      
      filterEven(arr).should.be.eql(arrEven)
    });
  });

  describe('_.compose(...fns)', () => {
    it('组合函数 数学应用 组合 2个函数', () => {
      const add10 = x => x + 10
      const multiply10 = x => x * 10
      const add10ThenMul10 = _.compose(multiply10, add10)
      const mul10ThenAdd10 = _.compose(add10, multiply10)

      add10ThenMul10(2).should.be.eql(120)
      mul10ThenAdd10(2).should.be.eql(30)
    });

    it('组合 3个函数', () => {
      const add10 = x => x + 10
      const multiply10 = x => x * 10
      const isEven = x => !(x % 2)
      const add10ThenMul10IsEven = _.compose(isEven, multiply10, add10)
      const mul10ThenAdd10IsEven = _.compose(isEven, add10, multiply10)

      add10ThenMul10IsEven(2).should.be.eql(true)
      add10ThenMul10IsEven(3).should.be.eql(true)
      mul10ThenAdd10IsEven(2).should.be.eql(true)
      mul10ThenAdd10IsEven(3).should.be.eql(true)
    });

    it('结合律测试', () => {
      const add1 = x => x + 1
      const power3nd = x => x * x * x
      const isEven = x => !(x % 2)

      _.compose(add1, _.compose(power3nd, isEven))(2).should.be.eql(_.compose(add1, power3nd, _.compose(isEven))(2))
    });
  });

  describe('_.pipe(...fns)', () => {
    it('管道函数 数学应用 管道 2个函数', () => {
      const add1 = x => x + 1
      const power2nd = x => x * x
      const add1ThenPower2nd = _.pipe(add1, power2nd)
      const power2ndThenAdd1 = _.pipe(power2nd, add1)

      add1ThenPower2nd(2).should.be.eql(9)
      power2ndThenAdd1(2).should.be.eql(5)
    });

    it('管道 3个函数', () => {
      const add1 = x => x + 1
      const power3nd = x => x * x * x
      const isEven = x => !(x % 2)
      const add1ThenPower3ndIsEven = _.pipe(add1, power3nd, isEven)
      const power3ndThenAdd1IsEven = _.pipe(power3nd, add1, isEven)

      add1ThenPower3ndIsEven(2).should.be.eql(false)
      add1ThenPower3ndIsEven(3).should.be.eql(true)
      power3ndThenAdd1IsEven(2).should.be.eql(false)
      power3ndThenAdd1IsEven(3).should.be.eql(true)
    });

    it('结合律测试', () => {
      const add1 = x => x + 1
      const power3nd = x => x * x * x
      const isEven = x => !(x % 2)

      _.pipe(add1, _.pipe(power3nd, isEven))(2).should.be.eql(_.pipe(add1, power3nd, _.pipe(isEven))(2))
    });
  });

  describe('_.identity(it)', () => {
    it('恒等打印', () => {
      const add1 = x => x + 1
      const identity = sinon.spy(_.identity)

      _.pipe(add1, identity, add1, identity)(1).should.be.eql(3)
      identity.should.have.callCount(2)
    })
  })
});

