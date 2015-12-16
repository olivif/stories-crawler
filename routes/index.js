var express = require("express");
var router = express.Router();

/**
 * @api {get} / Index
 *
 * @apiSuccess []
 */
router.get("/", function(req, res, next) {
  res.render("index", {title: "Express"});
});

module.exports = router;
