var express = require("express");
var app = express();

app.get("/api", function(request, response){
	response.send("Api is running.");
});

app.listen(4242);