const _ = require('../lib/es6-functional.js')

const match = _.curry((expr, str) => str.match(expr))
const filter = _.curry((f, ary) => ary.filter(f))
const map = _.curry((f, ary) => ary.map(f))

const hasNumber = match(/\d+/)

const findNumberInArray = filter(hasNumber)
console.log("findNumberInArray(['aaaa', 'nnnn'])", findNumberInArray(['aaaa', 'nnnn']))
console.log("findNumberInArray(['aaaa', 'nnnn1'])", findNumberInArray(['aaaa', 'nnnn1']))


const squareAll = map(x => x * x)
console.log("squareAll([1,2,3])", squareAll([1,2,3]))

const findEvenOfArray = filter(x => !(x % 2))
console.log(findEvenOfArray([1,2,3]))
