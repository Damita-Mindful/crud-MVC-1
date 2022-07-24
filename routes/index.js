var express = require('express');
var router = express.Router();
const booksController =require("../controllers/booksController")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Welcome to library");
});

module.exports = router;
