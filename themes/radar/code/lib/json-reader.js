/**
 * Indix Tech-Radar
 *
 * @description JSON reader (reads all JSON files in give directory).
 * @author GP <ganeshp@indix.com>
 * @version 1.0.0
 */

/**
 * Module dependencies.
 */

const dir = require('node-dir');

/**
 * Module functions.
 */

/**
 * Reads all JSONs in given directory and returns an array of all data put together.
 *
 * @return {Array} array of JSONs.
 * @api public
 */

function readJsonFiles(path) {
    let jsonContent = [];
    return new Promise(function (resolve, reject) {
        dir.readFiles(path, {
            match: /.json$/,
            recursive: false
        }, function (err, content, next) {
            if (err) reject(err);
            jsonContent.push(JSON.parse(content));
            next();
        }, function (err, files) {
            if (err) reject(err);
            resolve(jsonContent);
        });
    });
}

/**
 * Module exports.
 */

module.exports = readJsonFiles;
