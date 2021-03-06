define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Request API heatbeat",
    "name": "GetHeatbeat",
    "group": "API",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Api is running</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n   \"message\": \"Api is running\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/api/stories",
    "title": "Request list of stories",
    "name": "GetStories",
    "group": "Stories",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Story[]",
            "optional": false,
            "field": "stories",
            "description": "<p>List of stories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"stories\": [\n    {\n      \"_id\": \"5672db59495ede3ebc4ea8df\",\n      \"title\": \"Brazil WhatsApp suspension lifted\",\n      \"summary\": \"A judge in Brazil has ordered that a suspension of the popular messaging application WhatsApp be lifted.\n                  Judge Xavier de Souza said the service should be re-instated immediately.\n                  WhatsApp had been suspended for 48 hours on Thursday after the company failed to comply with a court order to provide investigators with information relating to a criminal court case.\",\n      \"body\": null,\n      \"date\": null,\n      \"source\": \"http://www.bbc.com/news/world-latin-america-35125559\",\n      \"previewImg\": \"http://ichef.bbci.co.uk/news/660/cpsprodpb/2BA3/production/_86817111_breaking_image_large-3.png\",\n      \"__v\": 0\n    },\n    ....\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api.js",
    "groupTitle": "Stories"
  }
] });
