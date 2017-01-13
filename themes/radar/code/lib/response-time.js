/**
 * Indix Tech-Radar
 *
 * @description X-Response-Time Middleware.
 * @author GP <ganeshp@indix.com>
 * @version 1.0.0
 */

/**
 * Module functions.
 */

/**
 * Add the time taken to finish serving each request.
 *
 * @return {Function} middleware.
 * @api public
 */

function responseTime() {
  return function *responseTimeGenerator(next) {
    // Set 'X-Response-Time' header.
    const start = Date.now();
    yield* next;
    const delta = Math.ceil(Date.now() - start);
    this.set('X-Response-Time', delta + 'ms');
  };
}

/**
 * Module exports.
 */

module.exports = {
    responseTimeMiddleware: responseTime
};