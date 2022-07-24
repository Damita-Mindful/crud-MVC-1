var connection = require('../config/connection.js')
var book = require('../model/book')
var erase = require('fs')

module.exports = {
  index: function (req, res) {

    book.obtain(connection, function (err, data) {
      console.log(data)
      res.render('books/index', { title: 'CRUD - Nodejs, Express, Javascript', books: data });
    });
  },
  create: function (req, res) {
    res.render('books/create')
  },
  save: function (req, res) {
    console.log(req.body);
    console.log(req.file.filename)
    book.insert(connection, req.body, req.file, function (err) { console.log(err) })
    return res.redirect('/books');
  },
  delete: function (req, res) {
    console.log("Deleted data");
    console.log(req.params.id);

    book.returnDataId(connection, req.params.id, function (err, records) {
      var nameImg = "public/images/" + (records[0].img)

      if (erase.existsSync(nameImg)) {
        erase.unlinkSync(nameImg);
      }
      book.erase(connection, req.params.id, function (err) {
        res.redirect('/books')
      })
    })
  },
  edit: function (req, res) {
    book.returnDataId(connection, req.params.id, function (err, records) {
      console.log(records[0])
      res.render('books/edit', { book: records[0] });
    })

  },
  update: function (req, res) {
    console.log(req.body.name);

    if (req.body.name) {
      book.update(connection, req.body, function (err) { console.log(err) })
    }
    if (req.file) {
      if (req.file.filename) {
        book.returnDataId(connection, req.body.id, function (err, records) {
          var nameImg = "public/images/" + (records[0].img)
          if (erase.existsSync(nameImg)) {
            erase.unlinkSync(nameImg);
          }
          
          book.updateFile(connection, req.body, req.file, function (err) { console.log(err) })
        })
      }
    }
    res.redirect('/books');
  }
}