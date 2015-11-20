/**
* Test web crawler service
*/
var crawler = require("crawlerx");
var js2xmlparser = require("js2xmlparser");

var url = "http://bdnews24.com/";
var settings = { decode:"utf-8", deep:1, concurrency:1 };

crawler.request(
	url, 
	settings,
	function(error, $, body, url, resp) {

		console.log("Requesting content for " + url);

		console.log("Printing titles");
		
		var data = $(".mostRead").find(".article").find("a");
		var textData = data.text();
		
		//console.log(JSON.stringify(data));
		
		console.log(textData);
		
		$.spider();	
		
		var xml = exportStoriesToXml();
		
		console.log(xml);
	}
);

function exportStoriesToXml() {
	
	var options = {
		arrayMap: {
			"music": "song"
		}
	};

	var data = [
		{
			"@": {
      			"type": "song"
    		},
			id: 1,
			title: "Title",
			artist: "",
			duration: "",
			thumb_url: ""
		}
	];
	
	var xml = js2xmlparser("music", data, options);
	
	return xml;
}