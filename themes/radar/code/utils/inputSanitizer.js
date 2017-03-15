const sanitizeHtml = require('sanitize-html');
const showdown = require('showdown');
const _ = {
  forOwn: require('lodash/forOwn')
}

showdown.extension('targetlink', function() {
  return [{
    type: 'html',
    filter: function (text) {
        return (''+text).replace(/<a\s+href=/gi, '<a target="_blank" href=');
    }
  }];
});

const InputSanitizer = function () {
    var relaxedOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul',
            'br', 'p', 'u'],
        allowedAttributes: {
            'a': ['href']
        }
    };

    var restrictedOptions = {
        allowedTags: [],
        allowedAttributes: {},
        textFilter: function(text) {
              return text.replace(/&amp;/, '&');
            }
    };

    function trimWhiteSpaces(blip) {
      var processedBlip = {};
      _.forOwn(blip, function(value, key) {
          if(typeof(value) === 'boolean') {
              processedBlip[key.trim()] = value;
          } else {
              processedBlip[key.trim()] = value.trim();
          }
      });
      return processedBlip;
    }

    var self = {};
    self.sanitize = function (rawBlip) {
      const converter = new showdown.Converter({extensions: ['targetlink']});
      var blip = trimWhiteSpaces(rawBlip);
      blip.description = converter.makeHtml(sanitizeHtml(blip.description, relaxedOptions));
      blip.opinion = (blip.opinion) ? converter.makeHtml(sanitizeHtml(blip.opinion, relaxedOptions)) : '';
      blip.name = sanitizeHtml(blip.name, restrictedOptions);
      blip.isNew = Boolean(blip.isNew);
      blip.ring = sanitizeHtml(blip.ring, restrictedOptions);
      blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions);

      return blip;
    };

    return self;
};

module.exports = InputSanitizer;
