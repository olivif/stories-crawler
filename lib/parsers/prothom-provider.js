var crawler = require("./../crawler");
var prothomContent = require("./prothom-content");
var Q = require("q");

var prothomParser = require("./prothom");

module.exports = {
    getStories: getStories,
    getStoriesPromise: getStoriesPromise
};

function runAdditionalParser2(stories) {

    var promises = [];
    stories.forEach(function (story) {
        var prothomContentParser = prothomContent(story.source, story);
        promises.push(crawler.crawlUrlPromise(prothomContentParser, story));
    }, this);
    console.log("got " + promises.length + " promises");
    return Q.all(promises);
}

// todo this needs a bit of work to support multiple parsers
function getStories(max, callback) {

    crawler.crawlUrlPromise(prothomParser)
        .then(function (stories) {
            var storiesToSlice = 0;
            if (max !== -1) {
                storiesToSlice = Math.max(stories.length - max, 0);
            }

            console.log("Got " + stories.length + ", slicing to " + storiesToSlice);
            stories = stories.slice(storiesToSlice);
            console.log("New stories length = " + stories.length);

            runAdditionalParser2(stories)
                .then(function (updatedStories) {
                    console.log("got updated stories " + updatedStories.length);
                    callback(updatedStories);
                });
        });
}

function getStoriesPromise(max) {
    var deferred = Q.defer();

    getStories(max, function (data, error) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;
}
