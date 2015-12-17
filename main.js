var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var api = require("./routes/api");

var app = express();

function connectToDb() {
  console.log("ConnectionString = " + process.env.MONGO_CONNECTION_STRING);
  mongoose.connect(process.env.MONGO_CONNECTION_STRING);
}

function disconnectFromDb() {
  mongoose.disconnect();
}

function setViews() {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
}

function setupAppConfiguration() {
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
}

function setupRoutes() {
  app.use("/api", api);
}

function notFoundHandler(request, response, next) {
  var error = new Error("Not Found");
  error.status = 404;
  next(error);
}

function errorHandler(error, request, response, next) {
  
  if (error) {
    
    var env = process.env.NODE_ENV;
    console.log("env = " + env);
    
    var errorMessage = {};
    if (env === "development") {
      errorMessage = "StackTrace " + new Error().stack;
    } else {
      errorMessage = error.message;
    }  
    
    response.status(error.status || 500);
    response.render("error", { 
      message: errorMessage, 
      error: {}
      });
    }
}

function setupApp() { 

  // App setup
  setViews(app);
  setupAppConfiguration(app);

  // Routes
  setupRoutes(app);

  // Handlers
  app.use(notFoundHandler);
  app.use(errorHandler); 

  return app;
}

connectToDb();
setupApp();

module.exports = {
  connectToDb: connectToDb,
  disconnectFromDb: disconnectFromDb,
  setViews: setViews,
  setupAppConfiguration: setupAppConfiguration,
  setupRoutes: setupRoutes,
  notFoundHandler: notFoundHandler,
  errorHandler: errorHandler,
  setupApp: setupApp,
  app: setupApp()
};
