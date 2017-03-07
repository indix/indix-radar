const sanitizeHtml = require('sanitize-html');
const showdown = require('showdown');
const _ = {
  forOwn: require('lodash/forOwn')
}

showdown.extension('targetlink', function() {
  return [{
    type: 'lang',
    regex: /\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\4[ \t]*)?\)\{\:target=(["'])(.*)\6}/g,
    replace: function(wholematch, linkText, url, a, b, title, c, target) {

      var result = '<a href="' + url + '"';

      if (typeof title != 'undefined' && title !== '' && title !== null) {
        title = title.replace(/"/g, '&quot;');
        title = showdown.helper.escapeCharacters(title, '*_', false);
        result += ' title="' + title + '"';
      }

      if (typeof target != 'undefined' && target !== '' && target !== null) {
        result += ' target="' + target + '"';
      }

      result += '>' + linkText + '</a>';
      return result;
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
      blip.name = sanitizeHtml(blip.name, restrictedOptions);
      blip.isNew = Boolean(blip.isNew);
      blip.ring = sanitizeHtml(blip.ring, restrictedOptions);
      blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions);

      return blip;
    };

    return self;
};

module.exports = InputSanitizer;
