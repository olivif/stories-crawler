var prothomProvider = require("./parsers/prothom-provider");

module.exports = {
  getStories: getStories
};

// todo this needs a bit of work to support multiple parsers
function getStories(callback) {
    prothomProvider.getStories(callback);
}
