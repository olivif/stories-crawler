var prothomProvider = require("./parsers/prothom-provider");

module.exports = {
  getStories: getStories
};

function getMaxStories() {
  var max = process.env.MAX_STORIES;
  console.log(" = " + max)
  if (isNaN(max)) {
    return -1;
  }
  return max;
}

// todo this needs a bit of work to support multiple parsers
function getStories(callback) {
    
    var maxStoriesPerParser = getMaxStories();
    
    prothomProvider.getStories(maxStoriesPerParser, callback);
}
