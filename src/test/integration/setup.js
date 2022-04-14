const hooks = require('require-extension-hooks');

require('jsdom-global')();
// next line is a workaround for https://github.com/vuejs/vue-test-utils/issues/936
window.Date = Date; 

hooks('vue').plugin('vue').push();
hooks(['vue','js']).plugin('babel').push();
