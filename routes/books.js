var express = require('express');
var router = express.Router();
const booksController =require("../controllers/booksController.js")
var multer = require('multer');
var date = Date.now();
var routeStore = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/images/')
    },
    filename: function (request, file, callback) {
        console.log(file)
        callback(null, date+"_"+file.originalname);
    } 
});
var charge= multer({ storage: routeStore })

/* GET home page. */
router.get('/', booksController.index);
router.get('/create', booksController.create)
router.post('/', charge.single("file"), booksController.save)
router.post('/delete/:id', booksController.delete)
router.get('/edit/:id', booksController.edit)
router.post('/update', charge.single("file"), booksController.update)

module.exports = router;
