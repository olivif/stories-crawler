
module.exports = {
  createStory: createStory
};

// Example story
// {
// 	"id": “2”,
// 	“title”: “Olivia Node.js Queen”,
// 	“summary”: “Common give me the summary“,
// 	“body”: “The full article“,
// 	“pdate” : “11/01/2015”,
// 	“source”: “bdnews24.com”,
// 	“previewImg” : “”                        
// }
function createStory(id, title, summary, body, date, source, previewImg) {
	
	var story = {
		id: id,
		title: title,
		summary: summary,
		body: body,
		date: date,
		source: source,
		previewImg: previewImg
	};
	
	return story;
}