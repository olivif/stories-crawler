var crawler = require("crawlerx");
var Q = require("q");

var settings = { decode: "utf-8", deep: 1, concurrency: 1 };

module.exports = {
    crawlUrl: crawlUrl,
    crawlUrlPromise: crawlUrlPromise
};

function crawlUrl(parser, callback) {

    console.log("crawling url " + parser.url);

    crawler.request(
        parser.url,
        settings,
        function (error, $, body, parsedUrl, resp) {
            var parserData = parser.parser($);
            callback(parserData);
        }
        );
}

function crawlUrlPromise(parser) {
    var deferred = Q.defer();

    crawlUrl(parser, function (data, error) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;
}