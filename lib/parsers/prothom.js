/**
* Every parser should have this structure
*
var parser = {
	baseUrl: "someUrl",
	url: "someUrl/section",
	parser: function ($) {
		// do some parsing, return []stories
	}
}
*
*/
var Story = require("./../models/story");

var baseUrl = "http://www.en.prothom-alo.com";
var url = "http://www.en.prothom-alo.com/bangladesh";

module.exports = {
  baseUrl: baseUrl,
  url: url,
  parser: parseWebsite,
};

function parseWebsite($) {

  var data = $(".each_news");

  var stories = [];
  data.each(function(article) {

    var titleElement = $(this).find(".title");
    var title = titleElement.text().trim();
    var summary = $(this).find(".content").text().trim();

    var img = $(this).find(".image").find("img");
    var src = img.attr("src");
    var previewImg = getImageUrl(baseUrl, src);

    var source = baseUrl + "/" + titleElement.find("a").attr("href");
    var date = new Date();

    // For the body, we have to make an additional crawler call
    var body = null;
    
    var story = Story.createInstance(title, summary, body, date, source, previewImg);
    stories.push(story);
  });

  return stories;
}

function getImageUrl(baseUrl, src) {

  var previewImg = null;
  if (src !== undefined) {
    var contentsPosition = src.indexOf("contents");

    if (contentsPosition !== -1) {

      var imgUrl = src.substr(contentsPosition);

      // trim everything after .jpg
      var jpegPosition = imgUrl.indexOf(".jpg");

      if (jpegPosition !== -1) {
        imgUrl = imgUrl.substr(0, jpegPosition + 4);
      }
      previewImg = baseUrl + "/" + imgUrl;
    }
  }
  return previewImg;
}