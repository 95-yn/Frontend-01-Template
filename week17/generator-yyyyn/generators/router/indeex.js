var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
    },

    method1: function () {
        console.log('method 1 just ran');
      },
      method2: function () {
        console.log('method 2 just ran');
      }
  });