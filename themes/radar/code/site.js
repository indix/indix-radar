require('./stylesheets/base.scss');
const factory = require('./utils/factory');

// Pick and parse JSON data from page post data.
var data = JSON.parse(document.querySelector('pre').innerHTML);
// Build the radar!
factory.RadarBuilder(data).init().build();
