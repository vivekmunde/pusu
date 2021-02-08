'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/pusu.production.js');
} else {
  module.exports = require('./dist/pusu.development.js');
}
