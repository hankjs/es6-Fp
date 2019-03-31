const _ = {
  /**
   * 遍历数组
   * @param {Array} arr 遍历的数组
   * @param {Function} fn 对 arr 每一项执行
   */
  forEach (arr, fn) {
    for (const i of arr) {
      fn(i)
    }
  },

  map (arr, fn) {
    const result = []
    for (const val of arr) {
      result.push(fn(val))
    }
    return result
  },

  filter (arr, fn) {
    const result = []
    for (const val of arr) {
      fn(val) ? result.push(val) : undefined
    }
    return result
  },

  concatAll (arr) {
    const result = []
    for (const val of arr) {
      result.push.apply(result, val)
    }
    return result
  },

  reduce (arr, fn, initialVal) {
    let accumulator = initialVal == null ? arr[0] : initialVal
    if (initialVal === undefined) {
      for (let i = 1; i < arr.length; i++) {
        accumulator = fn(accumulator, arr[i])
      }
    } else {
      for (const val of arr) {
        accumulator = fn(accumulator, val)
      }
    }
    return accumulator
  },

  zip (leftArr, rightArr, fn) {
    const result = []

    for (let i = 0; i < Math.min(leftArr.length, rightArr.length); i++) {
      result.push(fn(leftArr[i], rightArr[i]))
    }
    
    return result
  },

  /**
   * 遍历对象
   * @param {Object} obj 遍历的对象
   * @param {Function} fn 对 obj 每一项执行的 回调
   */
  forEachObject (obj, fn) {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        fn(k, obj[k])
      }
    }
  },

  unless (predicate, fn) {
    if (!predicate) fn()
  },

  times (times, fn) {
    for (let i = 0; i < times; i++) {
      fn(i)
    }
  },

  count (num) {
    let count = num == null ? -1 : num
    return () => ++count
  },

  every (arr, fn) {
    for (const val of arr) {
      if (!fn(val)) return false
    }
    return true
  },

  some (arr, fn) {
    for (const val of arr) {
      if (fn(val)) return false
    }
    return true
  },

  /**
   * 执行函数并打印 参数
   * @param {*} val cb 使用的参数
   */
  tap (val) {
    return fn => (
      typeof(fn) === 'function' && fn(val), console.log(val)
    )
  },

  identity (it) {
    console.log(it)
    return it
  },

  /**
   * 使调用时传入多个参数的函数，最后只保留一个参数传入
   * @param {Function} fn 包装的函数
   */
  unary (fn) {
    return fn.length === 1
      ? fn
      : x => fn(x)
  },

  /**
   * 只能调用一次的函数
   * @param {Function} fn 被包装的函数
   */
  once (fn) {
    let done = false
    return function() {
      return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
  },

  /**
   * 缓存 被封装函数的调用结果
   */
  memorized (fn) {
    const memorizeList = {}
    return function() {
      const arg = JSON.stringify(arguments)
      return memorizeList[arg] || (memorizeList[arg] = fn.apply(null, arguments))
    }
  },

  curry (fn) {
    if (!typeof(fn) === 'function')
      throw new Error('No function provided')

    return function curriedFn(...args) {
      if (args.length < fn.length) {
        return function() {
          return curriedFn.apply(null, args.concat([].slice.call(arguments)))
        }
      }
      return fn.apply(null, args)
    }
  },

  curryRight (fn) {
    if (!typeof(fn) === 'function')
      throw new Error('No function provided')

    return function curriedFn(...args) {
      if (args.length < fn.length) {
        return function() {
          return curriedFn.apply(null, args.concat([].slice.call(arguments)))
        }
      }
      args.reverse()
      return fn.apply(null, args)
    }
  },

  partial (fn, ...partialArgs) {
    let args = partialArgs
    return function(...fullArguments) {
      for (let i = 0, arg = 0; i < args.length && arg < fullArguments.length; i++, arg++) {
        if (args[i] === undefined) {
          args[i] = fullArguments[arg]
        }
      }
      return fn.apply(null, args)
    }
  },

  compose (...fns) {
    return val => {
      var res = val
      for (let i = fns.length - 1; i > -1; i--) {
        res = fns[i](res)
      }
      return res
    }
  },

  pipe (...fns) {
    return val => {
      var res = val
      for (let i = 0; i < fns.length; i++) {
        res = fns[i](res)
      }
      return res
    }
  },
}

module.exports = _