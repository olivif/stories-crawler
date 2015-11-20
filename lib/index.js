/**
* Test web crawler service
*/
var crawler = require("crawlerx");

var url = "http://bdnews24.com/";
var settings = { decode:"utf-8", deep:1, concurrency:1 };

crawler.request(
	url, 
	settings,
	function(error, $, body, url, resp) {

		console.log("Requesting content for " + url);

		console.log("Printing titles");
		console.log($(".column-2").find("a").text());
		
		$.spider();	
	}
);