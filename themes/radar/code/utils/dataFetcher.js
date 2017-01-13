const SheetNotFoundError = require('../exceptions/sheetNotFoundError');
const ExceptionMessages = require('./exceptionMessages');

const DataFetcher = function (apiURL) {
    var self = {};

    self.fetch = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiURL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    return callback(JSON.parse(xhr.responseText));
                } else {
                    return callback(new SheetNotFoundError(ExceptionMessages.SHEET_NOT_FOUND));
                }
            }
        };
        xhr.send(null);
    };

    return self;
};

module.exports = DataFetcher;
