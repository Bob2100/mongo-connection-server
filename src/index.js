import fruits from './model/fruits.js'
const regExp = new RegExp('function [a-zA-Z0-9_]+()')
const type = fruits._id.toString()
console.log(regExp.exec(type)[0].split(' ')[1])
