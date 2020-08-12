
// import {add} from '../src/add.js'
// import assert from 'ava';

var add = require('../src/add');
var test = require('ava')
// var assert = require('assert')


// describe('add',  function() {
//     it('add(3,4) should be 7', function() {
//         assert.equal(add.add(3,4),7);
//     })
// });

test('add', t=> {
    if(add.add(3,4) ===7) {
        t.pass()
    }
})