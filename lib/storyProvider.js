var prothomProvider = require("./parsers/prothom-provider");
var Q = require("q");

var providers = [];

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

function getStoriesFromAllProviders(providers, maxStoriesPerParser) {

    var promises = [];
    providers.forEach(function (provider) {
        console.log("Getting data from provider " + provider.name);
        var promise = provider.getStoriesPromise(maxStoriesPerParser);
        promises.push(promise);
    }, this);
    
    return Q.all(promises);
}

// todo this needs a bit of work to support multiple parsers
function getStories(callback) {

    // Initialize providers
    providers.push(prothomProvider);
    
    // Initialize max stories
    var maxStoriesPerParser = getMaxStories();

    // Get stories from all providers
    getStoriesFromAllProviders(providers, maxStoriesPerParser)
        .then(function (stories) {
            callback(stories);
        });
}
