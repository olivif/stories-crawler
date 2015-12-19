function parser(url, data) {
	
	function parseWebsite($) {
		var body = $(".content").find("p").text();
		// var body = "mock content " + (new Date()).toString();
		data.body = body;
		return data;
	}
	
	return {
		baseUrl: url,
		url: url,
		parser: parseWebsite,
		data: data
	}
}

module.exports = parser;
