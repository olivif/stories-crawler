var prothomProvider = require("./parsers/prothom-provider");

var provider;

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

    var provider = prothomProvider;
    var maxStoriesPerParser = getMaxStories();

    provider.getStoriesPromise(maxStoriesPerParser)
        .then(function (stories) {
            callback(stories);
        });
}
