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

		// find data
		var data = $(".mostRead").find(".article").find("a");
		
		// create story object for each
		var stories = [];
		var storyId = 0;
		data.each(function(aElement){
			var aElementText = $(this).text();
			var story = createStory(storyId++, aElementText);
			stories.push(story);
		});
		
		// export stories to xml
		var xml = exportStoriesToXml(stories);
		console.log(xml);
	}
);

function createStory(id, title) {
	
	// Clean up whitespace
	title = title.trim();
	
	var story = {
		"@": {
			"type": "song"
		},
		id: id,
		title: title,
		artist: "",
		duration: "",
		thumb_url: ""
	};
	
	return story;
}

function exportStoriesToXml(stories) {
	
	var options = {
		arrayMap: {
			"music": "song"
		}
	};

	var xml = js2xmlparser("music", stories, options);
	
	return xml;
}