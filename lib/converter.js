var js2xmlparser = require("js2xmlparser");

function exportStoriesToXml(stories) {
	
	var options = {
		arrayMap: {
			"music": "song"
		}
	};

	var xml = js2xmlparser("music", stories, options);
	
	return xml;
}

function createStory(id, title) {
	
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